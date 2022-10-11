import React from 'react';
import './App.css';
import TodoList from './TodoList';
function App(){
  return(
    <div className="App">
      <div className='container-list'>
      <h1>Accio Todo</h1>
      <TodoList/>
      </div>
    </div>
  )
}
export default App;