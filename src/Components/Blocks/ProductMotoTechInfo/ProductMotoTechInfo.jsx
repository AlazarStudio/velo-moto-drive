import axios from 'axios'
import { useEffect, useState } from 'react'

import { products } from '../../../data'
import serverConfig from '../../../serverConfig'
import CardDetailInfoBlock from '../CardDetailInfoBlock/CardDetailInfoBlock'

import styles from './ProductMotoTechInfo.module.css'

const fetchProducts = async id => {
	try {
		const response = await axios.get(`${serverConfig}/items/${id}`)
		return response.data
	} catch (error) {
		console.error('Error fetching products:', error)
		return []
	}
}

function ProductMotoTechInfo({ id }) {
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
			<CardDetailInfoBlock name='Размер' value={productsDB.size} />
			<hr color='#b3b3b3' />
			<CardDetailInfoBlock name='Высота по седлу' value={productsDB.saddleHeight} />
			<hr color='#b3b3b3' />
			<CardDetailInfoBlock name='Двигатель' value={productsDB.motor} />
			<hr color='#b3b3b3' />
			<CardDetailInfoBlock name='Тип охлаждения' value={productsDB.cooling} />
			<hr color='#b3b3b3' />
			<CardDetailInfoBlock name='Масса' value={productsDB.weight} />
			<hr color='#b3b3b3' />
			<CardDetailInfoBlock name='Максимальная нагрузка' value={productsDB.maximumLoad} />
			<hr color='#b3b3b3' />
			<CardDetailInfoBlock
				name='Объём топливного бака'
				value={productsDB.fuelTankCapacity}
			/>
			<hr color='#b3b3b3' />
			<CardDetailInfoBlock
				name='Передний / задний тормоз'
				value={productsDB.frontDerailleur}
			/>
			<hr color='#b3b3b3' />
			<CardDetailInfoBlock
				name='Переднее / заднее колесо'
				value={productsDB.backDerailleur}
			/>
			<hr color='#b3b3b3' />
			<CardDetailInfoBlock name='Система питания' value={productsDB.system} />
			<hr color='#b3b3b3' />
			<CardDetailInfoBlock
				name='Передняя подвеска'
				value={productsDB.frontSuspension}
			/>
			<hr color='#b3b3b3' />
			<CardDetailInfoBlock
				name='Задняя подвеска'
				value={productsDB.rearSuspension}
			/>
			<hr color='#b3b3b3' />
			<CardDetailInfoBlock name='Запуск' value={productsDB.starting} />
			<hr color='#b3b3b3' />
			<CardDetailInfoBlock name='Мощность' value={productsDB.power} />
			<hr color='#b3b3b3' />
			<CardDetailInfoBlock name='Максимальная скорость' value={productsDB.maxSpeed} />
		</div>
	)
}

export default ProductMotoTechInfo
