import { useEffect, useState } from 'react';

type CacheEntry<T> = {
  data?: T;
  promise?: Promise<T>;
  subscribers: Set<() => void>;
};

const cache = new Map<string, CacheEntry<any>>();

async function fetchWithCache<T>(url: string): Promise<T> {
  let entry = cache.get(url);

  if (!entry) {
    entry = { subscribers: new Set() };
    cache.set(url, entry);
  }

  // 🔥 Dedup request (si déjà en cours)
  if (entry.promise) {
    return entry.promise;
  }

  entry.promise = fetch(url)
    .then(res => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
    .then((data: T) => {
      entry!.data = data;
      entry!.promise = undefined;
      return data;
    })
    .catch(err => {
      entry!.promise = undefined;
      throw err;
    });

  return entry.promise;
}

export function useQuery<T>(url: string) {
  const entry = cache.get(url);

  const [data, setData] = useState<T | undefined>(entry?.data);
  const [loading, setLoading] = useState(!entry?.data);
  const [error, setError] = useState<Error | null>(null);

  const notify = () => {
    const e = cache.get(url);
    setData(e?.data);
  };

  useEffect(() => {
    if (!entry) {
      cache.set(url, { subscribers: new Set() });
    }

    const e = cache.get(url)!;
    e.subscribers.add(notify);

    const load = async () => {
      try {
        setLoading(true);
        const result = await fetchWithCache<T>(url);
        setData(result);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    load();

    return () => {
      e.subscribers.delete(notify);
    };
  }, [url]);

  return {
    data,
    loading,
    error,
  };
}


// Exemple d'utilisation
/*
function UserList() {
    const { data: users, loading, error } = useQuery<User[]>('https://jsonplaceholder.typicode.com/users');
    return (
        <div>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
            {users && (
                <ul>
                    {users.map(user => (
                        <li key={user.id}>{user.name}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}
*/