import { fetchTodos, deleteTodo, postTodo } from '@services/todo.api.service'
import TodoList from '@components/TodoList'
import type { Todo } from '@types/todo';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  function loadTodos() {
    setLoading(true);
    fetchTodos().then(data => {
        console.log('Todos chargés :', data)
        setTodos(data);
        setLoading(false);
    })
  };

  // Chargement initial des todos
  useEffect(() => {
    loadTodos();
  }, []);


  function handleAddTodo(todo: Omit<Todo, 'id'>) {  
      postTodo(todo).then(_ => {
          loadTodos();
      });
  }

  /*
  async function handleAddTodoAsync(todo: Omit<Todo, 'id'>) {  
      const newTodo = await postTodo(todo);
      await loadTodos();
  }
  */

  function handleDeleteTodo(id: number) {
      deleteTodo(id).then(() => {
          loadTodos();
      });
  }

  return (
    <div className="App">
      {loading ? <p>Chargement...</p> : <TodoList todos={todos} addTodo={handleAddTodo} deleteTodo={handleDeleteTodo} />}
    </div>
  )
}