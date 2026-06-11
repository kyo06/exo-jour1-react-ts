import useLocalStorage from '@hooks/useLocalStorage'

export default function ContactPage() {
  const [todos] = useLocalStorage('todos', []);

  console.log(todos, 'depuis ContactPage');

  return (
    <div>
      <h1>Contactez-nous</h1>
      <p>N'hésitez pas à nous contacter pour toute question ou demande d'information.</p>
    </div>
  )
}