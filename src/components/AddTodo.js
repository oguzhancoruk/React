import { useState} from 'react'
import ToDoList from './TodoList'

export default function AddToDo() {
  
  const [todo, setTodo] = useState({todo: "", isDone: false})
  const [toDoList, setToDoList] = useState(() => {
    const savedTodos = localStorage.getItem("todos")
    return JSON.parse(savedTodos)
  })

  const changeHandler = (e) => {
    setTodo({todo: e.target.value, isDone: false})
  }

  const submitHandler = (e) => {
    if(e.key === "Enter") {
      e.preventDefault()
      setToDoList([...toDoList, todo])
      setTodo({todo: "", isDone: false})
    }
  }

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={submitHandler}>
          <input className="new-todo" type="text" value={todo.todo} onKeyDown={submitHandler} placeholder="What needs to be done?" onChange={changeHandler} autoFocus/>
        </form>
      </header>
      <ToDoList toDoList={toDoList} setToDoList={setToDoList} />
    </section>
  )
}