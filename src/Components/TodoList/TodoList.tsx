import React, { useContext } from "react";
import { styled } from "styled-components";

// Components
import TodoItem from "../TodoItem/TodoItem";

// Context
import { Context } from "../../Context/Context";

// Interfaces
import { IContext } from "../../modules";

export default function TodoList() {
  const { todos, error }: IContext = useContext(Context);

  return (
    <div>
        {error !== undefined && <p>Error loading data</p>}
        {!todos && <p>Loading...</p>}
      <Ul>
        {todos?.length === 0 ? (
          <NotTodo>Has no business.</NotTodo>
        ) : (
          todos?.map((todo, index) => {
            return <TodoItem key={Number(todo.id)} todo={todo} index={index} />;
          })
        )}
      </Ul>
    </div>
  );
}

const Ul = styled.ul`
  margin: 15px;
  border: 1px solid silver;
  list-style: none;
  padding-left: 0;
`;

const NotTodo = styled.p`
  text-align: center;
`;
