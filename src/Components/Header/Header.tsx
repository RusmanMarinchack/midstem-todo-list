import React, { useContext } from "react";
import { styled } from 'styled-components';

// Context
import { Context } from "../../Context/Context";

import { IContext } from "../../modules"

export default function Header() {
    const { todos }: IContext = useContext(Context)
    console.log(todos)
    return(
        <HeaderStyle className="header">
            <div className="header__container _container">
                <H1>Todos ({ todos?.length })</H1>
            </div>
        </HeaderStyle>
    )
}

const HeaderStyle = styled.header`
background: #e0e0e0;
padding: 20px;
`

const H1 = styled.h1`
font-size: 24px;
font-weight: 700;
margin: 0;
`