import React from 'react';
import styled from 'styled-components';
import TodoItem from './TodoItem';
import { useTodoState } from '../TodoContext';

const TodoListBlock = styled.div`
    flex: 1;
    padding: 20px 32px;
    padding-bottom: 48px;
    overflow-y: auto;
`;

function TodoList() {
    const todos = useTodoState();
    return(
        //각 투두 아이템에 대하여 <TodoItem />으로 매핑하는데 속성값을 넣어준다.
        <TodoListBlock>
            {todos.map(
                todo => 
                <TodoItem 
                    key={todo.id}
                    id={todo.id}
                    done={todo.done}
                    text={todo.text}
                />
            )}
        </TodoListBlock>
    );
  
}

export default TodoList;