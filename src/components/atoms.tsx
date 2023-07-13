import { atom, selector } from 'recoil';

// type categories = 'TODO' | 'DOING' | 'DONE';
export enum Categories {
	'TODO' = 'TODO',
	'DOING' = 'DOING',
	'DONE' = 'DONE',
}
export type IToDo = {
	text: string;
	id: number;
	category: Categories;
};

export interface ICustomCategory {
	title: string;
	id: number;
}

// Atom Effects
const localStorageEffect =
	(key: string) =>
	({ setSelf, onSet }: any) => {
		const savedValue = localStorage.getItem(key);
		// setSelf -> Callbacks to set or reset the value of the atom.
		if (savedValue != null) {
			setSelf(JSON.parse(savedValue));
		}

		// onSet -> Subscribe to changes in the atom value.
		onSet((newValue: any, _: any, isReset: boolean) => {
			isReset
				? localStorage.removeItem(key)
				: localStorage.setItem(key, JSON.stringify(newValue));
		});
	};

export const customCategoryState = atom<ICustomCategory[]>({
	key: 'customCategory',
	default: [],
});

export const categoryState = atom<Categories>({
	key: 'category',
	default: Categories.TODO,
});

export const toDoState = atom<IToDo[]>({
	key: 'toDo',
	default: [],
	effects: [localStorageEffect('toDo')],
});

export const toDoSelector = selector({
	key: 'toDoSelector',
	get: ({ get }) => {
		const toDos = get(toDoState);
		const category = get(categoryState);

		return toDos.filter(toDo => toDo.category === category);

		// 이건 하나하나씩 하는 방법
		// return [
		// 	toDos.filter(toDo => toDo.category === 'TODO'),
		// 	toDos.filter(toDo => toDo.category === 'DOING'),
		// 	toDos.filter(toDo => toDo.category === 'DONE'),
		// ];
	},
});
