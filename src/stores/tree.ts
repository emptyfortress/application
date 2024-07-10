const myApps = [
	{
		text: 'Мои приложения',
		text1: '',
		hidden: false,
		type: 0,
		selected: false,
		fields: [],
		children: [
			{
				text: 'Заявка',
				text1: 'Описание',
				hidden: false,
				selected: false,
				type: 1,
				fields: [],
			},
			{
				text: 'Архив',
				text1: 'Описание',
				hidden: false,
				selected: false,
				type: 1,
			},
		],
	},
]

const etaps = [
	{ id: 0, label: 'Создал заявку', active: false },
	{ id: 1, label: 'Согласовать заявку', active: false },
	{ id: 2, label: 'Исправить заявку', active: false },
	{ id: 3, label: 'Рассмотреть заявку', active: false },
	{ id: 4, label: 'Обработать отказ', active: false },
	{ id: 5, label: 'Исполнить заявку', active: false },
	{ id: 6, label: 'Принять результаты', active: false },
	{ id: 7, label: 'Заявка отменена', active: false },
	{ id: 8, label: 'Заявка выполнена', active: false },
]

export { myApps, etaps }
