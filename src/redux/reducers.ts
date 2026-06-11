import type { Todo } from '@/types/todo';
import { ADD_TODO } from '@/redux/actions'


export interface TodoState {
    todos: Todo[];
}

// État initial de l'application avec une liste de todos pré-remplie
// Mettre dans le reducer pour que ce soit plus clair et éviter les problèmes de circular dependencies

const initialState: TodoState = {
    todos: [
        { id: 1, text: 'Apprendre React', completed: false },
        { id: 2, text: 'Apprendre TypeScript', completed: false },
        { id: 3, text: 'Créer une application Todo', completed: false },
    ]
};



export function todoReducer(state = initialState, action: any) {
    switch (action.type) {
        case ADD_TODO:
            console.log('original state', state);
            const newTodo: Todo = {
                id: Date.now(),
                text: action.payload,
                completed: false
            };
            //Immutabilité donc recréer le new state todos
            return {
                ...state,
                todos: [...state.todos, newTodo]
            };
        default:
            return state;
    }
}