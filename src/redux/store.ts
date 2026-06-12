import { createStore } from 'redux';
import { todoReducer, type TodoState } from './reducers';
import type {ActionType} from './actions'

export const store = createStore<TodoState, ActionType>(todoReducer);