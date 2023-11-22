import React, { useState, useEffect } from 'react'
import { FiTrash } from "react-icons/fi";
import { CiEdit } from "react-icons/ci";
import { FaRegSave } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux';
import { deleteTodo, editTodoAction, completeTask } from '../slice/TodoSlice'

const Todos: React.FC = () => {
    const todos = useSelector((state: any) => state.todos.todos)
    const completeTodo = todos.filter((ctodo: any) => ctodo.isComplete).length;
    const [edit, setEdit] = useState<string | null>('');
    const [edittext, setEditText] = useState<string>('');

    const dispatch = useDispatch();
    const removeTodo = (id: string) => {
        dispatch(deleteTodo(id))
    }
    const editTodo = (id: string) => {
        setEdit(id);
        const t = todos.find((todo: any) => todo.id === id)
        if (t) {
            setEditText(t.text)
        }
    }

    const saveEditTodo = () => {
        if (edit && edittext != '') {
            dispatch(editTodoAction({ id: edit, text: edittext }))
            setEdit(null);
        }
    }
    const toggleCompleteTask = (id: string) => {
        dispatch(completeTask({ id }));
    }
    return (
        <div>
            <div className="container col-md-8 my-4 d-flex flex-column gap-3">
                <h5>My Todos</h5>
                <div className='d-flex justify-content-between p-2 shadow-lg rounded bg-primary'>
                    <div>Total task : ({todos.length})</div>
                    <div>Complete task : <span className=' font-monospace'>{completeTodo} </span>of ({todos.length})</div>
                </div>
                <hr />
                {
                    todos != '' ? todos.map((todo: any) => (
                        todo.isComplete ?
                            <div className="todos p-3 d-flex justify-content-between shadow-lg rounded gap-5" key={todo.id}>
                                <div onClick={() => toggleCompleteTask(todo.id)}>
                                    {
                                        todo.isComplete ? <input type="checkbox" name="" id="" checked /> : <input type="checkbox" name="" id="" />
                                    }
                                </div>
                                {
                                    edit === todo.id ? (
                                        <input type="text" className='form-control mx-2' value={edittext} onChange={(e) => setEditText(e.target.value)} />
                                    ) :
                                        (<div className=''>
                                            {
                                                todo.isComplete ? (<p className='text-decoration-line-through'>{todo.text}</p>) : (<p className='text-decoration-line-none'>{todo.text}</p>)
                                            }
                                        </div>)
                                }
                                <div className='d-flex gap-2'>
                                    {
                                        edit === todo.id ? (<button className='btn btn-sm' onClick={() => saveEditTodo()}><FaRegSave color='red' /></button>)
                                            : (<button className='btn btn-sm' onClick={() => editTodo(todo.id)}><CiEdit color='blue' /></button>)
                                    }
                                    <button className='btn btn-sm' onClick={() => removeTodo(todo.id)}><FiTrash color='red' /></button>
                                </div>
                            </div>
                            :
                            <div className="todos p-3 d-flex justify-content-between shadow-lg rounded" key={todo.id}>
                                <div onClick={() => toggleCompleteTask(todo.id)}>
                                    {
                                        todo.isComplete ? <input type="checkbox" name="" id="" checked /> : <input type="checkbox" name="" id="" />
                                    }
                                </div>
                                {
                                    edit === todo.id ? (
                                        <input type="text" className='form-control mx-2' value={edittext} onChange={(e) => setEditText(e.target.value)} />
                                    ) :
                                        (<div className=''>
                                            {
                                                todo.isComplete ? (<p>{todo.text}</p>) : (<p className='text-decoration-line-none'>{todo.text}</p>)
                                            }
                                        </div>)
                                }
                                <div className='d-flex gap-2'>
                                    {
                                        edit === todo.id ? (<button className='btn btn-sm' onClick={() => saveEditTodo()}><FaRegSave color='red' /></button>)
                                            : (<button className='btn btn-sm' onClick={() => editTodo(todo.id)}><CiEdit color='green' /></button>)
                                    }
                                    <button className='btn btn-sm' onClick={() => removeTodo(todo.id)}><FiTrash color='red' /></button>
                                </div>
                            </div>
                    )) : (<div className='text-center fs-3 text-warning'><h3>Your todolist is empty...</h3></div>)
                }
            </div>
        </div >
    )
}

export default Todos


