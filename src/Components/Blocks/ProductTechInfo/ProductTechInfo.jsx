import axios from 'axios'
import { useEffect, useState } from 'react'

import { products } from '../../../data'
import serverConfig from '../../../serverConfig'
import CardDetailInfoBlock from '../CardDetailInfoBlock/CardDetailInfoBlock'

import styles from './ProductTechInfo.module.css'

const fetchProducts = async id => {
	try {
		const response = await axios.get(`${serverConfig}/items/${id}`)
		return response.data
	} catch (error) {
		console.error('Error fetching products:', error)
		return []
	}
}

function ProductTechInfo({ id }) {
	// const product = products.find(p => p.linkName === id)
	const [productsDB, setProducts] = useState([])
	useEffect(() => {
		const getProducts = async () => {
			const productsDB = await fetchProducts(id)
			// console.log(productsDB)
			setProducts(productsDB)
		}
		getProducts()
	}, [])

	return (
		<div className={styles.product_info}>
			<CardDetailInfoBlock name='Рама' value={productsDB.frame} />
			<hr color='#b3b3b3' />
			<CardDetailInfoBlock name='Размер' value={productsDB.size} />
			<hr color='#b3b3b3' />
			<CardDetailInfoBlock name='Вилка' value={productsDB.fork} />
			<hr color='#b3b3b3' />
			<CardDetailInfoBlock name='Манетки' value={productsDB.flywheels} />
			<hr color='#b3b3b3' />
			<CardDetailInfoBlock
				name='Передний переключатель'
				value={productsDB.frontDerailleur}
			/>
			<hr color='#b3b3b3' />
			<CardDetailInfoBlock
				name='Задний переключатель'
				value={productsDB.backDerailleur}
			/>
			<hr color='#b3b3b3' />
			<CardDetailInfoBlock name='Система' value={productsDB.system} />
			<hr color='#b3b3b3' />
			<CardDetailInfoBlock
				name='Кассета, трещотка'
				value={productsDB.ratchet}
			/>
			<hr color='#b3b3b3' />
			<CardDetailInfoBlock name='Скорость' value={productsDB.speed} />
			<hr color='#b3b3b3' />
			<CardDetailInfoBlock name='Каретка' value={productsDB.carriage} />
			<hr color='#b3b3b3' />
			<CardDetailInfoBlock name='Тормоза' value={productsDB.breaks} />
			<hr color='#b3b3b3' />
			<CardDetailInfoBlock name='Втулки' value={productsDB.bushings} />
			<hr color='#b3b3b3' />
			<CardDetailInfoBlock name='Резина' value={productsDB.rubber} />
		</div>
	)
}

export default ProductTechInfo
