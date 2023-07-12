import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import { categoryState, toDoSelector, toDoState, Categories } from './atoms';
import CreateToDo from './CreateToDo';
import ToDo from './ToDo';

const ToDoWrap = styled.div`
	width: 500px;
	margin: 150px auto;
`;

const Title = styled.h1`
	font-size: 20px;
	font-weight: 600;
	margin-bottom: 20px;
	padding-bottom: 20px;
	border-bottom: 1px solid ${props => props.theme.deepBgColor};
`;

const SubTitle = styled.h3`
	margin-bottom: 10px;
	font-size: 13px;
`;

const ToDoSeletor = styled.select`
	width: 100%;
	height: 50px;
	padding: 0 20px;
	margin-bottom: 20px;
	border: 0;
`;
function ToDoList() {
	// 이건 처음 todo등록만 고려했을때
	// const toDos = useRecoilValue(toDoState);
	// const selectorOutput = useRecoilValue(toDoSelector);
	// 배열 이름은 자유롭게 정하기 toDo, doing, done
	// const [toDo, doing, done] = useRecoilValue(toDoSelector);

	const toDos = useRecoilValue(toDoSelector);

	const [category, setCategory] = useRecoilState(categoryState);
	const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
		setCategory(event.currentTarget.value as any);
	};

	useEffect(() => {
		localStorage.setItem('toDos', JSON.stringify(toDos));
	}, [toDos]);

	return (
		<ToDoWrap>
			<Title>To Do List</Title>

			<SubTitle>아래 카테고리를 선택 후 입력해주세요.</SubTitle>
			<ToDoSeletor value={category} onInput={onInput}>
				<option value={Categories.TODO}>TO DO</option>
				<option value={Categories.DOING}>DOING</option>
				<option value={Categories.DONE}>DONE</option>
			</ToDoSeletor>

			<CreateToDo />

			<ul>
				{toDos?.map(toDo => (
					<ToDo key={toDo.id} {...toDo} />
				))}
			</ul>

			{/* 이건 하나하나씩 하는 방법 */}
			{/* <h2>TO DO</h2>
			<ul>
				{toDo.map(toDo => (
					<ToDo key={toDo.id} {...toDo} />
				))}
			</ul>

			<hr />

			<h2>DOING</h2>
			<ul>
				{doing.map(toDo => (
					<ToDo key={toDo.id} {...toDo} />
				))}
			</ul>

			<hr />

			<h2>DONE</h2>
			<ul>
				{done.map(toDo => (
					<ToDo key={toDo.id} {...toDo} />
				))}
			</ul> */}
		</ToDoWrap>
	);
}

export default ToDoList;
