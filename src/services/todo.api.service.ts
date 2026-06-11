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

export const postTodo = (newTodo: Omit<Todo, 'id'>): Promise<Todo> => {
  return new Promise((resolve, reject) => { 
    fetch(API_URL, {
        method: 'POST',
        headers: {  
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTodo)
    })
    .then(response => response.json())
    .then(data => resolve(data))
    .catch(error => {
        console.error('Erreur lors de l\'ajout de la todo :', error);
        reject(error);
    });
  })
};

export const deleteTodo = (id: number): Promise<void> => {
  return new Promise((resolve, reject) => {
    fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    })
    .then(() => resolve())
    .catch(error => {
        console.error('Erreur lors de la suppression de la todo :', error);
        reject(error); // Rejeter l'erreur
    });
  })
};
