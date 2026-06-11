import type { Todo } from '../types/todo'

const initialTodos: Todo[] = [
  { id: 1, text: 'Installer Vite',        completed: true },
  { id: 2, text: 'Créer des composants',  completed: false },
  { id: 3, text: 'Maîtriser useState',    completed: false },
]


export const fetchTodos = (): Promise<Todo[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(initialTodos), 500)
  })      
};

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

/*
//1ère manière sans promesse
setTimeout(() => {
    console.log('Etape 1')
    setTimeout(() => {
        console.log('Etape 2')
        setTimeout(() => {
            console.log('Etape 3')
        }, 1000);
    }, 1000);
}, 1000);

//2ème manière avec promesse

//Définition d'une fonction qui retourne une promesse
function makeTimeoutPromise(message: string, delay: number): Promise<string> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(message);
            if(message === 'Etape 2') {
                reject('Erreur à l\'étape 2');
                return;
            }
            resolve('DATA 1');
        }, delay);
    });
}

//Appel
makeTimeoutPromise('Etape 1', 1000)
    .then((data) => {
        console.log(data);
        return makeTimeoutPromise('Etape 2', 1000);
    })
    .then((data) => {
        console.log(data);
        return makeTimeoutPromise('Etape 3', 1000);
    })
    .catch((error) => {
        console.error('Erreur attrapée :', error);
    });

//3ème manière avec promesse avec async / await
//Appel
async function main() { 
    try {
        const data1 = await makeTimeoutPromise('Etape 1', 1000);
        console.log(data1);
        const data2 = await makeTimeoutPromise('Etape 2', 1000);
        console.log(data2);
        const data3 = await makeTimeoutPromise('Etape 3', 1000);
        console.log(data3);
    } catch (error) {
        console.error('Erreur attrapée :', error);
    }
}

main();

*/