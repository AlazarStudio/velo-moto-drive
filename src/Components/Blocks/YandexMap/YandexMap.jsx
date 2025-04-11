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
				src='https://yandex.ru/map-widget/v1/?ll=42.034787%2C44.192643&mode=search&ol=geo&ouri=ymapsbm1%3A%2F%2Fgeo%3Fdata%3DCgo2Mjk2MjcxNjM0EoIB0KDQvtGB0YHQuNGPLCDQmtCw0YDQsNGH0LDQtdCy0L4t0KfQtdGA0LrQtdGB0YHQutCw0Y8g0KDQtdGB0L_Rg9Cx0LvQuNC60LAsINCn0LXRgNC60LXRgdGB0LosINC_0YDQvtGB0L_QtdC60YIg0JvQtdC90LjQvdCwLCAzMzTQkyIKDaAjKEIVRcUwQg%2C%2C&z=17.13'
				width='100%'
				height='100%'
				allowFullScreen={true}
			></iframe>
		</div>
	)
}
export default YandexMap
