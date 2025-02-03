import axios from 'axios'
import { useEffect, useState } from 'react'

import { products } from '../../../data'
import serverConfig from '../../../serverConfig'
import Button from '../../Standart/Button/Button'
import CenterBlock from '../../Standart/CenterBlock/CenterBlock'
import WidthBlock from '../../Standart/WidthBlock/WidthBlock'
import PopularProductsHeader from '../PopularProductsHeader/PopularProductsHeader'
import ProductCard from '../ProductCard/ProductCard'

import styles from './PopularProducts.module.css'

const fetchProducts = async () => {
	try {
		const response = await axios.get(`${serverConfig}/items`)
		return response.data
	} catch (error) {
		console.error('Error fetching products:', error)
		return []
	}
}

function PopularProducts() {
	const [productsDB, setProducts] = useState([])

	useEffect(() => {
		const getProducts = async () => {
			const productsDB = await fetchProducts()
			// console.log(productsDB)
			setProducts(productsDB)
		}
		getProducts()
	}, [])
	return (
		<section className={styles.popular_products}>
			<CenterBlock>
				<WidthBlock>
					<PopularProductsHeader />
					<div className={styles.cards_wrapper}>
						{productsDB
							// .filter(item => item.group.name.toLowerCase() === 'велосипеды')
							.slice(-9)
							.map((product, index) => <ProductCard key={index} {...product} />)
							.reverse()}
					</div>
					{/* <div className={styles.popular_products__btn}>
						<Button to='/catalog'>СМОТРЕТЬ ВСЕ</Button>
					</div> */}
				</WidthBlock>
			</CenterBlock>
		</section>
	)
}

export default PopularProducts
