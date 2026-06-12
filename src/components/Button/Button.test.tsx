import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from './'

describe('Button', () => {
  it('affiche "Clicked" après un clic', async () => {
    const user = userEvent.setup()

    render(<Button />)

    const button = screen.getByRole('button', {
      name: /click me/i,
    })

    await user.click(button)

    expect(screen.getByText(/clicked/i)).toBeInTheDocument()
  })
})