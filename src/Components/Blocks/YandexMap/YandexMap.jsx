import styles from './YandexMap.module.css'

function YandexMap({ children, ...props }) {
	return (
		<div
			className={styles.map_wrapper}
			style={{
				position: 'relative',
				overflow: 'hidden',
				marginTop: '50px',
				border: 'none',
				outline: 'none'
			}}
		>
			<iframe
				src='https://yandex.ru/map-widget/v1/?from=mapframe&ll=42.035415%2C44.192941&mode=whatshere&whatshere%5Bpoint%5D=42.035415%2C44.192941&whatshere%5Bzoom%5D=17&z=17'
				width='100%'
				height='100%'
				allowFullScreen={true}
			></iframe>
		</div>
	)
}
export default YandexMap
