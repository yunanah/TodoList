/*
This is TodoItem 

*/
import React from 'react';
import styled, {css} from 'styled-components';
// Item에 사용될 두 아이콘 불러오기
import { MdDone, MdDelete } from 'react-icons/md';
import { useTodoDispatch } from '../TodoContext';

// 총 4개의 스타일 컴포넌트 사용

// Remove 스타일 컴포넌트 
const Remove = styled.div`
    opacity: 0; /*처음엔 안보인다 -> TodoItemBlock에 커서를 올리면 보인다 */
    display: flex;
    align-items: center;
    justify-content: center;
    color: #dee2e6;
    font-size: 24px;
    cursor: pointer;
    &:hover {
        color: #ff6b6b; /*Remove아이콘에 커서올리면 색바뀜*/
    }
`;
//체크박스가 보여질 동그라미
const CheckCircle = styled.div`
    width: 32px;
    height: 32px;
    border-radius: 16px; /*동그라미는 16px 또는 50%  */  
    border: 1px solid #ced4da;
    font-size: 24px; /*icon 크기 */
    display: flex;
    align-items: center; /*아이콘이 동그라미 중앙에 나타나도록*/
    justify-content: center; /*아이콘이 동그라미 중앙에 나타나도록 */
    margin-right: 20px;
    cursor: pointer;
    /* 체크서클에 props 값 done이 있으면 색상을 바꿔줌*/
    ${props => props.done && css`
        border: 1px solid #38d9a9;
        color: #38d9a9;

    `}
`;
//Text 스타일 컴포넌트 
const Text = styled.div`
    flex: 1; /*주어진 영역 모두 차지*/
    font-size: 21px;
    color: #495057;
    /*done property 들어오면 컬러 연하게 */
    ${props => props.done && css`
        color: #ced4da;
    `}
`;

//TodoItemBlock에 커서를 올리면 Remove보이도록 
// TodoItemBlock 스타일 컴포넌트
const TodoItemBlock = styled.div`
    display: flex;
    align-items: center;
    padding-top:12px;
    padding-bottom: 12px;
    /* hover 시에만 Remove를 렌덜이하고 싶다! -> Selector을 사용하자 */
    &:hover {
        ${Remove} { /*Remove 컴포넌트에서 만들어지는 클래스 네임이 전달됨 */
            opacity: 1; /*TodoItemBlock에 커서를 올렸을 때 보이게 된다 */
        }
    }
`;

function TodoItem({ id, done, text }) {
    const dispatch = useTodoDispatch();
    const onToggle = () => dispatch({
        type: 'TOGGLE',
        id
    });
    const onRemove = () => dispatch({
        type: 'REMOVE',
        id
    });
    
    return (
        // Item 블록 안에는 CheckCircle-Text-Remove 순서로 렌더링
        // CheckCircle 내부에 done 여부에 따라 MdDone 아이콘을 렌더링
        // Remove 에는 MdDelete 아이콘 렌더링
        <TodoItemBlock>
            <CheckCircle 
                done={done} 
                onClick={onToggle}>
                { done &&  <MdDone />}
            </CheckCircle>
        <Text done={done}>{text}</Text>
        <Remove onClick={onRemove}>
            <MdDelete />
        </Remove>
        </TodoItemBlock>
    );
}
//컴포넌트 최적화 
export default React.memo(TodoItem);

