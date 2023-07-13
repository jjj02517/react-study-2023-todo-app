import { customCategoryState, ICustomCategory } from './atoms';
import { useForm } from 'react-hook-form';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

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

type IForm = {
	customCategory: string;
};

function CreateCategory() {
	const setCustomCategory = useSetRecoilState(customCategoryState);
	const { register, handleSubmit, setValue } = useForm<IForm>();

	const onValid = ({ customCategory }: IForm) => {
		setCustomCategory(prevCategories => [
			{ title: customCategory, id: Date.now() },
			...prevCategories,
		]);
		setValue('customCategory', '');
	};
	return (
		<Form onSubmit={handleSubmit(onValid)}>
			<Input {...register('customCategory')} placeholder="새 카테고리 추가" />
			<Button>추가</Button>
		</Form>
	);
}

export default CreateCategory;
