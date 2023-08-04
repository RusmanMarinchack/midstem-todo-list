import React, { useContext, useEffect, useState, useRef, ReactEventHandler } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faEdit, faRemove } from "@fortawesome/free-solid-svg-icons";
import { styled } from "styled-components";

import { IContext, ITodo } from "../../modules";

import { Context } from '../../Context/Context'

interface ITodoItem {
    todo: ITodo
    index: number
}

export default function TodoItem({ todo, index }: ITodoItem) {
    const [text, setText] = useState('')
    const [editState, setEditState] = useState(false)

    const { doneTodo, editTodo, removeTodo } = useContext<IContext>(Context)

    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if(inputRef.current) {
            inputRef.current.focus()
        }
    }, [editState])

    useEffect(() => {
        setText(todo.task)
    }, [todo.task])

    return(
        <li>
            <input type="checkbox"
            onChange={() => {
                doneTodo && doneTodo(index)
            }}
            defaultChecked={todo.checked}
            />
            {editState ?
            <input 
            ref={inputRef}
            type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setText(e.target.value)
                editTodo && editTodo(e.target.value, index)
            }}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                if(e.key === 'Enter') {
                    setEditState(!editState)
                }
            }}
            onBlur={() => {
                setEditState(false)
            }}
            value={text}
            />
            :
            <button>{ text }</button>
            }
            <div>
                <button
                onClick={() => {
                    setEditState(!editState)
                }}
                >
                {editState ? <FontAwesomeIcon icon={faCheck}/> : <FontAwesomeIcon icon={faEdit}/>}
                </button>
                <button
                onClick={() => {
                    removeTodo && removeTodo(index)
                }}
                >
                    <FontAwesomeIcon icon={faRemove}/>
                </button>
            </div>
        </li>
    )
}