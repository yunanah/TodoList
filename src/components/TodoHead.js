/*
This is TodoHead Component file.
It shows Date, Day, number of unfinished Items.
*/
import React from 'react';
import styled from 'styled-components';
import { useTodoState } from '../TodoContext';
// TodoHead의 css - nested css 문법 사용해서 적어줌
const TodoHeadBlock = styled.div`
    //내부 padding 값
    padding-top: 48px;
    padding-left: 32px;
    padding-right: 32px;
    padding-bottom: 24px;
    border-bottom: 1px solid #e9ecef; //구분선 style
    h1 {
        margin: 0;
        font-size: 36px;
        color: #343a40;
    }
    .day {
        margin-top: 4px;
        color: #868e96;
        font-size: 21px;
    }
    .tasks-left {
        color: #20c997;
        font-size: 18px;
        margin-top: 40px; 
        font-weight: bold;
    }
`;

function TodoHead() {
    // 만든 custom Hook을 통해 현재 todos 배열상태를 불러온다
    const todos = useTodoState();
    //todos의 항목들 중에서 done값이 false인 것들을 undoneTasks에 넣는다 - 할일 개수에 출력할때 사용
    const undoneTasks = todos.filter(todo => !todo.done);

    // 오늘 날짜 불러오기 년월일
    const today = new Date();
    const dateString = today.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
    //요일
    const dayName = today.toLocaleDateString('ko-KR', {
        weekday: 'long',
    });

    return (
        <TodoHeadBlock>
            <h1>{dateString}</h1>
            <div className="day">{dayName}</div>
            <div className="tasks-left">할 일 {undoneTasks.length}개 남음</div>
        </TodoHeadBlock>  
    );
}

export default TodoHead;