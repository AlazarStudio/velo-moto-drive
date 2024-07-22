import { products } from '../../../data'
import CardDetailInfoBlock from '../CardDetailInfoBlock/CardDetailInfoBlock'

import styles from './ProductTechInfo.module.css'

function ProductTechInfo({ id }) {
	const product = products.find(p => p.linkName === id)
	return (
		<div className={styles.product_info}>
			<CardDetailInfoBlock name='Рама' value={product.frameMaterial} />
			<hr color='#b3b3b3' />
			<CardDetailInfoBlock name='Размер' value={product.size} />
			<hr color='#b3b3b3' />
			<CardDetailInfoBlock name='Вилка' value={product.fork} />
			<hr color='#b3b3b3' />
			<CardDetailInfoBlock name='Манетки' value={product.manettes} />
			<hr color='#b3b3b3' />
			<CardDetailInfoBlock
				name='Передний переключатель'
				value={product.frontDerailleur}
			/>
			<hr color='#b3b3b3' />
			<CardDetailInfoBlock
				name='Задний переключатель'
				value={product.rearDerailleur}
			/>
			<hr color='#b3b3b3' />
			<CardDetailInfoBlock name='Система' value={product.system} />
			<hr color='#b3b3b3' />
			<CardDetailInfoBlock
				name='Кассета, трещотка'
				value={product.cassetteAndRatchet}
			/>
			<hr color='#b3b3b3' />
			<CardDetailInfoBlock name='Скорость' value={product.speed} />
			<hr color='#b3b3b3' />
			<CardDetailInfoBlock name='Каретка' value={product.carriage} />
			<hr color='#b3b3b3' />
			<CardDetailInfoBlock name='Тормоза' value={product.brakes} />
			<hr color='#b3b3b3' />
			<CardDetailInfoBlock name='Втулки' value={product.bushings} />
			<hr color='#b3b3b3' />
			<CardDetailInfoBlock name='Резина' value={product.rubber} />
		</div>
	)
}

export default ProductTechInfo
