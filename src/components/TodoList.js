import React from 'react';
import styled from 'styled-components';
import TodoItem from './TodoItem';
import { useTodoState } from '../TodoContext';

const TodoListBlock = styled.div`
    flex: 1; // 앞에서 TodoTemplate을 flex하고, direction을 column해줘서 1하면 다음 칸을 전부 차지함
    padding: 20px 32px;
    padding-bottom: 48px;
    overflow-y: auto; //항목이 많아지는 경우 스크롤바로 보여줄 것
    /* background: gray; // 렌더링 잘 되는지 확인하기 위해 */
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