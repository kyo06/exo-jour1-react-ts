import type { Todo } from '@/types/todo';
import Header from '@components/Header';
import { useDispatch, useSelector } from 'react-redux';
import type { TodoState } from '@/redux/reducers';
// import { addTodo, deleteTodo } from '@/redux/actions';
import type { RootState } from '@/redux-toolkit/store'
import { addTodo, deleteTodo, toggleTodo } from '@/redux-toolkit/slice';
import { Link } from 'react-router';


export default function TodoListPage() {
  //Récupére le state todo dans la store
  // dans redux-toolkit il y a le nom de la store et donc il y a une indirection en plus
  const todos = useSelector((state: RootState) => state.todos.todos);
  
  //Dispatch les actions
  const dispatch = useDispatch();

  function createTodo() {
    //dispatch({ type: "ADD_TODO", payload: "New todo" });
    dispatch(addTodo("New todo"));
  }

  function removeTodo(id: number) {
    dispatch(deleteTodo(id))
  }

  function handleToogleTodo(id: number) {
    dispatch(toggleTodo(id))
  }

  return (
    <>
      <div className="App">
        <Header />
        
        <button onClick={createTodo}>Add Todo</button> 

        <ul>
        {todos.map((t: Todo) => (
          <li key={t.id}>
            <span
              onClick={() => dispatch(toggleTodo(t.id))}
              style={{ textDecoration: t.completed ? "line-through" : "none" }}
            >
              {t.text}
            </span>
            <button onClick={() => removeTodo(t.id)}>❌</button>
            <Link to={`/todos/${t.id}`}>Détail Todo</Link>
          </li>
        ))}
      </ul>

      </div>
    </>
  )
}