import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import { Colors } from '../../../data'
import Button from '../../Standart/Button/Button'
import Scale from '../Scale/Scale'

import styles from './Filter.module.css'

function Filter({
	handleChange,
	filterData,
	selectedType,
	selectedColor,
	handleVeloTypeClick,
	resetForm,
	handleColorChange,
	sortOrder,
	setSortOrder,
	speedRange,
  handleSpeedChange,
  wheelSizeRange,
  handleWheelSizeChange,
  frameSizeRange,
  handleFrameSizeChange,
	productLength
}) {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false)
	const dropdownRef = useRef(null)

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

	const handleSortOrderChange = e => {
		setSortOrder(e.target.value) // Обновляем состояние порядка сортировки
	}


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

	return (
		<div className={styles.filter_wrapper}>
			<ul className={styles.velo_types}>
				{veloTypes.map(type => (
					<Link
						to={`/catalog/${type.english}`}
						key={type.russian}
						onClick={() => handleVeloTypeClick(type.russian)}
						className={selectedType === type.russian ? styles.selected : ''}
					>
						{type.russian}
					</Link>
				))}
			</ul>
			<Button to='/catalog' onClick={handleResetFilters}>
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
				<option value='DISCO'>DISCO</option>
				<option value='QUEST DISC 29'>QUEST DISC 29</option>
				<option value='ROCKY 2.0 DISC 29'>ROCKY 2.0 DISC 29</option>
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
				name='brakes'
				id=''
				value={filterData.brakes}
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
				name='amor'
				id=''
				value={filterData.amor}
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
			<div className={styles.price}>
				<p>Количество товаров: <span>{productLength}</span></p>

				<div className={styles.price_item}>
					<p>Цены</p>
					<select
						name='price'
						className={styles.filter_price}
						value={sortOrder}
						onChange={handleSortOrderChange}
					>
						<option value='' disabled hidden defaultValue>
							Сортировка
						</option>
						<option value='desc'>По возрастанию</option>
						<option value='asc'>По убыванию</option>
					</select>
				</div>
			</div>
		</div>
	)
}

export default Filter
