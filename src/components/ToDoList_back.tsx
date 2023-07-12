// import React, { useState } from 'react';

// function ToDoList() {
// 	const [toDo, setToDo] = useState('');

// 	const onChange = (event: React.FormEvent<HTMLInputElement>) => {
// 		const {
// 			currentTarget: { value },
// 		} = event;
// 		setToDo(value);
// 	};
// 	const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
// 		event.preventDefault();
// 		console.log(toDo);
// 	};
// 	return (
// 		<div>
// 			<form onSubmit={onSubmit}>
// 				<input
// 					onChange={onChange}
// 					value={toDo}
// 					type="text"
// 					placeholder="입력하세요"
// 				/>
// 			</form>
// 		</div>
// 	);
// }

import { useForm } from 'react-hook-form';

type IFormData = {
	Email: string;
	FirstName: string;
	LastName: string;
	Username: string;
	Password: string;
	Password1: string;
	// [key: string]: string;
};

function ToDoList() {
	const {
		register,
		watch,
		handleSubmit,
		formState: { errors },
		setError,
	} = useForm<IFormData>();

	const onValid = (data: IFormData) => {
		if (data.Password !== data.Password1) {
			setError(
				'Password1',
				{
					message: '비밀번호가 서로 다릅니다.',
				},
				{ shouldFocus: true },
			);
		}

		// setError('extraError', { message: '서버에러' });
		console.log(data);
	};

	console.log(errors);
	return (
		<div>
			<form
				style={{ display: 'flex', flexDirection: 'column' }}
				onSubmit={handleSubmit(onValid)}
			>
				<input
					{...register('Email', {
						required: '필수 항목입니다.',
						pattern: {
							value: /^[A-Za-z0-9._%+-]+@naver\.com$/,
							message: '이메일 형식이 잘못되었습니다.',
						},
					})}
					placeholder="Email"
				/>
				<p>{errors?.Email?.message as string}</p>
				<input
					{...register('FirstName', {
						required: 'write here',
						// validate: value => !value.includes('nico') || 'error message',
						validate: {
							noNico: value => !value.includes('nico') || 'error message',
							noNick: value => !value.includes('nick') || 'error message',
						},
					})}
					placeholder="FirstName"
				/>
				<p>{errors?.FirstName?.message as string}</p>
				<input
					{...(register('LastName'), { required: true })}
					placeholder="LastName"
				/>
				<input
					{...(register('Username'), { required: true, minLength: 3 })}
					placeholder="Username"
				/>
				<input
					{...(register('Password'), { required: true, minLength: 3 })}
					placeholder="Password"
				/>
				<input
					{...register('Password1', {
						required: true,
						minLength: {
							value: 3,
							message: '패스워드 길이가 짧습니다.',
						},
					})}
					placeholder="password"
				/>
				<p>{errors?.Password1?.message}</p>
				<button>버튼</button>

				{/* <p>{errors?.extraError?.message}</p> */}
			</form>
		</div>
	);
}

export default ToDoList;
