import axios from 'axios'
import { useEffect, useState } from 'react'
import Modal from 'react-modal'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import { products } from '../../../data'
import serverConfig from '../../../serverConfig'
import Filter from '../../Blocks/Filter/Filter'
import ProductCard from '../../Blocks/ProductCard/ProductCard'
import CenterBlock from '../../Standart/CenterBlock/CenterBlock'
import WidthBlock from '../../Standart/WidthBlock/WidthBlock'

import styles from './CatalogPage.module.css'

Modal.setAppElement('#root')

const fetchProducts = async () => {
	try {
		const response = await axios.get(`${serverConfig}/items`)
		return response.data
	} catch (error) {
		console.error('Error fetching products:', error)
		return []
	}
}

function CatalogPage() {
	const { id } = useParams()
	const location = useLocation()
	const navigate = useNavigate()
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

	let typeData = id ? id : ''
	typeData =
		typeData === 'velosipedy'
			? 'Велосипеды'
			: typeData === 'mopedy'
				? 'Мопеды'
				: typeData === 'samokaty'
					? 'Самокаты'
					: typeData === 'kvadrotsikly'
						? 'Квадроциклы'
						: typeData === 'mototsikly'
							? 'Мотоциклы'
							: ''

	const [searchQuery, setSearchQuery] = useState('')
	const [filterData, setFilterData] = useState({
		reset: '',
		model: '',
		type: '',
		ageGroup: '',
		gender: '',
		breaks: '',
		amortization: '',
		material: '',
		color: ''
	})

	const [count, setCount] = useState(0)

	const [selectedType, setSelectedType] = useState(typeData || 'Велосипеды')
	const [selectedColor, setSelectedColor] = useState('')
	const [sortOrder, setSortOrder] = useState('')
	const [speedRange, setSpeedRange] = useState([1, 27])
	const [wheelSizeRange, setWheelSizeRange] = useState([12, 29])
	const [frameSizeRange, setFrameSizeRange] = useState([13, 23])

	const [isModalOpen, setIsModalOpen] = useState(false)

	const query = new URLSearchParams(location.search)
	const initialPage = parseInt(query.get('page')) || 1
	const [currentPage, setCurrentPage] = useState(initialPage)
	const [itemsPerPage] = useState(9)

	useEffect(() => {
		setCurrentPage(initialPage)
	}, [initialPage])

	useEffect(() => {
		navigate(`${location.pathname}?page=${currentPage}`, { replace: true })
	}, [currentPage, navigate, location.pathname])

	const resetForm = () => {
		setFilterData({
			reset: '',
			model: '',
			type: '',
			ageGroup: '',
			gender: '',
			breaks: '',
			amortization: '',
			material: '',
			color: ''
		})
		setSelectedType('Велосипеды')
		setSelectedColor('')
		setSortOrder('')
		setSearchQuery('')
		setCurrentPage(1)
	}

	const handleSearchChange = event => {
		setSearchQuery(event.target.value)
		setCurrentPage(1)
	}

	const handleChange = e => {
		const { name, value } = e.target
		setFilterData(prevState => ({
			...prevState,
			[name]: value
		}))
		setCurrentPage(1)
	}

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
		setCurrentPage(1)
	}

	const handleColorChange = color => {
		setSelectedColor(color)
		setFilterData(prevState => ({
			...prevState,
			color
		}))
		setCurrentPage(1)
	}

	const handleSpeedChange = newValue => {
		setSpeedRange(newValue)
		setCurrentPage(1)
	}

	const handleWheelSizeChange = newValue => {
		setWheelSizeRange(newValue)
		setCurrentPage(1)
	}

	const handleFrameSizeChange = newValue => {
		setFrameSizeRange(newValue)
		setCurrentPage(1)
	}

	const filteredProducts = productsDB.filter(request => {
		const speed = parseInt(request.speed, 10)
		const wheelSize = parseInt(request.wheelSize, 10)
		const frameSize = Number(request.frameGrouve)

		// Проверка на количество товара на складе и в магазине
		const totalQuantity = request.Warehouse.count + request.Store.count
		// setCount(totalQuantity)
		if (totalQuantity === 0) {
			return false
		}

		if (request?.group?.name !== 'Велосипеды') {
			const matchesSearchQuery =
				!searchQuery ||
				(request?.name &&
					request.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
				(request?.weight &&
					request.weight.toLowerCase().includes(searchQuery.toLowerCase())) ||
				(request?.fuelTankCapacity &&
					request.fuelTankCapacity
						.toString()
						.toLowerCase()
						.includes(searchQuery.toLowerCase())) ||
				(request?.maximumLoad &&
					request.maximumLoad
						.toLowerCase()
						.includes(searchQuery.toLowerCase())) ||
				(request?.color &&
					request.color.toLowerCase().includes(searchQuery.toLowerCase())) ||
				(request?.starting &&
					request.starting.toLowerCase().includes(searchQuery.toLowerCase())) ||
				(request?.power &&
					request.power.toLowerCase().includes(searchQuery.toLowerCase())) ||
				(request?.wheelbase &&
					request.wheelbase
						.toLowerCase()
						.includes(searchQuery.toLowerCase())) ||
				(request?.frontDerailleur &&
					request.frontDerailleur
						.toLowerCase()
						.includes(searchQuery.toLowerCase())) ||
				(request?.backDerailleur &&
					request.backDerailleur
						.toLowerCase()
						.includes(searchQuery.toLowerCase())) ||
				(request?.size &&
					request.size.toLowerCase().includes(searchQuery.toLowerCase()))

			return (
				matchesSearchQuery &&
				(selectedType === '' ||
					(request?.group?.name &&
						request.group.name
							.toLowerCase()
							.includes(selectedType.toLowerCase())))
			)
		}

		// setCount(request.Warehouse.count + request.Store.count);

		const matchesSearchQuery =
			searchQuery === '' ||
			request.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			request.gender.toLowerCase().includes(searchQuery.toLowerCase()) ||
			request.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
			request.group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			request.color.toLowerCase().includes(searchQuery.toLowerCase()) ||
			request.frame.toLowerCase().includes(searchQuery.toLowerCase())
		// console.log(searchQuery)

		// console.log("frameSize:", frameSize)
		// console.log("frameSizeRange:", frameSizeRange)


		return (
			matchesSearchQuery &&
			(selectedType === '' ||
				request.group.name
					.toLowerCase()
					.includes(selectedType.toLowerCase())) &&
			(filterData.type === '' ||
				request.type.toLowerCase().includes(filterData.type.toLowerCase())) &&
			(filterData.model === '' ||
				request.name.toLowerCase().includes(filterData.model.toLowerCase())) &&
			(filterData.breaks === '' ||
				request.breaks
					.toLowerCase()
					.includes(filterData.breaks.toLowerCase())) &&
			(filterData.ageGroup === '' ||
				request.ageGroup
					.toLowerCase()
					.includes(filterData.ageGroup.toLowerCase())) &&
			(filterData.gender === '' ||
				request.gender
					.toLowerCase()
					.includes(filterData.gender.toLowerCase())) &&
			(filterData.amortization === '' ||
				request.amortization
					.toLowerCase()
					.includes(filterData.amortization.toLowerCase())) &&
			(filterData.material === '' ||
				request.frame
					.toLowerCase()
					.includes(filterData.material.toLowerCase())) &&
			(filterData.color === '' ||
				request.color.toLowerCase().includes(filterData.color.toLowerCase())) &&
			speed >= speedRange[0] &&
			speed <= speedRange[1] &&
			wheelSize >= wheelSizeRange[0] &&
			wheelSize <= wheelSizeRange[1] &&
			frameSize >= parseFloat(frameSizeRange[0]) &&
			frameSize <= parseFloat(frameSizeRange[1])

		)
	})

	const sortedProducts = [...filteredProducts].sort((a, b) => {
		const priceA = a.priceForSale
		const priceB = b.priceForSale
		if (sortOrder === 'asc') {
			return priceA - priceB
		} else if (sortOrder === 'desc') {
			return priceB - priceA
		}
		return 0
	})

	const paginatedProducts = sortedProducts.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	)

	const totalPages = Math.ceil(sortedProducts.length / itemsPerPage)

	const handlePageChange = pageNumber => {
		setCurrentPage(pageNumber)
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		})
	}

	const renderPaginationButtons = () => {
		const buttons = []
		const totalVisiblePages = 1 // Количество видимых страниц слева и справа от текущей

		if (totalPages <= 5) {
			// Если страниц 5 или меньше, показываем все страницы
			return Array.from({ length: totalPages }, (_, index) => (
				<button
					key={index + 1}
					onClick={() => handlePageChange(index + 1)}
					className={currentPage === index + 1 ? styles.active : ''}
				>
					{index + 1}
				</button>
			))
		} else {
			// Первая страница всегда видна
			buttons.push(
				<button
					key={1}
					onClick={() => handlePageChange(1)}
					className={currentPage === 1 ? styles.active : ''}
				>
					1
				</button>
			)

			// Многоточие после первой страницы, если текущая страница далеко от начала
			if (currentPage > totalVisiblePages + 2) {
				buttons.push(<span key='ellipsis-start'>...</span>)
			}

			// Отображаем страницы вокруг текущей
			const startPage = Math.max(2, currentPage - totalVisiblePages)
			const endPage = Math.min(totalPages - 1, currentPage + totalVisiblePages)

			for (let i = startPage; i <= endPage; i++) {
				buttons.push(
					<button
						key={i}
						onClick={() => handlePageChange(i)}
						className={currentPage === i ? styles.active : ''}
					>
						{i}
					</button>
				)
			}

			// Многоточие перед последней страницей, если текущая страница далеко от конца
			if (currentPage < totalPages - totalVisiblePages - 1) {
				buttons.push(<span key='ellipsis-end'>...</span>)
			}

			// Последняя страница всегда видна
			buttons.push(
				<button
					key={totalPages}
					onClick={() => handlePageChange(totalPages)}
					className={currentPage === totalPages ? styles.active : ''}
				>
					{totalPages}
				</button>
			)

			return buttons
		}
	}

	const handleSortOrderChange = e => {
		setSortOrder(e.target.value)
	}

	const openModal = () => {
		setIsModalOpen(true)
	}

	const closeModal = () => {
		setIsModalOpen(false)
	}

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'instant' })
	}, [])

	return (
		<main>
			<CenterBlock>
				<WidthBlock>
					<p className={styles.catalog_title}>КАТАЛОГ</p>

					<div className={styles.search_container}>
						<input
							type='search'
							placeholder='Поиск...'
							value={searchQuery}
							onChange={handleSearchChange}
							className={styles.search_input}
						/>
					</div>

					<div className={styles.mobile}>
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
					</div>

					<button className={styles.filterButton} onClick={openModal}>
						Фильтр <img src='/images/filter_mobile.png' alt='' />
					</button>
					<Modal
						isOpen={isModalOpen}
						onRequestClose={closeModal}
						contentLabel='Filter Modal'
						className={styles.modal}
						overlayClassName={styles.overlay}
					>
						<p className={styles.filter_title}>ФИЛЬТР</p>
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
							mobileReset={closeModal}
						/>
						<button onClick={closeModal} className={styles.apply_filters}>
							Применить фильтр
						</button>
					</Modal>

					<div className={styles.price}>
						<p>
							{/* Количество товаров: <span>{sortedProducts.length}</span> */}
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
							paginatedProducts.map(product => (
								<ProductCard key={product.id} {...product} />
							))
						) : (
							<p className={styles.no_results}>
								Нет товаров, соответствующих выбранным фильтрам.
							</p>
						)}
					</div>

					<div className={styles.pagination}>{renderPaginationButtons()}</div>
				</WidthBlock>
			</CenterBlock>
		</main>
	)
}

export default CatalogPage
