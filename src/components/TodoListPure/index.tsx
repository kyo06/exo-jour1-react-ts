import type { Todo } from '@/types/todo';

type TodoProps = {
  data: Todo[] | null;
  loading: boolean;
  error: Error | null;
};

// TodoListPure est un composant de présentation (composant "pur") qui reçoit les données, l'état de chargement et les erreurs en tant que props et affiche la liste des todos ou les messages appropriés en fonction de l'état. 
// Il est utilisé dans HomePage via le HOC withFetch, qui lui fournit les données récupérées depuis l'API. 
// Cela permet de séparer la logique de récupération des données de la présentation, rendant les composants plus réutilisables et plus faciles à tester. 
// TodoListPure est un composant simple et stateless,
// qui reçoit les données, l'état de chargement et les erreurs 
// en tant que props et affiche la liste des todos ou les messages appropriés en fonction de l'état.

export default function TodoListPure({ data, loading, error }: TodoProps) {
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <ul>
      {data?.map(t => (
        <li key={t.id}>{t.text}</li>
      ))}
    </ul>
  );
}