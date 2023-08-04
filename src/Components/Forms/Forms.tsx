import React, {useContext, useEffect, useState} from "react";
import { styled } from 'styled-components';

// Context
import { Context } from "../../Context/Context";

import { IContext } from '../../modules'

export default function Forms() {
    const [searchValue, setSearchValue] = useState('')
    const [btnText, setBtnText] = useState(false)

    const { addTodo }: IContext = useContext(Context)
    

    return(
        <div>
            <Form onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault()
            }}>
                <WrapperInput>
                    <input type="text"
                    onChange={(e) => {
                        setSearchValue(e.target.value)
                    }}
                    value={searchValue}
                    placeholder="Enter todo here"/>
                </WrapperInput>
                <Submit
                onClick={() => {
                    addTodo && addTodo(searchValue)
                    setSearchValue('')
                }}
                >Submit
                </Submit>
            </Form>
        </div>
    )
}

const Form = styled.form`
display: flex;
margin: 10px 15px;
border: 1px solid silver;
border-radius: 4px;`

const WrapperInput = styled.div`
flex: 1 0 auto;
display: flex;
align-items: center;
overflow: hidden;

& input {
    width: 100%;
    height: 100%;
    padding: 5px;
    border: 1px solid transparent;
    background: transparent;
    outline: none;
    transition: border-color 0.3s;

    &:focus {
        border-color: #000;
    }
}`

const Submit = styled.button`
    padding: 10px 20px;
    background: #0B7BFF;
    border: none;
    color: #fff;
    transition: all 0.3s;

    &:hover {
        background: #0252b0;
    }
`