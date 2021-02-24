import React, { useState, useEffect } from 'react'
import {Button, FormControl, Input, InputLabel} from '@material-ui/core';

import Todo from './Todo'
import db from './firebase'

import './App.css';

import firebase from 'firebase'
import ListAltIcon from '@material-ui/icons/ListAlt';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  // its basically runs when app loads
  useEffect(()=> {
    // this code fires when app loads
    db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      // console.log(snapshot.docs.map((doc) => doc.data()));
      setTodos(snapshot.docs.map(doc => doc.data().todo))
    })
  }, [])

  const addTodo =(event) => {
    event.preventDefault();

    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    // setTodos([...todos, input])

    setInput('')
  }

  return (
    <div className="App">
      <h1><ListAltIcon /> My Todo List</h1>
      <form>
        <FormControl>
          <InputLabel>Write a Todo</InputLabel>
          <Input
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
        </FormControl>        
        <Button
          type="submit"
          onClick={addTodo}
          variant="contained"
          color="primary"
          disabled={!input}
        >
          Add Todo
        </Button>
      </form>
      <ul>
        {todos.map((todo, i) => (
          <Todo text={todo} />
        ))}
      </ul>
    </div>
  );
}

export default App;
