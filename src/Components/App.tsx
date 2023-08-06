import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { styled } from 'styled-components';

// Components
import Header from './Header/Header';
import TodoList from './TodoList/TodoList';
import Forms from './Forms/Forms';

// Context
import { Context } from '../Context/Context'

// Intefaces
import { ITodo } from '../modules';


function App() {
  const [todos, setTodos] = useState<ITodo[]>([])
  const [editText, setEditText] = useState('')

 // Получаємо список справ з dataLocalStorej.
  const fetcher = (url: string) => {
    let dataLocalStorej = localStorage.getItem(url)
    return dataLocalStorej ? JSON.parse(dataLocalStorej) : []
  };
  
  const { data, error } = useSWR<ITodo[]>('todos', fetcher)

  let fetchedTodos: ITodo[] = data !== undefined ? data : [];

  
  useEffect(() => {
    setTodos(fetchedTodos)
  }, [fetchedTodos])
// ===

  // Обновляємо список справ.
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))

  }, [todos])

  // Функція для довання нових справ.
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
      } else {
        alert("The field must not be empty!!!")
      }
  }

  // Функція для видалення справ.
  const removeTodo = (i: number) => {
    setTodos(prew => prew.filter((item, index) => index !== i))
  }

  // Помічаємо що справа виконана.
  const doneTodo = (i: number) => {
    setTodos(prev => prev.map((item, index) => {
      if(index === i) {
        return {...item, checked: !item.checked}
      }

      return item
    }));
  }

  // Редагуємо справу.
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
        error,
        addTodo,
        removeTodo,
        doneTodo,
        editTodo,
        editText,
      }
      }>
      <Container>
        <Header/>
        <main>
          <Forms />
          <TodoList/>
        </main>
      </Container>  
    </Context.Provider>
  );
}

export default App;



const Container = styled.div`
  max-width: 750px;
  margin: 15px auto;
  border-radius: 8px;
  border: 1px solid silver;
  overflow: hidden;
`