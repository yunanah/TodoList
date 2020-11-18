import React,{ useState } from 'react'; //열고 닫아야하므로 상태관리 useState 필요
import styled,{ css } from 'styled-components';
import { MdAdd } from 'react-icons/md';
import { useTodoDispatch, useTodoNextId } from '../TodoContext';

const CircleButton = styled.button`
    background: #38d9a9;
    &:hover {
        /*커서 올리면 밝아지고*/
        background: #63e6be;
    }
    &:active {
        /*클릭하면 어두워짐*/
        background: #20c997;
    }
    /*다른 내용을 가려야 하므로 z-index*/
    z-index: 5;
    cursor: pointer;
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    /* 가운데, 맨 아래에 위치 */
    position: absolute;
    left: 50%;
    bottom: 0px;
    transform: translate(-50%, 50%); /*버튼을 더 정확하게 찾아가게 함*/
    /*아이콘속성*/
    font-size:60px;
    color: white;
    border-radius: 50%; //40px
    border: none;
    outline: none;
    /*애니메이션 시간, */
    transition: 0.125s all ease-in;
    /*만약 open 값이 true면 보여줄 css*/
    ${props => props.open && css`
        background: #ff6b6b; /* 배경 빨간색 */
        &:hover {
            background: #ff8787;
        }
        &:active {
            background: #fa5252;
        }
        /*버튼 45도 돌려줌. 위치는 그대로 유지하면서 각도만*/
        transform: translate(-50%, 50%) rotate(45deg);
    `}
`;
/*입력폼 위치지정 컴포넌트*/
const InsertFormPositioner = styled.div`
    width: 100%;
    bottom: 0;
    left: 0;
    position: absolute;
`;
// form으로 해주면 -> onSubmit 사용할 수 있음
const InsertForm = styled.form`
    background: #f8f9fa;
    padding: 32px;
    padding-bottom: 72px; /*서클버튼 공간을 위해*/
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
    border-top: 1px solid #e9ecef; /*테두리*/
`;

const Input = styled.input`
    padding: 12px;
    border-radius: 4px;
    border: 1px solid #dee2e6;
    width: 100%;
    outline: none;
    font-size: 18px;
    box-sizing: border-box; /*패딩이 삐져나오지 않게해줌!! input 칸이 padding을 무시하는 것을 막아줌*/
`;

function TodoCreate() {
    // 열고 닫는 상태 관리
    const [open, setOpen] = useState(false);
    //input의 상태관리도 필요 -> 기본값은 공백
    const [value, setValue] = useState('');
    const dispatch = useTodoDispatch();
    // nextId 상태저장 콘텍스트 불러옴 
    const nextId = useTodoNextId();

    const onChange = e => setValue(e.target.value);
    const onToggle = () => setOpen(!open); //open 값을 반전시킴

    //엔터쳐도 새로고침 발생 안함!
    const onSubmit = e => {
        // 브라우저에서 하는 새로고침을 방지한다
        e.preventDefault();
        dispatch({
            type: 'CREATE',
            todo: {
                id: nextId.current,
                text: value,
                done: false,
            }
        });
        // CREATE하고 나서 다시 공백/닫힌상태/nextId+1 로 만든다
        setValue('');
        setOpen(false);
        nextId.current += 1;
    };
    return (
        /* open값이 true이면 렌더링*/
        // onSubmit이 일어날 때 dispatch 하면 됨
        <>
        {open && <InsertFormPositioner>
            <InsertForm onSubmit={onSubmit}>
                <Input placeholder="할 일을 입력 후 , Enter키를 누르세요." autoFocus onChange={onChange} value={value}/>
            </InsertForm>
            </InsertFormPositioner>}
        <CircleButton open={open} onClick={onToggle}>
            <MdAdd />
        </CircleButton></>
    );
}
// 성능 최적화 - 불필요한 렌더링 막음
export default React.memo(TodoCreate);