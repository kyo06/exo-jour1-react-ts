import type { RootState } from "@/redux-toolkit/store";
import type { Todo } from "@/types/todo";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";


export default function TodoItemPage() {

    const { id } = useParams();
    const todoId = Number(id);

    const todoItem = useSelector((state: RootState) => state.todos.todos.find( todo => todo.id === todoId));
    
    if(!todoItem) {
        const navigate = useNavigate();
        return navigate('/404');
    }

    return (
        <>
        <p>
            TodoItemPage
        </p>
        <span
            style={{ textDecoration: todoItem!.completed ? "line-through" : "none" }}
        >
            {todoItem!.text}
        </span>
        </>
    )
}