import React, { useContext } from "react";

// Components
import TodoItem from "../TodoItem/TodoItem";

// Context
import { Context } from "../../Context/Context";

import { IContext } from "../../modules";



export default function TodoList({  }: IContext) {
    const { todos }: IContext = useContext(Context)

    return(
        <ul>
            {todos?.map((todo, index) => {
                return <TodoItem key={Number(todo.id)} todo={todo} index={index} />
            })}
        </ul>
    )
}