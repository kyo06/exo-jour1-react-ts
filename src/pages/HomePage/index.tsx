import { API_URL, postTodo, deleteTodo } from '@services/todo.api.service'
import TodoList from '@components/TodoList'
import type { Todo } from '@/types/todo';
import useFetch from '@hooks/useFetch';
import Header from '@components/Header';
import FetchComponent from '@components/FetchComponent';
import { withFetch } from '@/hoc/withFetch';
import TodoListPure from '@components/TodoListPure';

// On utilise le HOC withFetch pour créer une version de TodoListPure qui est connectée à l'API et reçoit les données, l'état de chargement et les erreurs en tant que props.
const TodoListWithFetch = withFetch<Todo[]>(API_URL)(TodoListPure);

export default function HomePage() {

  //const { data: todos, loading, error, refetch: refetchTodos } = useFetch<Todo[]>(API_URL);
  /*
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
  */
  return (
    <>
      <div className="App">
        <Header />
        <div style={{ maxWidth: 500, margin: '0 auto', padding: 24 }}>
          <h1>Ma Todo List avec HOC</h1>
          <TodoListWithFetch />
        </div>
        <div style={{ maxWidth: 500, margin: '0 auto', padding: 24 }}>
          <h1>Ma Todo List avec Render Props</h1>
          <FetchComponent<Todo[]> url={API_URL}>
            {({ data, loading, error }) => {
              if (loading) return <p>Loading...</p>;
              if (error) return <p>Error: {error.message}</p>;

              return (
                <ul>
                  {data?.map(todo => (
                    <li key={todo.id}>{todo.text}</li>
                  ))}
                </ul>
              );
            }}
          </FetchComponent>
        </div>
      </div>
    </>
  )
}