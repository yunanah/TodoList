//리액트 불러오기
import React from 'react';
// styled-components에서 createGlobalStyle 불러오기
import { createGlobalStyle } from 'styled-components';
//순서대로 TodoTemplate, TodoHead, TodoList, TodoCreate 컴포넌트
import TodoTemplate from './components/TodoTemplate';
import TodoHead from './components/TodoHead';
import TodoList from './components/TodoList';
import TodoCreate from './components/TodoCreate';
// TodoProvider 함수를 TodoContext에서 불러옴
import { TodoProvider } from './TodoContext';
// body에 넣을 GlobalStyle 설정 - 넣고싶은 css 쓰면됨
const GlobalStyle = createGlobalStyle`
  body {
    // 배경색 회색으로 
    background: #e9ecef;
  }
`;

// TodoProvider로 감싼다 - context API
function App() {
  return (
    <TodoProvider>
      <GlobalStyle />
      <TodoTemplate>
        <TodoHead />
        <TodoList />
        <TodoCreate />
      </TodoTemplate>
    </TodoProvider>
  );
}

export default App;
