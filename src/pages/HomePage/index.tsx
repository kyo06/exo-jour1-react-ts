import type { Todo } from '@/types/todo';
import Header from '@components/Header';
import { useDispatch, useSelector } from 'react-redux';
import type { TodoState } from '@/redux/reducers';
import { addTodo, deleteTodo } from '@/redux/actions';

export default function HomePage() {
  //Récupére le state todo dans la store
  const todos = useSelector((state: TodoState) => state.todos);
  
  //Dispatch les actions
  const dispatch = useDispatch();

  function createTodo() {
    //dispatch({ type: "ADD_TODO", payload: "New todo" });
    dispatch(addTodo("New todo"));
  }

  function removeTodo(id: number) {
    dispatch(deleteTodo(id))
  }

  return (
    <>
      <div className="App">
        <Header />
        
        <button onClick={createTodo}>Add Todo</button> 

        <ul>
        {todos.map((t: Todo) => (
          <li key={t.id}>
            {t.text}
            <button onClick={() => removeTodo(t.id)}>Supprimer</button>
          </li>
        ))}
      </ul>

      </div>
    </>
  )
}