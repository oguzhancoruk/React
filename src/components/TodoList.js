import { useState, useEffect } from "react"

export default function ToDoList({toDoList, setToDoList}) {


  const [status, setStatus] = useState("All")



  const filterToDos = (value) => {
    setStatus(value)
  }

  const deleteToDo = (key) => {
    let tempArr = toDoList.slice()
    tempArr.splice(key, 1)
    setToDoList(tempArr)
  }

  const clearCompleted = () => {
    let tempArr = []
    for(let i = 0; i < toDoList.length; i++) {
      if(!toDoList[i].isDone) {
        tempArr.push(toDoList[i])
      }
    }
    setToDoList(tempArr)
  }
  
  const checkHandler = (key) => {
    let tempArr = toDoList.slice()
    tempArr[key].isDone = !tempArr[key].isDone
    setToDoList(tempArr)
  }

  const checkAll = () => {

    if(toDoList.length > 0) {
      let tempArr = toDoList.slice();
      tempArr.forEach((todo) => {
      todo.isDone = !todo.isDone 
      })
      setToDoList(tempArr)
    } else {
      alert("Nothing to be done!")
    }

  }

//   let todoCount = 0
//   let todoCompleted = 0

//   for (let i = 0; i < toDoList.length; i++) {
//     if (!toDoList[i].isDone) {
//       todoCount++
//     } else {
//       todoCompleted++
//     }
    
//   }

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(toDoList))
  }, [toDoList])

  return (
    <div>
      <section className="main">
        <button className="check-all" title="Check All Done!" onClick={checkAll}/>
        <ul className="todo-list">
        {toDoList.map((todo, key) => {
          if (status === "All") {
            return <li key={key}>
                    <div className="view">
                      <input className="toggle" type="checkbox" onChange={() => checkHandler(key)} checked={todo.isDone}/>
                      <label className={todo.isDone ? "done" : undefined}>{todo.todo}</label>
                      <button className="destroy" onClick={() => deleteToDo(key)}></button>
                    </div>
                  </li>
          } else if (status === "Active" && !todo.isDone) {
            return <li key={key}>
                    <div className="view">
                      <input className="toggle" type="checkbox" onChange={() => checkHandler(key)} checked={todo.isDone}/>
                      <label className={todo.isDone ? "done" : undefined}>{todo.todo}</label>
                      <button className="destroy" onClick={() => deleteToDo(key)}></button>
                    </div>
                  </li>
          } else if (status === "Completed" && todo.isDone){
            return <li key={key}>
                    <div className="view">
                      <input className="toggle" type="checkbox" onChange={() => checkHandler(key)} checked={todo.isDone}/>
                      <label className={todo.isDone ? "done" : undefined}>{todo.todo}</label>
                      <button className="destroy" onClick={() => deleteToDo(key)}></button>
                    </div>
                  </li>
          }
          return null
        })}
        </ul>
      </section>
      
      <footer className={toDoList.length === 0 ? "invisible" : "footer"}>
        <span className="todo-count"><strong></strong> items left</span>
        <ul className="filters">
          <li>
            <button className={status === "All" ? "selected" : undefined}value="All" onClick={(e) => filterToDos(e.target.value)}>All</button>
          </li>
          <li>
            <button className={status === "Active" ? "selected" : undefined}value="Active" onClick={(e) => filterToDos(e.target.value)}>Active</button>
          </li>
          <li>
            <button className={status === "Completed" ? "selected" : undefined}value="Completed" onClick={(e) => filterToDos(e.target.value)}>Completed</button>
          </li>
        </ul>
        <button  onClick={clearCompleted}>Clear completed</button>
      </footer>
    </div>
    
  )
}
