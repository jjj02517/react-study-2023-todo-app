import React from 'react';
import styled from 'styled-components';

import { useSetRecoilState } from 'recoil';
import { IToDo, toDoState, Categories } from './atoms';

const ToDoList = styled.li`
	display: flex;
	flex-direction: column;
	min-height: 150px;
	padding: 20px;
	background-color: ${props => props.theme.deepBgColor};
	border-radius: 4px;

	& + li {
		margin-top: 10px;
	}
`;
const ButtonWrap = styled.div`
	margin-top: auto;

	button {
		width: 60px;
		padding: 10px;
		background-color: ${props => props.theme.grayColor};
		border: 0;
		color: #fff;
		border-radius: 4px;
		cursor: pointer;

		& + button {
			margin-left: 5px;
		}
	}
`;

function ToDo({ text, category, id }: IToDo) {
	const setToDos = useSetRecoilState(toDoState);
	const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		const {
			currentTarget: { name },
		} = event;

		setToDos(oldToDos => {
			const targetIndex = oldToDos.findIndex(toDo => toDo.id === id);
			// const oldToDo = oldToDos[targetIndex];
			const newToDo = { text, id, category: name as any };
			// console.log(oldToDo, newToDo);
			// console.log(targetIndex);
			return [
				...oldToDos.slice(0, targetIndex),
				newToDo,
				...oldToDos.slice(targetIndex + 1),
			];
		});
	};

	const onClickDelete = (event: React.FormEvent<HTMLButtonElement>) => {
		setToDos(oldToDos => {
			const targetIdx = oldToDos.findIndex(item => item.id === id);
			const newToDo = [...oldToDos];
			newToDo.splice(targetIdx, 1);
			return newToDo;
		});
	};
	return (
		<ToDoList>
			{text}

			<ButtonWrap>
				{category !== Categories.DOING && (
					<button name={Categories.DOING} onClick={onClick}>
						Doing
					</button>
				)}
				{category !== Categories.TODO && (
					<button name={Categories.TODO} onClick={onClick}>
						To Do
					</button>
				)}
				{category !== Categories.DONE && (
					<button name={Categories.DONE} onClick={onClick}>
						DONE
					</button>
				)}
				<button onClick={onClickDelete}>삭제</button>
			</ButtonWrap>
		</ToDoList>
	);
}

export default ToDo;
