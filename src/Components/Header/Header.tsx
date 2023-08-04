import React, { useContext } from "react";
import { styled } from 'styled-components';

// Context
import { Context } from "../../Context/Context";

import { IContext } from "../../modules"

export default function Header() {
    const { todos }: IContext = useContext(Context)
    console.log(todos)
    return(
        <header className="header">
            <div className="header__container _container">
                <h1>Todos ({ todos?.length })</h1>
            </div>
        </header>
    )
}