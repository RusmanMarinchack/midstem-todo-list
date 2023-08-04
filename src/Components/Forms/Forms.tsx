import React, {useContext, useEffect, useState} from "react";


// Context
import { Context } from "../../Context/Context";

import { IContext } from '../../modules'

export default function Forms() {
    const [searchValue, setSearchValue] = useState('')

    const { addTodo }: IContext = useContext(Context)
    

    return(
        <div>
            <form onSubmit={(e) => {
                e.preventDefault()
            }}>
                <div>
                    <input type="text"
                    onChange={(e) => {
                        setSearchValue(e.target.value)
                    }}
                    value={searchValue}
                    placeholder="Enter todo here"/>
                </div>
                <button
                onClick={() => {
                    addTodo && addTodo(searchValue)
                    setSearchValue('')
                }}
                >Submit</button>
            </form>
        </div>
    )
}