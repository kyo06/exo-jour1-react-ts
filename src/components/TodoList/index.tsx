import type {Todo} from '../../types/todo'
import { useState } from 'react';

interface TodoListProps {
    todos: Todo[]
    //addTodo: (todo: Pick<Todo, 'text' | 'completed'>) => void
    addTodo: (todo: Omit<Todo, 'id'>) => void
    deleteTodo: (id: number) => void
}


export default function TodoList({ todos, addTodo, deleteTodo }: TodoListProps) {
    const [textNewTodo, setTextNewTodo] = useState('');

    function handleChangeTextNewTodo(e: React.ChangeEvent<HTMLInputElement>) {
        setTextNewTodo(e.target.value);
    }

    function handleAddTodo() {
        if (textNewTodo.trim() === '') return;
        // ajouter la nouvelle todo à la liste
        const newTodo: Omit<Todo, 'id'> = {
            text: textNewTodo.trim(),
            completed: false
        };
        addTodo(newTodo);

        setTextNewTodo('');
    }

    function handleDeleteTodo(id: number) {
        // supprimer la todo de la liste
        deleteTodo(id);
    }

    return (
        <div style={{ maxWidth: 500, margin: '0 auto', padding: 24 }}>
            <h1>Ma Todo List</h1>  
            {/* Saisie */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                <input 
                    placeholder="Nouvelle tâche..." 
                    style={{ flex: 1, padding: 8, fontSize: 16 }} 
                    value={textNewTodo}
                    onChange={handleChangeTextNewTodo}
                />
                <button style={{ padding: '8px 16px', fontSize: 16, cursor: 'pointer' }} onClick={handleAddTodo}>
                    Ajouter
                </button>
            </div>

            {/* Liste des todos */}
            <ul>
                {todos.map(todo => (
                    <li key={todo.id} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}> 
                        {todo.text}
                        <button style={{ marginLeft: 8, padding: '4px 8px', fontSize: 14, cursor: 'pointer' }} onClick={() => handleDeleteTodo(todo.id)}>
                            Supprimer
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};