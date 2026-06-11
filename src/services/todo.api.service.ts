import type { Todo } from '../types/todo'

const API_URL = 'http://localhost:3000/todos';

export const fetchTodos = (): Promise<Todo[]> => {
  return new Promise((resolve) => {
    fetch(API_URL)
      .then(response => response.json())
      .then(data => resolve(data))
      .catch(error => {
        console.error('Erreur lors du chargement des todos :', error);
        resolve([]); // Résoudre avec un tableau vide en cas d'erreur
      });
    });
};

/*
export const postTodo = (newTodo: Omit<Todo, 'id'>): Promise<Todo> => {
  return new Promise((resolve) => {
    setTimeout(() => {
        const todoWithId: Todo = {
            id: initialTodos.length > 0 ? initialTodos[initialTodos.length - 1].id + 1 : 1,
            ...newTodo
        };
        initialTodos.push(todoWithId);
        resolve(todoWithId)
    }, 500)
  })
};

export const deleteTodo = (id: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
        const index = initialTodos.findIndex(todo => todo.id === id);
        if (index !== -1) {
            initialTodos.splice(index, 1);
        }
        resolve();
    }, 500)
  });
};
*/