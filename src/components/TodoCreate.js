import React,{ useState } from 'react';
import styled,{ css } from 'styled-components';
import { MdAdd } from 'react-icons/md';
import { useTodoDispatch, useTodoNextId } from '../TodoContext';

const CircleButton = styled.button`
    background: #38d9a9;
    &:hover {
        background: #63e6be;
    }
    &:active {
        background: #20c997;
    }
    z-index: 5;
    cursor: pointer;
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;

    position: absolute;
    left: 50%;
    bottom: 0px;
    transform: translate(-50%, 50%); //버튼을 더 정확하게 찾아가게 함

    font-size:60px;
    color: white;
    border-radius: 50%; //40px
    border: none;
    outline: none;

    transition: 0.125s all ease-in;
    ${props => props.open && css`
        background: #ff6b6b;
        &:hover {
            background: #ff8787;
        }
        &:active {
            background: #fa5252;
        }
        transform: translate(-50%, 50%) rotate(45deg);
    `}
`;

const InsertFormPositioner = styled.div`
    width: 100%;
    bottom: 0;
    left: 0;
    position: absolute;
`;
// form으로 해주면 엔터칠때마다 새로고침되서 상태가 날라가버림 -> onSubmit으로 제어
const InsertForm = styled.form`
    background: #f8f9fa;
    padding: 32px;
    padding-bottom: 72px;
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
    border-top: 1px solid #e9ecef;
`;

const Input = styled.input`
    padding: 12px;
    border-radius: 4px;
    border: 1px solid #dee2e6;
    width: 100%;
    outline: none;
    font-size: 18px;
    box-sizing: border-box; //패딩이 삐져나오지 않게..
`;

function TodoCreate() {
    const [open, setOpen] = useState(false);
    //input의 상태관리도 필요 -> 기본값은 공백
    const [value, setValue] = useState('');
    const dispatch = useTodoDispatch();
    const nextId = useTodoNextId();

    const onChange = e => setValue(e.target.value);
    const onToggle = () => setOpen(!open);

    //엔터쳐도 새로고침 발생 안함!
    const onSubmit = e => {
        e.preventDefault();
        dispatch({
            type: 'CREATE',
            todo: {
                id: nextId.current,
                text: value,
                done: false,
            }
        });
        setValue('');
        setOpen(false);
        nextId.current += 1;
    };
    return (
        <>
        {open && <InsertFormPositioner>
            <InsertForm onSubmit={onSubmit}>
                <Input placeholder="할 일을 입력 후 , Enter키를 누르세요." autoFoc4us onChange={onChange} value={value}/>
            </InsertForm>
            </InsertFormPositioner>}
        <CircleButton open={open} onClick={onToggle}>
            <MdAdd />
        </CircleButton></>
    );
}

export default React.memo(TodoCreate);