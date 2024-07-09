import React from 'react'
import { Link } from 'react-router-dom'

import styles from './SliderLinks.module.css'

function SliderLinks({ children, ...props }) {
	return (
		<ul className={styles.slider_links}>
			<li><Link to='/catalog'>Велосипеды</Link></li>
			<li><Link to='/catalog'>Мопеды</Link></li>
			<li><Link to='/catalog'>Самокаты</Link></li>
			<li><Link to='/catalog'>Квадроциклы</Link></li>
		</ul>
	)
}

export default SliderLinks
