import { useEffect, useState } from 'react'
import Loader from 'react-js-loader'
import { useParams } from 'react-router-dom'

import { products } from '../../../data'
import Filter from '../../Blocks/Filter/Filter'
import ProductCard from '../../Blocks/ProductCard/ProductCard'
import CenterBlock from '../../Standart/CenterBlock/CenterBlock'
import WidthBlock from '../../Standart/WidthBlock/WidthBlock'

import styles from './CatalogPage.module.css'

function CatalogPage() {
	const { id } = useParams()

	let typeData = id ? id : ''

	typeData =
		typeData === 'bike'
			? 'Велосипеды'
			: typeData === 'mopeds'
				? 'Мопеды'
				: typeData === 'scooters'
					? 'Самокаты'
					: typeData === 'atvs'
						? 'Квадроциклы'
						: ''

	const [searchQuery, setSearchQuery] = useState('')
	const [filterData, setFilterData] = useState({
		reset: '',
		model: '',
		type: '',
		ageGroup: '',
		gender: '',
		brakes: '',
		amor: '',
		material: '',
		color: ''
	})

	const [selectedType, setSelectedType] = useState(typeData)
	const [selectedColor, setSelectedColor] = useState('')
	const [sortOrder, setSortOrder] = useState('')
	const [speedRange, setSpeedRange] = useState([1, 27])
	const [wheelSizeRange, setWheelSizeRange] = useState([12, 29])
	const [frameSizeRange, setFrameSizeRange] = useState([13, 23])

	const [currentPage, setCurrentPage] = useState(1)
	const [itemsPerPage] = useState(9)
	const [loading, setLoading] = useState(false)

	// Сброс страницы при изменении фильтров
	useEffect(() => {
		setCurrentPage(1)
	}, [
		filterData,
		searchQuery,
		selectedType,
		selectedColor,
		sortOrder,
		speedRange,
		wheelSizeRange,
		frameSizeRange
	])

	const resetForm = () => {
		setFilterData({
			reset: '',
			model: '',
			type: '',
			ageGroup: '',
			gender: '',
			brakes: '',
			amor: '',
			material: '',
			color: ''
		})
		setSelectedType('')
		setSelectedColor('')
		setSortOrder('')
		setSearchQuery('')
	}

	const handleSearchChange = event => {
		setSearchQuery(event.target.value)
	}

	const handleChange = e => {
		const { name, value } = e.target
		setFilterData(prevState => ({
			...prevState,
			[name]: value
		}))
	}

	const handleVeloTypeClick = type => {
		setSelectedType(type)
		let newType = ''

		switch (type) {
			case 'Велосипеды':
			case 'Мопеды':
			case 'Самокаты':
			case 'Квадроциклы':
			case 'Мотоциклы':
				newType = ''
				break
			default:
				newType = type
				break
		}

		setFilterData(prevState => ({
			...prevState,
			type: newType
		}))
	}

	const handleColorChange = color => {
		setSelectedColor(color)
		setFilterData(prevState => ({
			...prevState,
			color
		}))
	}

	const handleSpeedChange = newValue => {
		setSpeedRange(newValue)
	}

	const handleWheelSizeChange = newValue => {
		setWheelSizeRange(newValue)
	}

	const handleFrameSizeChange = newValue => {
		setFrameSizeRange(newValue)
	}

	// Фильтрация продуктов
	const filteredProducts = products.filter(request => {
		const speed = parseInt(request.speed, 10)
		const wheelSize = parseInt(request.wheelsSize, 10)
		const frameSize = parseInt(request.frameGrowth, 10)

		const matchesSearchQuery =
			searchQuery === '' ||
			request.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			request.gender.toLowerCase().includes(searchQuery.toLowerCase()) ||
			request.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
			request.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
			request.color.toLowerCase().includes(searchQuery.toLowerCase()) ||
			request.frameMaterial.toLowerCase().includes(searchQuery.toLowerCase())

		return (
			matchesSearchQuery &&
			(selectedType === '' ||
				request.type.toLowerCase().includes(selectedType.toLowerCase())) &&
			(filterData.type === '' ||
				request.category
					.toLowerCase()
					.includes(filterData.type.toLowerCase())) &&
			(filterData.model === '' ||
				request.name.toLowerCase().includes(filterData.model.toLowerCase())) &&
			(filterData.brakes === '' ||
				request.brakes
					.toLowerCase()
					.includes(filterData.brakes.toLowerCase())) &&
			(filterData.ageGroup === '' ||
				request.ageGroup
					.toLowerCase()
					.includes(filterData.ageGroup.toLowerCase())) &&
			(filterData.gender === '' ||
				request.gender
					.toLowerCase()
					.includes(filterData.gender.toLowerCase())) &&
			(filterData.amor === '' ||
				request.amor.toLowerCase().includes(filterData.amor.toLowerCase())) &&
			(filterData.material === '' ||
				request.frameMaterial
					.toLowerCase()
					.includes(filterData.material.toLowerCase())) &&
			(filterData.color === '' ||
				request.color.toLowerCase().includes(filterData.color.toLowerCase())) &&
			speed >= speedRange[0] &&
			speed <= speedRange[1] &&
			wheelSize >= wheelSizeRange[0] &&
			wheelSize <= wheelSizeRange[1] &&
			frameSize >= frameSizeRange[0] &&
			frameSize <= frameSizeRange[1]
		)
	})

	// Сортировка продуктов по цене
	const sortedProducts = [...filteredProducts].sort((a, b) => {
		const priceA = a.currentPrice
		const priceB = b.currentPrice
		if (sortOrder === 'asc') {
			return priceA - priceB
		} else if (sortOrder === 'desc') {
			return priceB - priceA
		}
		return 0
	})

	// Разбиение на страницы
	const paginatedProducts = sortedProducts.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	)

	const totalPages = Math.ceil(sortedProducts.length / itemsPerPage)

	const handlePageChange = pageNumber => {
		setCurrentPage(pageNumber)
		window.scrollTo({
			top: 0, //px
			behavior: 'smooth'
		})
	}

	const handleSortOrderChange = e => {
		setSortOrder(e.target.value) // Обновляем состояние порядка сортировки
	}

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'instant' })
	}, [])

	return (
		<main>
			<CenterBlock>
				<WidthBlock>
					<div className={styles.search_container}>
						<input
							type='text'
							placeholder='Поиск...'
							value={searchQuery}
							onChange={handleSearchChange}
							className={styles.search_input}
						/>
					</div>

					<Filter
						handleChange={handleChange}
						filterData={filterData}
						selectedType={selectedType}
						selectedColor={selectedColor}
						handleVeloTypeClick={handleVeloTypeClick}
						resetForm={resetForm}
						handleColorChange={handleColorChange}
						speedRange={speedRange}
						handleSpeedChange={handleSpeedChange}
						wheelSizeRange={wheelSizeRange}
						handleWheelSizeChange={handleWheelSizeChange}
						frameSizeRange={frameSizeRange}
						handleFrameSizeChange={handleFrameSizeChange}
					/>

					<div className={styles.price}>
						<p>
							Количество товаров: <span>{sortedProducts.length}</span>
						</p>

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
								<option value='asc'>По возрастанию</option>
								<option value='desc'>По убыванию</option>
							</select>
						</div>
					</div>

					<div className={styles.cards_wrapper}>
						{paginatedProducts.length > 0 ? (
							paginatedProducts.map((product, index) => (
								<ProductCard key={index} {...product} />
							))
						) : (
							<p className={styles.no_results}>
								Нет товаров, соответствующих выбранным фильтрам.
							</p>
						)}
					</div>

					{loading && (
						<div className={styles.loader}>
							<Loader type='spinner-circle' bgColor={'#f77523'} size={128} />
						</div>
					)}

					<div className={styles.pagination}>
						{Array.from({ length: totalPages }, (_, index) => (
							<button
								key={index}
								onClick={() => handlePageChange(index + 1)}
								className={currentPage === index + 1 ? styles.active : ''}
							>
								{index + 1}
							</button>
						))}
					</div>
				</WidthBlock>
			</CenterBlock>
		</main>
	)
}

export default CatalogPage
