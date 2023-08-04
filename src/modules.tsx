import React from "react";

export interface ITodo {
    id: number
    task: string
    checked: boolean
}

export interface IContext {
    todos?: ITodo[]
    error?: unknown
    addTodo?: (task: string) => void
    removeTodo?: (i: number) => void
    doneTodo?: (i: number) => void
    editTodo?: (task: string, i: number) => void
    editText?: string
    edit?: boolean
}