import React, { useContext } from "react";
import { styled } from "styled-components";

// Context
import { Context } from "../../Context/Context";

import { IContext } from "../../modules"

export default function Header() {
    const { todos }: IContext = useContext(Context)

    return(
        <HeaderStyle className="header">
            <div className="header__container _container">
                <H1>Todos ({ todos?.length })</H1>
            </div>
        </HeaderStyle>
    )
}

const HeaderStyle = styled.header`
background: #f6f6f6;
padding: 20px;
`

const H1 = styled.h1`
font-size: 24px;
font-weight: 700;
margin: 0;
`