import React from 'react'

export const TodoItem = ({todo, onDelete}) => {
    console.log(todo)
    console.log(onDelete)
    return (
        <li>
            {todo.value}
            <button onClick={() => onDelete(todo.id)}>delete</button>
        </li>
    )
}