import React, { useContext, useEffect, useState, useRef } from "react";
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
    }, [])

    return(
        <Li>
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
            onChange={(e) => {
                setText(e.target.value)
                editTodo && editTodo(e.target.value, index)
            }}
            onKeyDown={(e) => {
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
            <p>{ text }</p>
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
        </Li>
    )
}

const Li = styled.li `
display: flex;
align-items: center;`