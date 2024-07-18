import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { products } from '../../../data'
import Filter from '../../Blocks/Filter/Filter'
import ProductCard from '../../Blocks/ProductCard/ProductCard'
import CenterBlock from '../../Standart/CenterBlock/CenterBlock'
import WidthBlock from '../../Standart/WidthBlock/WidthBlock'

import styles from './CatalogPage.module.css'

function CatalogPage() {
	let { id } = useParams()

	let typeData = id ? id : ''

	typeData == 'bike' ? (typeData = 'Велосипеды') : ''
	typeData == 'mopeds' ? (typeData = 'Мопеды') : ''
	typeData == 'scooters' ? (typeData = 'Самокаты') : ''
	typeData == 'atvs' ? (typeData = 'Квадроциклы') : ''

	console.log(typeData)

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

	const filteredProducts = products.filter(request => {
		return (
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
				request.color.toLowerCase().includes(filterData.color.toLowerCase()))
		)
	})
	// Сортировка продуктов по цене
	filteredProducts.sort((a, b) => {
		const priceA = a.currentPrice
		const priceB = b.currentPrice
		if (sortOrder === 'asc') {
			return priceA - priceB
		} else if (sortOrder === 'desc'){
			return priceB - priceA
		}
	})

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'instant' })
	}, [])

	return (
		<main>
			<CenterBlock>
				<WidthBlock>
					<Filter
						handleChange={handleChange}
						filterData={filterData}
						selectedType={selectedType}
						selectedColor={selectedColor}
						handleVeloTypeClick={handleVeloTypeClick}
						resetForm={resetForm}
						handleColorChange={handleColorChange}
						sortOrder={sortOrder}
            setSortOrder={setSortOrder}
					/>

					<div className={styles.cards_wrapper}>
						{filteredProducts.length > 0 ? (
							filteredProducts
								.map((product, index) => (
									<ProductCard key={index} {...product} />
								))
								.reverse()
						) : (
							<p className={styles.no_results}>
								Нет товаров, соответствующих выбранным фильтрам.
							</p>
						)}
					</div>
				</WidthBlock>
			</CenterBlock>
		</main>
	)
}

export default CatalogPage
