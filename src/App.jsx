import { useEffect, useState } from 'react'
import './App.css'
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(list);
  }
  else
    return [];
}

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState(getLocalStorage);
  const [editInd,setEditInd]=useState(null);

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(todos))
  }, [todos])

  function handleAdd(event) {
    console.log(editInd);
    if(editInd==null){
    if(todo){
    setTodos([...todos, { todo, isDone: false }]);
    setTodo("");
  }
}
else{
let narr=todos.map((item,ind)=>{
  if(ind==editInd)
    return{todo:todo,isDode:false}
     else
      return item;
});
setTodos(narr);
setTodo("");
setEditInd(null);
}
  }

  function handleChange(event) {
    // console.log(event.target);
    setTodo(event.target.value);
  }

  function handleEdit(event,ind) {
  setEditInd(ind);
    let t = todos.filter((item, i) => ind == i)
    setTodo(t[0].todo);
  }

  function handleDelete(event,ind) {
    let newTodos = todos.filter((item, i) => {
return i != ind;
    })
    setTodos(newTodos);
  }

  function handleCheck(event) {
    let ind = event.target.id;
    let newTodos = [...todos];
    newTodos[ind].isDone = !newTodos[ind].isDone;
    setTodos(newTodos);
  }
  return (
    <div className='container'>
      <div className='todo'>
        <div>  <h3 style={{textDecoration:"underline"}}>Todo List</h3></div>
        <span >Add a Todo :-</span>
        <div className='data'><input className='input' type="text" name="" value={todo} onChange={handleChange} id="" />
          <button className='save' onClick={handleAdd}>Save</button></div>
          <span style={{textDecoration:"underline"}}>Your Todos</span>

        {todos.map((item, ind) => (<div className='show' key={ind}>
          <div>
            <input type="checkbox" onChange={handleCheck} name="" id={ind} />
            <span style={item.isDone ? { textDecoration: "line-through" } : {}}> {item.todo} </span>
          </div>
          <div>
            <button  onClick={(event)=>{handleEdit(event,ind)}} id={ind}><FaEdit /></button>
            <button onClick={(event)=>{handleDelete(event,ind)}} id={ind}><MdDelete /></button></div></div>))}
      </div>

    </div>
  )

}
export default App;
