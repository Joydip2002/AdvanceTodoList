import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { nanoid } from '@reduxjs/toolkit'

interface Todo {
    id: string;
    text: string;
    isComplete: boolean;
}

interface TodoState {
    todos: Todo[];
}

const initialState: TodoState = {
    todos: JSON.parse(localStorage.getItem('todos') || '[]'),
};

const saveToLocalStorage = (todos: Todo[]) => {
    localStorage.setItem('todos', JSON.stringify(todos));
};

const todoList = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<string>) => {
            const data: Todo = {
                id: nanoid(),
                text: action.payload,
                isComplete: false
            };
            state.todos.push(data);   
            saveToLocalStorage(state.todos);
        },
        deleteTodo: (state, action: PayloadAction<string>) => {
            const updatedTodos = state.todos.filter(todo => todo.id !== action.payload);
            state.todos = updatedTodos;
            saveToLocalStorage(updatedTodos);
        },
        editTodoAction: (state, action: PayloadAction<{ id: string; text: string }>) => {
            const updatedTodos = state.todos.map(todo =>
                todo.id === action.payload.id
                    ? { ...todo, text: action.payload.text }
                    : todo
            );
            state.todos = updatedTodos;
            saveToLocalStorage(updatedTodos);
        },
        completeTask: (state, action: PayloadAction<{ id: string }>) => {
            const updatedTodos = state.todos.map(todo =>
                todo.id === action.payload.id
                    ? { ...todo, isComplete: !todo.isComplete }
                    : todo
            );
            state.todos = updatedTodos;
            saveToLocalStorage(updatedTodos);
        }
    },
});

export const { addTodo, deleteTodo, editTodoAction, completeTask } = todoList.actions;
export default todoList.reducer;
