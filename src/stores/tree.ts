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
	{ id: 0, label: 'Создал заявку', selected: false },
	{ id: 1, label: 'Согласовать заявку', selected: false },
	{ id: 2, label: 'Исправить заявку', selected: false },
	{ id: 3, label: 'Рассмотреть заявку', selected: false },
	{ id: 4, label: 'Обработать отказ', selected: false },
	{ id: 5, label: 'Исполнить заявку', selected: false },
	{ id: 6, label: 'Принять результаты', selected: false },
	{ id: 7, label: 'Заявка отменена', selected: false },
	{ id: 8, label: 'Заявка выполнена', selected: false },
]

export { myApps, etaps }
