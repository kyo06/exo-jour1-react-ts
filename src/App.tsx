import HomePage from '@pages/HomePage'
import './App.css'
import useLocalStorage from '@hooks/useLocalStorage'
import { todoReducer, initialState } from './redux/reducers';
import { useReducer } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router';
import ContactPage from '@pages/ContactPage';
import NotFoundPage from '@pages/NotFoundPage';
import TodoPage from '@pages/TodoPage';

function initStore() {
  const saved = localStorage.getItem("todos");

  if (saved) {
    return JSON.parse(saved);
  }

  return {
    todos: [],
  };
}


function App() {
  const [todos] = useLocalStorage('todos', []);
 
  // pour useReducer contrairement à redux
  // Obligé d'initialiser la store dans le composant qui est chargé en premier
  // pour que les autres puissent bénéficier de l'état global
  const [state, dispatch] = useReducer(todoReducer, undefined, initStore);

  console.log(todos, 'depuis App');

  return (
    <>
      <BrowserRouter>
      <nav>
          <Link to="/">Home</Link>{" "}
          <Link to="/contact">Contact</Link>{" "}
          <Link to="/todos">Todos</Link>
      </nav>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/todos" element={<TodoPage/>} />
          <Route path="/contact" element={<ContactPage/>} />
          <Route path="*" element={<NotFoundPage/>} />
        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
