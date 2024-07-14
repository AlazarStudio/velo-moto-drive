import styles from './ProductColor.module.css'

function ProductColor({ ...props }) {
	return (
		<div className={styles.color_wrapper}>
			<div
				className={styles.color}
				style={
					props.color === 'черный'
						? { backgroundColor: '#000' }
						: props.color === 'графитовый'
							? { backgroundColor: '#636d82' }
							: { backgroundColor: 'blue' }
				}
			></div>
			<p>{props.color}</p>
		</div>
	)
}

export default ProductColor
