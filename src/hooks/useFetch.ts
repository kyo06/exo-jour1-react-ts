import { useState, useEffect } from 'react';

export interface UseFetchResult<T> {
    data: T | null;
    loading: boolean;
    error: Error | null;
    refetch: () => void;
}

// voir également useSWR plus complet et optimisé pour le cache, la revalidation, etc. : https://swr.vercel.app/
// https://refine.dev/blog/data-fetching-next-js-useswr/

export default function useFetch<T>(url: string, options?: RequestInit): UseFetchResult<T> {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    // Sans UseEffect, cela provoquerait une boucle infinie de requêtes à l'API
    // Le flux devient :
    //     useFetch() est exécuté à chaque rendu.
    //     Si tu fais un setState() après la réponse, cela provoque un nouveau rendu.
    //     Le nouveau rendu relance fetch().
    //     Boucle infinie ou multiples requêtes inutiles.

    //Avec UseEffect, tu peux contrôler quand la requête doit être effectuée.
    // Le flux devient :
    //     Render initial.
    //     useEffect s'exécute.
    //     Appel API.
    //     setUsers().
    //     Nouveau rendu avec les données.
    //     L'effet ne se relance pas.

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            setData(result);
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [url]);

    return { data, loading, error, refetch: fetchData };
}

//Exemple de code
/*
interface User {
  id: number;
  name: string;
  email: string;
}

function UserList() {
  const {
    data: users,
    loading,
    error,
  } = useFetch<User[]>(
    'https://jsonplaceholder.typicode.com/users'
  );

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error.message}</p>;

  return (
    <ul>
      {users?.map(user => (
        <li key={user.id}>
          {user.name}
        </li>
      ))}
    </ul>
  );
}
  */