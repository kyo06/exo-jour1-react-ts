import useFetch from '@hooks/useFetch';
import React from 'react';

// withFetch est un HOC (Higher-Order Component) 
// qui prend une URL en paramètre et retourne une fonction qui prend un composant en paramètre.
// Cette fonction retourne un nouveau composant qui utilise le hook useFetch 
// pour récupérer les données depuis l'URL fournie et passe ces données, ainsi que les états de chargement et d'erreur, en tant que props au composant d'origine.
// Exemple d'utilisation :
// const TodoListWithFetch = withFetch<Todo[]>(API_URL)(TodoListPure);
// Cela permet de séparer la logique de récupération des données de la présentation, 
// rendant les composants plus réutilisables et plus faciles à tester.

export function withFetch<T>(url: string) {
  return function <P extends object>(
    Component: React.ComponentType<P & {
      data: T | null;
      loading: boolean;
      error: Error | null;
    }>
  ) {
    return function WrappedComponent(props: P) {
      const { data, loading, error } = useFetch<T>(url);

      return (
        <Component
          {...props}
          data={data}
          loading={loading}
          error={error}
        />
      );
    };
  };
}