import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import { Colors } from '../../../data'
import serverConfig from '../../../serverConfig'
import Button from '../../Standart/Button/Button'
import Scale from '../Scale/Scale'

import styles from './Filter.module.css'

const fetchProducts = async () => {
	try {
		const response = await axios.get(`${serverConfig}/items`)
		return response.data
	} catch (error) {
		console.error('Error fetching products:', error)
		return []
	}
}

function Filter({
	handleChange,
	filterData,
	selectedType,
	selectedColor,
	handleVeloTypeClick,
	resetForm,
	handleColorChange,
	speedRange,
	handleSpeedChange,
	wheelSizeRange,
	handleWheelSizeChange,
	frameSizeRange,
	handleFrameSizeChange,
	mobileReset
}) {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false)
	const dropdownRef = useRef(null)
	const [productsDB, setProducts] = useState([])
	const [groups, setGroups] = useState([])

	useEffect(() => {
		const getProducts = async () => {
			const productsDB = await fetchProducts()
			// console.log(productsDB)
			setProducts(productsDB)
		}
		getProducts()
	}, [])

	useEffect(() => {
		const fetchGroups = async () => {
			try {
				const response = await axios.get(`${serverConfig}/groups`)
				setGroups(response.data)
			} catch (error) {
				console.error('Error fetching groups:', error)
			}
		}
		fetchGroups()
	}, [])

	const handleColorClick = color => {
		handleColorChange(color)
		setIsDropdownOpen(false)
		handleChange({ target: { name: 'color', value: color } })
	}

	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen)
	}

	const handleResetFilters = () => {
		handleSpeedChange([1, 27])
		handleWheelSizeChange([12, 29])
		handleFrameSizeChange([13, 23])
		handleColorChange('')
		setIsDropdownOpen(false)
		resetForm()
	}

	useEffect(() => {
		if (!selectedColor) {
			setIsDropdownOpen(false)
		}
	}, [selectedColor])

	const veloTypes = [
		{ russian: 'Велосипеды', english: 'bike' },
		{ russian: 'Мопеды', english: 'mopeds' },
		{ russian: 'Самокаты', english: 'scooters' },
		{ russian: 'Квадроциклы', english: 'atvs' }
	]

	const handleClickOutside = event => {
		if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
			setIsDropdownOpen(false)
		}
	}

	useEffect(() => {
		if (isDropdownOpen) {
			document.addEventListener('mousedown', handleClickOutside)
		} else {
			document.removeEventListener('mousedown', handleClickOutside)
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [isDropdownOpen])


	const transliterate = text => {
		if (!text || typeof text !== 'string') {
			return ''
		}

		const map = {
			А: 'A',
			Б: 'B',
			В: 'V',
			Г: 'G',
			Д: 'D',
			Е: 'E',
			Ё: 'Yo',
			Ж: 'Zh',
			З: 'Z',
			И: 'I',
			Й: 'J',
			К: 'K',
			Л: 'L',
			М: 'M',
			Н: 'N',
			О: 'O',
			П: 'P',
			Р: 'R',
			С: 'S',
			Т: 'T',
			У: 'U',
			Ф: 'F',
			Х: 'Kh',
			Ц: 'Ts',
			Ч: 'Ch',
			Ш: 'Sh',
			Щ: 'Shch',
			Ъ: '',
			Ы: 'Y',
			Ь: '',
			Э: 'E',
			Ю: 'Yu',
			Я: 'Ya',
			а: 'a',
			б: 'b',
			в: 'v',
			г: 'g',
			д: 'd',
			е: 'e',
			ё: 'yo',
			ж: 'zh',
			з: 'z',
			и: 'i',
			й: 'j',
			к: 'k',
			л: 'l',
			м: 'm',
			н: 'n',
			о: 'o',
			п: 'p',
			р: 'r',
			с: 's',
			т: 't',
			у: 'u',
			ф: 'f',
			х: 'kh',
			ц: 'ts',
			ч: 'ch',
			ш: 'sh',
			щ: 'shch',
			ъ: '',
			ы: 'y',
			ь: '',
			э: 'e',
			ю: 'yu',
			я: 'ya'
		}

		return text
			.toLowerCase()
			.split('')
			.map(char => map[char] || char)
			.join('')
			.replace(/ /g, '_')
	}

	return (
		<div className={styles.filter_wrapper}>
			<ul className={styles.velo_types}>
				{groups.map(type => (
					<Link
						to={`/catalog/${transliterate(type.name)}`}
						key={type.id}
						onClick={() => handleVeloTypeClick(type.name)}
						className={selectedType === type.name ? styles.selected : ''}
					>
						{type.name}
					</Link>
				)).reverse()}
			</ul>
			<Button
				to='/catalog'
				onClick={handleResetFilters}
				className={styles.pc_reset}
			>
				Сбросить фильтр
			</Button>
			<Button
				to='/catalog'
				onClick={() => {
					handleResetFilters()
					mobileReset()
				}}
				className={styles.mobile_reset}
			>
				Сбросить фильтр
			</Button>
			<select
				className={styles.filter_item}
				name='model'
				id=''
				value={filterData.model}
				onChange={handleChange}
			>
				<option value='' disabled hidden defaultValue>
					Модель
				</option>
				<option value=''>Все</option>
				{[...new Set(productsDB.map(product => product.name))].map(
					(name, index) => (
						<option key={index} value={name}>
							{name}
						</option>
					)
				)}

				{/* <option value='DISCO'>DISCO</option>
				<option value='QUEST DISC 29'>QUEST DISC 29</option>
				<option value='ROCKY 2.0 DISC 29'>ROCKY 2.0 DISC 29</option> */}
			</select>

			<select
				className={styles.filter_item}
				name='type'
				id=''
				value={filterData.type}
				onChange={handleChange}
			>
				<option value='' disabled hidden defaultValue>
					Тип
				</option>
				<option value=''>Все</option>
				<option value='Горный'>Горный</option>
				<option value='Городской'>Городской</option>
				<option value='Складной'>Складной</option>
				<option value='Шоссейный'>Шоссейный</option>
				<option value='Подростковый'>Подростковый</option>
			</select>

			<select
				className={styles.filter_item}
				name='ageGroup'
				id=''
				value={filterData.ageGroup}
				onChange={handleChange}
			>
				<option value='' disabled hidden defaultValue>
					Возрастная группа
				</option>
				<option value=''>Все</option>
				<option value='Для взрослых'>Для взрослых</option>
				<option value='От 2 до 5 лет'>От 2 до 5 лет</option>
				<option value='От 3 до 6 лет'>От 3 до 6 лет</option>
				<option value='От 5 до 8 лет'>От 5 до 8 лет</option>
				<option value='Подростковый'>Подростковый</option>
			</select>
			<select
				className={styles.filter_item}
				name='gender'
				id=''
				value={filterData.gender}
				onChange={handleChange}
			>
				<option value='' disabled hidden defaultValue>
					Пол
				</option>
				<option value=''>Все</option>
				<option value='Мужской'>Мужской</option>
				<option value='Женский'>Женский</option>
			</select>

			<select
				className={styles.filter_item}
				name='breaks'
				id=''
				value={filterData.breaks}
				onChange={handleChange}
			>
				<option value='' disabled hidden defaultValue>
					Тормоза
				</option>
				<option value=''>Все</option>
				<option value='U-brake'>U-brake</option>
				<option value='V-brake'>V-brake</option>
				<option value='Дисковые гидравлические'>Дисковые гидравлические</option>
				<option value='Дисковые механические'>Дисковые механические</option>
				<option value='Клещевой'>Клещевой</option>
				<option value='Ножной тормоз'>Ножной тормоз</option>
				<option value='Передний V-brake'>Передний V-brake</option>
				<option value='Передний клещевой'>Передний клещевой</option>
			</select>
			<select
				className={styles.filter_item}
				name='amortization'
				id=''
				value={filterData.amortization}
				onChange={handleChange}
			>
				<option value='' disabled hidden defaultValue>
					Амортизация
				</option>
				<option value=''>Все</option>
				<option value='Двухподвес'>Двухподвес</option>
				<option value='Жесткая вилка'>Жесткая вилка</option>
				<option value='Хардтейл'>Хардтейл</option>
			</select>
			<div className={styles.custom_color_filter} ref={dropdownRef}>
				<div className={styles.color_selected} onClick={toggleDropdown}>
					{selectedColor ? (
						<div
							className={styles.color_preview}
							style={{ backgroundColor: Colors[selectedColor] }}
						></div>
					) : (
						<p className={styles.custom_color_title}>Цвет</p>
					)}
				</div>
				{isDropdownOpen && (
					<div className={styles.color_wrapper}>
						{Object.keys(Colors).map(color => (
							<div
								key={color}
								className={styles.color_item}
								style={{ backgroundColor: Colors[color] }}
								onClick={() => handleColorClick(color)}
							></div>
						))}
					</div>
				)}
			</div>
			<select
				className={styles.filter_item}
				name='material'
				id=''
				value={filterData.material}
				onChange={handleChange}
			>
				<option value='' disabled hidden defaultValue>
					Материал рамы
				</option>
				<option value=''>Все</option>
				<option value='Алюминий'>Алюминий</option>
				<option value='Сталь'>Сталь</option>
			</select>
			<div className={styles.scale_wrapper}>
				<div className={styles.filter_item__scale}>
					<Scale
						value={speedRange}
						onChange={handleSpeedChange}
						min={1}
						max={27}
						title={'Количество скоростей'}
					/>
				</div>
				<div className={styles.filter_item__scale}>
					<Scale
						value={wheelSizeRange}
						onChange={handleWheelSizeChange}
						min={12}
						max={29}
						title={'Диаметр колеса'}
					/>
				</div>
				<div className={styles.filter_item__scale}>
					<Scale
						value={frameSizeRange}
						onChange={handleFrameSizeChange}
						min={13}
						max={23}
						title={'Ростовка рамы'}
					/>
				</div>
			</div>
		</div>
	)
}

export default Filter
