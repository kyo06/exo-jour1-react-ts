import HomePage from '@pages/HomePage'
import './App.css'
import useLocalStorage from '@hooks/useLocalStorage'

function App() {
  const [todos] = useLocalStorage('todos', []);
 
  console.log(todos, 'depuis App');

  return (
    <>
      <HomePage/>
    </>
  )
}

export default App
