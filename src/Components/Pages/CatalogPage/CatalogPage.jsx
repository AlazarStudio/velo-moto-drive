import { products } from '../../../data'
import Filter from '../../Blocks/Filter/Filter'
import ProductCard from '../../Blocks/ProductCard/ProductCard'
import CenterBlock from '../../Standart/CenterBlock/CenterBlock'
import WidthBlock from '../../Standart/WidthBlock/WidthBlock'

import styles from './CatalogPage.module.css'

function CatalogPage({ children, ...props }) {
	return (
		<main>
			<CenterBlock>
				<WidthBlock>
					<Filter />
					<div></div>
					<div className={styles.cards_wrapper}>
						{products
							.map((product, index) => <ProductCard key={index} {...product} />)
							.reverse()}
					</div>
				</WidthBlock>
			</CenterBlock>
		</main>
	)
}

export default CatalogPage
