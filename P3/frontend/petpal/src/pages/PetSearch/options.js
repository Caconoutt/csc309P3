export const locaOptions = [
	{
		name: 'Ontario',
		value: 'Ontario',
	},
	{
		name: 'British Columbia',
		value: 'British Columbia',
	},
	{
		name: 'Quebec',
		value: 'Quebec',
	},
	{
		name: 'Alberta',
		value: 'Alberta',
	},
	{
		name: 'Nova Scotia',
		value: 'Nova Scotia',
	},
	{
		name: 'Saskat',
		value: 'Saskat',
	},
]

export const ageOps = [
	{
		name: '0-1',
		value: '0-1',
	},
	{
		name: '1-3',
		value: '1-3',
	},
	{
		name: '3-5',
		value: '3-5',
	},
]

export const sizeOps = [
	{
		name: 'Small',
		value: 'small',
	},
	{
		name: 'Medium',
		value: 'medium',
	},
	{
		name: 'Large',
		value: 'large',
	},
]

export const ColorOps = [
	{
		name: 'White/light',
		value: 'White/light',
	},
	{
		name: 'Black/dark',
		value: 'Black/dark',
	},
	{
		name: 'Colorless',
		value: 'Colorless',
	},
	{
		name: 'Bicolor',
		value: 'Bicolor',
	},
	{
		name: 'Multi-color',
		value: 'Multi-color',
	},
]

export const StatusOps = [
	{
		name: 'Adopted',
		value: 'Adopted',
	},
	{
		name: 'Withdrawed',
		value: 'Withdrawed',
	},
	{
		name: 'Available',
		value: 'Available',
	},
	{
		name: 'Pending',
		value: 'Pending',
	},
]

export const filterList = [
	{
		name: 'Location',
		value: locaOptions,
	},

	{
		name: 'Age',
		value: ageOps,
	},
	{
		name: 'Size',
		value: sizeOps,
	},
	{
		name: 'Color',
		value: ColorOps,
	},
	{
		name: 'Status',
		value: StatusOps,
	},
]

export const sortList = [
	{
		name: 'Sort',
		value: [
			{
				name: 'name',
				value: 'name',
			},
			{
				name: 'age',
				value: 'age',
			},
			{
				name: 'size',
				value: 'size',
			},
		],
	},
]

export const radioList = ['Filter', 'Sort', 'Shelter']

export const params = {
	Filter: {
		Location: [],
		Age: [],
		Size: [],
		Color: [],
		Status: [],
	},
	Sort: {
		Sort: [],
	},
	Shelter: {
		Shelter: [],
	},
}