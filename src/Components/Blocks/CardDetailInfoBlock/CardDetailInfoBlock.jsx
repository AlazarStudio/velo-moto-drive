import styles from './CardDetailInfoBlock.module.css'

function CardDetailInfoBlock({ ...props }) {
	return (
		<div className={styles.detail_block}>
			<p className={styles.detail_name} style={{fontWeight:'700'}}>{props.name}</p>
			<p className={styles.detail_value}>{props.value}</p>
		</div>
	)
}

export default CardDetailInfoBlock
