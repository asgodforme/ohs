import React from 'react';
import { connect } from 'dva';
import TodoList from '../components/TodoList'

const Todos = ({ dispatch, todos }) => {
    function deleteHandle(id) {
        dispatch({
            type: 'todos/delete',
            payload: id,
        });
    }
    return (
        <div>
            <h2>Todos</h2>
            <TodoList todos={todos} onDelete={deleteHandle}/>
        </div>
    )
}

export default connect(({todos}) => ({todos,}))(Todos)
