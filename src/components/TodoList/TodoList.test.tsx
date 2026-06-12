import { render, screen } from '@testing-library/react'
import TodoList from './'

const todos = [
  {
    id: 1,
    text: 'Faire les courses',
    completed: false,
  },
  {
    id: 2,
    text: 'Apprendre React',
    completed: true,
  },
];

describe('TodoList', () => {
  it('affiche le titre', () => {
    render(
        <TodoList
        todos={[]}
        addTodo={() => {}}
        deleteTodo={() => {}}
        />
    )

    expect(
        screen.getByRole('heading', {
        name: /ma todo list/i,
        })
    ).toBeInTheDocument()
   })

   it('affiche les deux todos', () => {
    render(
        <TodoList
        todos={todos}
        addTodo={() => {}}
        deleteTodo={() => {}}
        />
    )

    expect(screen.getByText('Faire les courses')).toBeInTheDocument()
    expect(screen.getByText('Apprendre React')).toBeInTheDocument()

    expect(screen.getAllByRole('listitem')).toHaveLength(2)
   })
})