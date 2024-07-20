import { products } from '../../../data'
import Button from '../../Standart/Button/Button'
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
					<div className={styles.popular_products__btn}>
						<Button to='/catalog'>СМОТРЕТЬ ВСЕ</Button>
					</div>
				</WidthBlock>
			</CenterBlock>
		</section>
	)
}

export default PopularProducts
