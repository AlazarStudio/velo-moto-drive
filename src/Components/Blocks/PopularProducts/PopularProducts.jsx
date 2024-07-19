import { products } from '../../../data'
import CenterBlock from '../../Standart/CenterBlock/CenterBlock'
import WidthBlock from '../../Standart/WidthBlock/WidthBlock'
import PopularProductsHeader from '../PopularProductsHeader/PopularProductsHeader'
import ProductCard from '../ProductCard/ProductCard'

import styles from './PopularProducts.module.css'

function PopularProducts() {
	return (
		<section className={styles.popular_products}>
			<CenterBlock>
				<WidthBlock>
					<PopularProductsHeader />
					<div className={styles.cards_wrapper}>
						{products
							.slice(-9)
							.map((product, index) => <ProductCard key={index} {...product} />)
							.reverse()}
					</div>
				</WidthBlock>
			</CenterBlock>
		</section>
	)
}

export default PopularProducts
