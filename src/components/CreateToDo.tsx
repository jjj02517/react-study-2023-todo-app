import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import { useSetRecoilState, useRecoilValue } from 'recoil';
import { categoryState, toDoState } from './atoms';

const Form = styled.form`
	display: flex;
`;

const Input = styled.input`
	width: 100%;
	height: 50px;
	padding: 0 20px;
`;

const Button = styled.button`
	width: 20%;
	margin-left: 10px;
	flex-shrink: 0;
	background-color: ${props => props.theme.accentColor};
	border: 0;
	color: #fff;
	border-radius: 4px;
`;

const ErrorMsg = styled.p`
	padding-left: 20px;
	margin-top: 10px;
	font-size: 12px;
	color: red;
`;

type IFormData = {
	toDo: string;
};

function CreateToDo() {
	const setToDos = useSetRecoilState(toDoState);

	const category = useRecoilValue(categoryState);

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm<IFormData>();

	const onSubmit = ({ toDo }: IFormData) => {
		// 처음엔 카테고리가 TODO로만 들어가게 작업
		// 이후 사용자가 선택한 select에 따라 카테고리가 다르게 들어가도록 처리
		setToDos(oldToDos => [
			{ text: toDo, id: Date.now(), category: category },
			...oldToDos,
		]);
		setValue('toDo', '');
		console.log(toDo);
	};

	return (
		<>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<Input
					{...register('toDo', {
						required: 'To Do를 입력해주세요',
					})}
					placeholder="To Do를 입력해주세요"
				/>
				<Button>추가</Button>
			</Form>
			<ErrorMsg>{errors?.toDo?.message as string}</ErrorMsg>
		</>
	);
}
export default CreateToDo;
