import React, { useReducer, createContext, useContext, useRef } from 'react';
//초기상태 배열을 정의한다
const initialTodos = [
    // todo 객체를 4개 만든다
    {
        id: 1,
        text: '프로젝트 생성하기',
        done: true,
    },
    {
        id: 2,
        text: '컴포넌트 스타일링하기',
        done: true,
    },
    {
        id: 3,
        text: 'Context 만들기',
        done: false,
    },
    {
        id: 4,
        text: '기능 구현하기',
        done: false,
    },
];
// state와 action을 가져와서 다음상태를 업데이트해줌
function todoReducer(state, action) {
    switch(action.type) {
        case 'CREATE' :
            // action안에 todo 항목을 넣어서 dispatch 함
            return state.concat(action.todo);
        case 'TOGGLE' :
            return state.map(
                // map 을 써서 모든 todo에 대하여 변환을 해줄 것임
                // id가 일치하면 -> 기존 todo 에다가 done 값 스위칭 
                // 다르면 -> 그냥 원래대로 유지
                todo => todo.id === action.id ? {...todo, done: !todo.done} : todo
            );
        case 'REMOVE' :
            // id가 일치하지 않는 (즉 제거되지 않은) todo 들만 filter함
            return state.filter(todo => todo.id !== action.id);
        default:
            //처리할 수 없는 액션이 온다면?
            throw new Error(`Unhandled Action Type: ${action.type}`);
    }
} 
// Context 안에는 Provider라는 컴포넌트가 있다
const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
const TodoNextIdContext = createContext();

// 하나의 컴포넌트 export 
export function TodoProvider({ children }) {
    const nextId = useRef(5);
    // state를 위한 Context와 dispatch를 위한 Context를 만들어야함
    const [state, dispatch] = useReducer(todoReducer, initialTodos);
    return (
        <TodoStateContext.Provider value={state}>
            <TodoDispatchContext.Provider value={dispatch}>
                <TodoNextIdContext.Provider value={nextId}>
                    {children}
                </TodoNextIdContext.Provider>
            </TodoDispatchContext.Provider>
        </TodoStateContext.Provider>
    );
}


//custom Hook 만들어준다
//에러는 컨텍스트가 없을 때 발생 - Provider로 감싸주지 않은 실수처리에 좋다 
export function useTodoState() {
    const context = useContext(TodoStateContext);
    if (!context) {
        throw new Error('Cannot find TodoProvider');
    }
    return context;
}

export function useTodoDispatch() {
    const context = useContext(TodoDispatchContext);
    if (!context) {
        throw new Error('Cannot find TodoProvider');
    }
    return context;
}
// 새로운 항목을 만들때마다 관리해야하므로 필요하다
// TodoCreate에서 사용 
export function useTodoNextId() {
    const context = useContext(TodoNextIdContext);
    if (!context) {
        throw new Error('Cannot find TodoProvider');
    }
    return context;
}