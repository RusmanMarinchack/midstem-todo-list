import React, { useContext, useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faEdit, faRemove } from "@fortawesome/free-solid-svg-icons";
import { styled } from "styled-components";

// Interfaces
import { IContext, ITodo } from "../../modules";

// Context
import { Context } from "../../Context/Context";

interface ITodoItem {
  todo: ITodo;
  index: number;
}

export default function TodoItem({ todo, index }: ITodoItem) {
  const [text, setText] = useState("");
  const [editState, setEditState] = useState(false);

  const { doneTodo, editTodo, removeTodo } = useContext<IContext>(Context);

  const inputRef = useRef<HTMLInputElement>(null);
  const buttonEditRef = useRef<HTMLButtonElement>(null);

  // При кліку на кнопку редагувати ставимл фокус на інпут для редагування.
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current?.focus();
    }
  }, [editState]);


  useEffect(() => {
    setText(todo.task);
  }, []);

  // Вішаємо клік на документ щоб змінити стан редагування справи якщо він активний;
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const isClickInputInside = inputRef.current?.contains(event.target as Node);
      const isClickBtnInside = buttonEditRef.current?.contains(event.target as Node);
      if (!isClickInputInside && !isClickBtnInside) {
        setEditState(false);
      }
    }

    document.addEventListener("click", handleClickOutside);
  }, []);
  
  return (
    <Li>
      <div>
        <LabelChecked
          checked={todo.checked}
          htmlFor={`checked-${index}`}
        ></LabelChecked>
        <InputChecked
          type="checkbox"
          id={`checked-${index}`}
          onChange={() => {
            doneTodo && doneTodo(index);
          }}
          defaultChecked={todo.checked}
        />
      </div>
      <WrapperTask>
        {editState ? (
          <InputEdit
            ref={inputRef}
            type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setText(e.target.value);
              editTodo && editTodo(e.target.value, index);
            }}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === "Enter") {
                setEditState(false);
              }
            }}
            value={text}
          />
        ) : (
          <PEdit checked={todo.checked}>{text}</PEdit>
        )}
      </WrapperTask>
      <BtnBox>
        <BtnEdit
          ref={buttonEditRef}
          onClick={() => {
            setEditState(!editState);
          }}
        >
          {editState ? (
            <FontAwesomeIcon icon={faCheck} />
          ) : (
            <FontAwesomeIcon icon={faEdit} />
          )}
        </BtnEdit>
        <BtnRemove
          onClick={() => {
            removeTodo && removeTodo(index);
          }}
        >
          <FontAwesomeIcon icon={faRemove} />
        </BtnRemove>
      </BtnBox>
    </Li>
  );
}

const Li = styled.li`
  display: flex;
  align-items: center;    
  position: relative;
  font-size: 16px;
  padding: 20px 10px;

  &:nth-child(2n) {
    background: #dddddd;
  }
`;

const WrapperTask = styled.div`
    display: flex;
    align-items: center;
    width: 100%;

    & > * {
        width: 100%;
        display: flex;
        align-items: center;
        height: 100%;
        margin: 0 15px;
        background: transparent;
    }`

const InputEdit = styled.input`
  outline: none;
  border: none;
  border-bottom: 1px solid #000;
  padding: 4px 0;
`;

const PEdit = styled.p<{checked: boolean}>`
  line-height: 150%;
  word-break: break-word;
  border-bottom: 1px solid transparent;
  text-decoration: ${props => props.checked ? "line-through" : "none"};
`;

const InputChecked = styled.input`
  display: none;
`;

const LabelChecked = styled.label<{ checked: boolean }>`
  display: inline-block;
  min-width: 15px;
  height: 15px;
  border: 1px solid #000;
  cursor: pointer;

  &::before {
    content: "";
    position: absolute;
    top: 48%;
    left: 17px;
    transform: rotate(320deg) translateY(-100%);
    width: 10px;
    height: 6px;
    border-bottom: 1px solid #000;
    border-left: 1px solid #000;
    transition: all 0.2s;
    opacity: ${(props) => (props.checked ? 1 : 0)};
  }
`;

const BtnBox = styled.div`
  display: flex;
  min-width: 88px;

  @media (max-width: 575.98px) {
    flex-direction: column;
    min-width: 38px;
  }

  & button {
    display: inline-block;
    padding: 5px 15px;
    color: #fff;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    transition: all 0.3s;

    &:not(:last-child) {
      margin-right: 5px;

      @media (max-width: 575.98px) {
        margin-right: 0px;
        margin-bottom: 5px;
        padding: 5px 12px;
      }
    }
  }
`;

const BtnEdit = styled.button`
  background: #2da745;

  &:hover {
    background: #147327;
  }
`;

const BtnRemove = styled.button`
  background: #dc3545;

  &:hover {
    background: #95202b;
  }
`;
