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
				src='https://yandex.ru/map-widget/v1/?ll=42.066829%2C44.226989&mode=search&ol=geo&ouri=ymapsbm1%3A%2F%2Fgeo%3Fdata%3DCgg1MzExOTQ1OBJc0KDQvtGB0YHQuNGPLCDQmtCw0YDQsNGH0LDQtdCy0L4t0KfQtdGA0LrQtdGB0YHQutCw0Y8g0KDQtdGB0L_Rg9Cx0LvQuNC60LAsINCn0LXRgNC60LXRgdGB0LoiCg1vMShCFdvpMEI%2C&z=12.53'
				width='100%'
				height='100%'
				allowFullScreen={true}
			></iframe>
		</div>
	)
}

export default YandexMap
