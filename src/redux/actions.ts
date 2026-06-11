export const ADD_TODO = "ADD_TODO";


export const addTodo = (text: string) => ({
    type: ADD_TODO,
    payload: text,
})