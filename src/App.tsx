import React, { useState } from 'react'
import Todos from './components/Todos'
import { useDispatch } from 'react-redux'
import { addTodo } from './slice/TodoSlice'

const App: React.FC = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState('');

  const submitForm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!data.trim()) {
      alert("Please enter a todo")
      return;
    }
    dispatch(addTodo(data))
    setData('')
  }
  return (
    <>
      <div className='position-sticky top-0 bg-dark text-white-50' style={{zIndex:1000}}>
        <div className='fs-3 text-center'><h5>Todo List</h5></div>
        <div className="container d-flex justify-content-center align-items-center ">
          <form action="" className='col-md-8 d-flex gap-3 shadow-lg rounded p-3'>
            <input type="text" placeholder='Enter your task..' className='form-control' value={data} onChange={(e) => setData(e.target.value)} />
            <button className='btn btn-info' onClick={submitForm}>Add</button>
          </form>
        </div>
      </div>
      <Todos />
    </>
  )
}

export default App

