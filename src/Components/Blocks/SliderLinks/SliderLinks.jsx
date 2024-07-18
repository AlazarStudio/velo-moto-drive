import { Link } from 'react-router-dom'

import styles from './SliderLinks.module.css'

function SliderLinks({ children, ...props }) {
	return (
		<ul className={styles.slider_links}>
			<li>
				<Link to='/catalog/bike'>Велосипеды</Link>
			</li>
			<li>
				<Link to='/catalog/mopeds'>Мопеды</Link>
			</li>
			<li>
				<Link to='/catalog/scooters'>Самокаты</Link>
			</li>
			<li>
				<Link to='/catalog/atvs'>Квадроциклы</Link>
			</li>
		</ul>
	)
}

export default SliderLinks
