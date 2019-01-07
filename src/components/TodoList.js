import React from 'react';
import { TodoItem } from './TodoItem'
const TodoList = ({ todos, onDelete }) => {
    console.log(todos);
    return (
        <ul>
            {
                todos.map((todo) => {
                    console.log(todo)
                    return <TodoItem key={todo.id} todo={todo} onDelete={onDelete}/>
                })
            }
        </ul>
    )
}

export default TodoList;