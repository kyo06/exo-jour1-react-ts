import { API_URL, postTodo, deleteTodo } from '@services/todo.api.service'
import TodoList from '@components/TodoList'
import type { Todo } from '@/types/todo';
import useFetch from '@hooks/useFetch';

export default function HomePage() {

  const { data: todos, loading, error, refetch: refetchTodos } = useFetch<Todo[]>(API_URL);

  function handleDeleteTodo(id: number): void {
    deleteTodo(id).then(() => refetchTodos());
  }

  function handleAddTodo(todo: Omit<Todo, 'id'>): void {
    postTodo(todo).then(newTodo => {
      if (newTodo) {
        // La nouvelle todo a été ajoutée avec succès, on peut recharger la liste des todos
        refetchTodos();
      }
    });
  }

  return (
    <div className="App">
      {loading ? (
        <p>Chargement...</p>
      ) : error ? (
        <p>Erreur : {error.message}</p>
      ) : (
        <TodoList todos={todos!} addTodo={handleAddTodo} deleteTodo={handleDeleteTodo} />
      )}
    </div>
  )
}