import { useState , useEffect} from "react";

const API_Base = "http://localhost:3001";
function App() {

    const [todos,setTodos] = useState([]);
    const [popactive,setpopActive]=useState(false);
    const [newtodo,setNewtodo]=useState("");

    useEffect(()=>{
      GetTodos();
      console.log(todos);
    },[]);

    const GetTodos=()=>{
      fetch(API_Base+"/todos")
        .then(res =>res.json())
        .then(data=>setTodos(data))
        .catch(err =>console.error("Error:",err));
    }

    const completeTodo = async id => {
      const data = await fetch (API_Base + "/todo/update/"+ id, {method:"PUT"})
        .then(res => res.json())
        
       setTodos(todos => todos.map(todo=>{
         if (todo._id === data._id){
            todo.completed = data.completed;
         }
        
          return todo;

      }
       ));

    }

    const deleteTodo = async id =>{
      const data = await fetch (API_Base + "/todo/delete/" + id, {method:"DELETE"})
        .then(res => res.json())

      setTodos(todos => todos.filter(todo => todo._id !== data._id))

    
    }

    const addNewTodo = async newTodo =>{
      const data = await fetch (API_Base + "/todo/new",
      {method:"POST",
      headers:{
        "content-Type":"application/json"
      },
      body:JSON.stringify({
        text:newtodo
      })
    }).then(res => res.json());
    setTodos([...todos,data]);
    setpopActive(false);
    setNewtodo("");
    }

    return (
    <div className="App">
      <h1>Welcome,Rajesh </h1>
      <h4>Your Task</h4>
      <div className="todos">
      {todos.map(todo=>(
        <div className={"todo" + (todo.completed ? " checked" : "")}
        key = {todo._id} >
        <div className="checkbox"></div>
        <div className="text"onClick={()=>(completeTodo(todo._id))} >{todo.text}</div>
        <div className="delete_todo" onClick={()=>deleteTodo(todo._id)} >X</div>
      </div>
      ))}
      </div>

      <div 
        className="addBtn" 
        onClick={()=> setpopActive(true)}>
        +
      </div>

      {
        popactive? (
          <div className="popUP">
          <div className="deleteBtn" 
            onClick={()=>setpopActive(false)}>X</div>
          <div className="content">
          <h3>Add Task</h3>
          <input type="text"
            onChange={d=> setNewtodo(d.target.value)
            }
            value={newtodo} />
          </div>
          <div className="addTask" onClick={addNewTodo}>Create Task </div>
          
          </div>

        ) : ""}
    </div>
  );
}

export default App;
