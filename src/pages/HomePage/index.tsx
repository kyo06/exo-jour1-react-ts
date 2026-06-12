import type { Todo } from '@/types/todo';
import Header from '@components/Header';
import { useDispatch, useSelector } from 'react-redux';
import type { TodoState } from '@/redux/reducers';
// import { addTodo, deleteTodo } from '@/redux/actions';
import type { RootState } from '@/redux-toolkit/store'
import { addTodo, deleteTodo } from '@/redux-toolkit/slice';


export default function HomePage() {
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