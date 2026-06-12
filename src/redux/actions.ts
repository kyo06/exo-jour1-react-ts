export const ADD_TODO = "ADD_TODO";
export const DELETE_TODO = "DELETE_TODO";

type Action = "ADD_TODO" | "DELETE_TODO";

export interface ActionType {
    type: Action,
    payload: any
}

export const addTodo = (text: string) => ({
    type: ADD_TODO,
    payload: text,
})

export const deleteTodo = (id: number) => ({
    type: DELETE_TODO,
    payload: id
})