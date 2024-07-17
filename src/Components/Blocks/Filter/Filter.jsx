import { useState } from 'react'

import { Colors } from '../../../data'
import Button from '../../Standart/Button/Button'
import Scale from '../Scale/Scale'

import styles from './Filter.module.css'

function Filter({ ...props }) {
	
	const [selectedColor, setSelectedColor] = useState('')
	const [isDropdownOpen, setIsDropdownOpen] = useState(false)
	const [selectedModel, setSelectedModel] = useState('')
	const [selectedType, setSelectedType] = useState('')
	const [selectedAgeGroup, setSelectedAgeGroup] = useState('')
	const [selectedBrakes, setSelectedBrakes] = useState('')
	const [selectedAmor, setSelectedAmor] = useState('')
	const [selectedMaterial, setSelectedMaterial] = useState('')
	const [temperatureRange, setTemperatureRange] = useState([1, 27])
	const [temperatureRange2, setTemperatureRange2] = useState([12, 29])
	const [temperatureRange3, setTemperatureRange3] = useState([13, 23])

	const handleColorClick = color => {
		setSelectedColor(color)
		setIsDropdownOpen(false)
	}

	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen)
	}

	const handleModelChange = event => {
		setSelectedModel(event.target.value)
	}

	const handleTypeChange = event => {
		setSelectedType(event.target.value)
	}

	const handleAgeGroupChange = event => {
		setSelectedAgeGroup(event.target.value)
	}

	const handleBrakesChange = event => {
		setSelectedBrakes(event.target.value)
	}

	const handleAmorChange = event => {
		setSelectedAmor(event.target.value)
	}

	const handleMaterialChange = event => {
		setSelectedMaterial(event.target.value)
	}

	const handleTemperatureChange = newValue => {
		setTemperatureRange(newValue) // Обработчик для изменения диапазона температуры
	}

	const handleTemperatureChange2 = newValue => {
		setTemperatureRange2(newValue)
	}

	const handleTemperatureChange3 = newValue => {
		setTemperatureRange3(newValue)
	}

	const handleResetFilters = () => {
		setSelectedModel('')
		setSelectedType('')
		setSelectedAgeGroup('')
		setSelectedBrakes('')
		setSelectedAmor('')
		setSelectedMaterial('')
		setTemperatureRange([1, 27])
		setTemperatureRange2([12, 29])
		setTemperatureRange3([13, 23])
		setSelectedColor('')
		setIsDropdownOpen(false)
	}

	return (
		<div className={styles.filter_wrapper}>
			<ul className={styles.velo_types}>
				<li>Велосипеды</li>
				<li>Мопеды</li>
				<li>Самокаты</li>
				<li>Квадроциклы</li>
			</ul>
			<Button onClick={handleResetFilters}>Сбросить фильтр</Button>
			<select
				className={styles.filter_item}
				name='model'
				id=''
				value={selectedModel}
				onChange={handleModelChange}
			>
				<option value='' disabled selected hidden>
					Модель
				</option>
				<option value=''>Все</option>
				<option value='disco'>DISCO</option>
				<option value='quest'>QUEST DISC 29 </option>
				<option value='rocky 2.0'>ROCKY 2.0 DISC 29</option>
			</select>
			<select
				className={styles.filter_item}
				name='type'
				id=''
				value={selectedType}
				onChange={handleTypeChange}
			>
				<option value='' disabled selected hidden>
					Тип
				</option>
				<option value=''>Все</option>
				<option value='mountain'>Горный</option>
				<option value='city'>Городской</option>
				<option value='folding'>Складной</option>
				<option value='road'>Шоссейный</option>
				<option value='teenager'>Подростковый</option>
			</select>
			<select
				className={styles.filter_item}
				name='age_group'
				id=''
				value={selectedAgeGroup}
				onChange={handleAgeGroupChange}
			>
				<option value='' disabled selected hidden>
					Возрастная группа
				</option>
				<option value=''>Все</option>
				<option value='adult'>Для взрослых</option>
				<option value='two_five'>От 2 до 5 лет</option>
				<option value='three_five'>От 3 до 5 лет</option>
				<option value='six_eight'>От 6 до 8 лет</option>
				<option value='teenager'>Подростковый</option>
			</select>
			<div className={styles.gender_filter}>
				<p>Пол</p>
				<div className={styles.checkbox_wrapper}>
					<input type='checkbox' className={styles.checkbox_round} />
					<label htmlFor=''>М</label>
					<input type='checkbox' className={styles.checkbox_round} />
					<label htmlFor=''>Ж</label>
				</div>
			</div>

			<select
				className={styles.filter_item}
				name='brakes'
				id=''
				value={selectedBrakes}
				onChange={handleBrakesChange}
			>
				<option value='' disabled selected hidden>
					Тормоза
				</option>
				<option value=''>Все</option>
				<option value='u_brake'>U-brake</option>
				<option value='v_brake'>V-brake</option>
				<option value='hydraulic_disc_pumps'>Дисковые гидравлические</option>
				<option value='mechanical_disk_drives'>Дисковые механические</option>
				<option value='pincer_brake'>Клещевой</option>
				<option value='foot_brake'>Ножной тормоз</option>
				<option value='front_v_brake'>Передний V-brake</option>
				<option value='front_pincer'>Передний клещевой</option>
			</select>
			<select
				className={styles.filter_item}
				name='type'
				id=''
				value={selectedAmor}
				onChange={handleAmorChange}
			>
				<option value='' disabled selected hidden>
					Амортизация
				</option>
				<option value=''>Все</option>
				<option value='two_suspension'>Двухподвес</option>
				<option value='hard_fork'>Жесткая вилка</option>
				<option value='hard_tail'>Хардтейл</option>
			</select>
			<div className={styles.custom_color_filter}>
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
				value={selectedMaterial}
				onChange={handleMaterialChange}
			>
				<option value='' disabled selected hidden>
					Материал рамы
				</option>
				<option value=''>Все</option>
				<option value='alu'>Алюминий</option>
				<option value='st'>Сталь</option>
			</select>
			<div className={styles.scale_wrapper}>
				<div className={styles.filter_item__scale}>
					<Scale
						value={temperatureRange}
						onChange={handleTemperatureChange}
						min={1}
						max={27}
						title={'Кол-во скоростей'}
					/>
				</div>
				<div className={styles.filter_item__scale}>
					<Scale
						value={temperatureRange2}
						onChange={handleTemperatureChange2}
						min={12}
						max={29}
						title={'Диаметр колеса'}
					/>
				</div>
				<div className={styles.filter_item__scale}>
					<Scale
						value={temperatureRange3}
						onChange={handleTemperatureChange3}
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

{
	/* <div className={styles.material_filter}>
				<p>Материал рамы</p>
				<div className={styles.material_checkbox_wrapper}>
					<div className={styles.mcb_item}>
						<input type='checkbox' className={styles.checkbox_round} />
						<label htmlFor=''>Алюминий</label>
					</div>
					<div className={styles.mcb_item}>
						<input type='checkbox' className={styles.checkbox_round} />
						<label htmlFor=''>Сталь</label>
					</div>
				</div>
			</div> */
}
