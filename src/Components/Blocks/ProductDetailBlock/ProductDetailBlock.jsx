import styles from './ProductDetailBlock.module.css'

function ProductDetailBlock({...props }) {
	return (
		<div className={styles.product_detail__block___item}>
			<p className={styles.item_name}>
				{props.itemName}
			</p>
			<p className={styles.item_value}>{props.itemValue}</p>
		</div>
	)
}

export default ProductDetailBlock
