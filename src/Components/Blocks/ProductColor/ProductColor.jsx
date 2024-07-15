import styles from './ProductColor.module.css'

function ProductColor({ ...props }) {
	const Colors = {
		черный: '#000',
		графитовый: '#636d82',
		синий: '#0000FF',
		белый: '#fff',
		желтый: '#eded49',
		оранжевый: '#f2ac21',
		красный: '#dd3333',
		зеленый: '#81d742',
		голубой: '#25dced',
		серый: '#bcbcbc',
		фиолетовый: '#8224e3',
		розовый: '#fca4d7'
	}
	const colorHex = Colors[props.color]
	return (
		<div className={styles.color_wrapper}>
			{colorHex && (
				<div
					className={styles.color}
					style={{ backgroundColor: colorHex }}
				></div>
			)}

			<p>{props.color}</p>
		</div>
	)
}

export default ProductColor
