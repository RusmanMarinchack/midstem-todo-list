import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { styled } from 'styled-components';

// Components
import Header from './Header/Header';
import TodoList from './TodoList/TodoList';
import Forms from './Forms/Forms';

// import { ITodo } from '../modules'

// Context
import { Context } from '../Context/Context'
import { ITodo } from '../modules';


function App() {
  const [todos, setTodos] = useState<ITodo[]>([])
  const [editText, setEditText] = useState<string>('')
  const [edit, setEdit] = useState<boolean>(false)

  const fetcher = (url: string) => {
    let dataLocalStorej = localStorage.getItem(url)
    return dataLocalStorej ? JSON.parse(dataLocalStorej) : []
  };
  

  const { data, error } = useSWR<any>('todos', fetcher)

  let fetchedTodos: ITodo[] = data !== undefined ? data : [];

  useEffect(() => {
    setTodos(fetchedTodos)
  }, [fetchedTodos])
 
  // useEffect(() => {
  //   localStorage.setItem('todos', JSON.stringify([{id: 111, task: 'sadads', checked: false}]))
  // }, [])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const addTodo = (todo: string) => {
    let newId: number = 1;

    todos.forEach(item => {
      newId += item.id
    })


    if(todo !== '') {
      let newTodo = {
        id: newId,
        task: todo,
        checked: false
      }

      
        setTodos(prevTodos => [newTodo, ...prevTodos]);
      }
      
  }

  const removeTodo = (i: number) => {
    setTodos(prew => prew.filter((item, index) => index !== i))
  }

  const doneTodo = (i: number) => {
    setTodos(prev => prev.map((item, index) => {
      if(index === i) {
        return {...item, checked: !item.checked}
      }

      return item
    }));
  }

  const editTodo = (task: string, i: number) => {
    setEditText(task)

    setTodos(prev => {
      return prev.map((item, index) => {
        if(index === i) {
          return {...item, task: task}
        }
  
        return item
      })
    });
  }

  return (
    <Context.Provider 
    value={
      {
        todos,
        addTodo,
        removeTodo,
        doneTodo,
        editTodo,
        editText,
        edit,
      }
      }>
      <div className="">
        <Header/>
        <main>
          <Forms />
          <TodoList todos={todos}/>
        </main>
      </div>  
    </Context.Provider>
  );
}

export default App;