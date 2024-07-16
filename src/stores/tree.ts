const myApps = [
	{
		id: 0,
		text: 'Мои приложения',
		descr: '',
		hidden: false,
		type: 0,
		selected: false,
		children: [
			{
				id: 1,
				text: 'Заявка',
				descr: 'Простая заявка товаров',
				hidden: false,
				selected: false,
				type: 1,
				file: 'zay',
			},
			{
				id: 2,
				text: 'Архив',
				descr: 'Приложение без процесса',
				hidden: false,
				selected: false,
				type: 1,
				file: 'zay',
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
