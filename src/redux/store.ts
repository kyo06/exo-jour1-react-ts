import { createStore } from 'redux';
import { todoReducer, type TodoState } from './reducers';

export const store = createStore<TodoState>(todoReducer);