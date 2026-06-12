import reducer, {
    initialState,
    addTodo,
    toggleTodo,
    deleteTodo,
} from './slice'
import { vi } from 'vitest'

describe('todoSlice', () => {
    it('retourne le state initial', () => {
        expect(
            reducer(undefined, { type: 'unknown' })
        ).toEqual(initialState)
    })

    it('ajoute une todo', () => {
        vi.spyOn(Date, 'now').mockReturnValue(999)

        const state = reducer(
            initialState,
            addTodo('Apprendre Redux')
        )

        expect(state.todos).toContainEqual({
            id: 999,
            text: 'Apprendre Redux',
            completed: false,
        })
    })

    it('tester le toogle completed', () => {
        const state = reducer(
            initialState,
            toggleTodo(1)
        )

        expect(state.todos[0].completed).toBe(true)
    })

    it('supprime une todo', () => {
        const state = reducer(
            initialState,
            deleteTodo(1)
        )

        expect(state.todos).toHaveLength(2)

        expect(
            state.todos.find(t => t.id === 1)
        ).toBeUndefined()
    })
})