/*
This is 'TodoTemplate' component.
It shows an white card on the background body.
*/ 
import React from 'react';
//styled-components 에서 styled 불러오기
import styled from 'styled-components';
// TodoTemplatedBlock 만들어서 스타일링 해줌
const TodoTemplateBlock = styled.div`
    width: 512px;
    height: 768px;

    position: relative; //하단의 + 버튼 만들때 필요
    background: white; //배경 흰색
    border-radius: 16px; //테두리 둥글게
    box-shadow: 0 0 8px rgba(0,0,0,0.04); //그림자 설정 & 투명도
    margin: 0 auto; //페이지 중앙에 위치
    margin-top: 96px; //상단여백 
    margin-bottom: 32px; //하단여백

    display: flex; 
    flex-direction: column; //위에서 아래로 flex display
`;
// children props 를 가져와서 TodoTemplateBlock안에 렌더링 해주면 됨
function TodoTemplate({ children }) {
    return <TodoTemplateBlock>{children}</TodoTemplateBlock>;
}

export default TodoTemplate;