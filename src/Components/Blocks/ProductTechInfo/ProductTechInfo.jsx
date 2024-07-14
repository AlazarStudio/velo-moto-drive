import { products } from '../../../data'
import CardDetailInfoBlock from '../CardDetailInfoBlock/CardDetailInfoBlock'

import styles from './ProductTechInfo.module.css'

function ProductTechInfo({ id }) {
	const product = products.find(p => p.linkName === id)
	return (
		<div className={styles.product_info}>
			<CardDetailInfoBlock name='Рама' value={product.frameMaterial} />
			<hr color='#2a2b29' />
			<CardDetailInfoBlock name='Размер' value={product.size} />
			<hr color='#2a2b29' />
			<CardDetailInfoBlock name='Вилка' value={product.fork} />
			<hr color='#2a2b29' />
			<CardDetailInfoBlock name='Манетки' value={product.manettes} />
			<hr color='#2a2b29' />
			<CardDetailInfoBlock
				name='Передний переключатель'
				value={product.frontDerailleur}
			/>
			<hr color='#2a2b29' />
			<CardDetailInfoBlock
				name='Задний переключатель'
				value={product.rearDerailleur}
			/>
			<hr color='#2a2b29' />
			<CardDetailInfoBlock name='Система' value={product.system} />
			<hr color='#2a2b29' />
			<CardDetailInfoBlock
				name='Кассета, трещотка'
				value={product.cassetteAndRatchet}
			/>
			<hr color='#2a2b29' />
			<CardDetailInfoBlock name='Скорость' value={product.speed} />
			<hr color='#2a2b29' />
			<CardDetailInfoBlock name='Каретка' value={product.carriage} />
			<hr color='#2a2b29' />
			<CardDetailInfoBlock name='Тормоза' value={product.brakes} />
			<hr color='#2a2b29' />
			<CardDetailInfoBlock name='Втулки' value={product.bushings} />
			<hr color='#2a2b29' />
			<CardDetailInfoBlock name='Резина' value={product.rubber} />
		</div>
	)
}

export default ProductTechInfo
