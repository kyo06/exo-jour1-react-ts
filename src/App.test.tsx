import { render, screen } from '@testing-library/react'
import App from './App'
import { vi } from 'vitest'
import userEvent from '@testing-library/user-event'

describe('App', () => {
    vi.mock('@pages/HomePage', () => ({
        default: () => <h1>Home Page</h1>,
    }))

    vi.mock('@pages/ContactPage', () => ({
      default: () => <h1>Contact Page</h1>,
    }))

    vi.mock('@pages/NotFoundPage', () => ({
        default: () => <h1>Not Found Page</h1>,
    }))

    it('affiche la page Home', async () => {
        window.history.pushState({}, '', '/')

        render(<App />)

        expect(
            await screen.findByText('Home Page')
        ).toBeInTheDocument()
    })

    it('affiche la page Contact', async () => {
        window.history.pushState({}, '', '/contact')

        render(<App />)

        expect(
            await screen.findByText('Contact Page')
        ).toBeInTheDocument()
    })

    it('affiche la page 404', async () => {
      window.history.pushState({}, '', '/route-inconnue')

        render(<App />)

        expect(
            await screen.findByText('Not Found Page')
        ).toBeInTheDocument()
    })

    it('navigue vers Contact', async () => {
        const user = userEvent.setup()

        window.history.pushState({}, '', '/')

        render(<App />)

        await user.click(
            screen.getByRole('link', {
            name: /contact/i,
            })
        )

        expect(
            await screen.findByText('Contact Page')
        ).toBeInTheDocument()
    })
})