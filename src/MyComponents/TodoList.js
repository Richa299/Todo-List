import './TodoList.css'
import ListItem from './ListItem'
import { useState, useEffect } from 'react'


function TodoList(){
    const localStorage_key='acciojob_todo';
    const [todos, setTodos]=useState([])

    const [time, setTime] = useState(null);
    useEffect(() => {
        
            const today = new Date();
            const hours = (today.getHours() < 10 ? '0' : '') + today.getHours();
            const minutes = (today.getMinutes() < 10 ? '0' : '') + today.getMinutes();
            const seconds = (today.getSeconds() < 10 ? '0' : '') + today.getSeconds();
            const timer= hours + ':' + minutes + ':' + seconds;
      
      setTime(timer);
    }, [todos]);
    
 
   //set todos if there is any data present on localstorage and 
   //this should only be render one time thus give empty array[]
    useEffect(()=>{
    const stored_value=JSON.parse(localStorage.getItem(localStorage_key));
    if(stored_value) setTodos(stored_value);
    }, [])

    // updating localstorage and given state as dependency so that whenever
    // there is any chnage in todos, localstorage also gets changed
    useEffect(()=>{
        if(todos.length>0)
    localStorage.setItem(localStorage_key, JSON.stringify(todos))
    }, [todos])

   
    //delete todo on click
   function deleted(id){
    setTodos(todos.filter((todo)=>todo.id !== id ));}

    const [todoInput, setTodoInput]=useState('')
    const handleInput= (e)=>{
    //    if(e.target.length>0)
        setTodoInput(e.target.value);
        
    }
    // const [initial, setColor]=useState('')
    
    const handleSubmit= ()=>{
     
        // todoInputstyle={{color: "red"}}
        if(todoInput.length>0)
        setTodos([{ id: Math.random()*1000, text: todoInput, timing:time},  ...todos])
        setTodoInput('')
    }

 



    return(

        <div className='todo'>
            <div className='form'>
        <input type="text" placeholder='What needs to be done?' onChange={handleInput}  value={todoInput} />
         <button onClick={handleSubmit} >Add Todo</button>
         </div>
         <div className='todo-inner'>
           {todos.map(todos=>(
                <ListItem text={todos.text} id={todos.id} deleted={deleted} time={todos.timing} />
            ))
           }

           </div>
        </div>
        
        
    )
}
export default TodoList