import React, { useState } from 'react'
import 'swiper/css'

import Slider from '../../Blocks/Slider/Slider'

import styles from './MainPage.module.css'

function Main({ children, ...props }) {
	const [swiper, setSwiper] = useState()
	return (
		<main>
			<section className={styles.banner}>
				<p className={styles.banner_item__1}>
					ВЕЛО & МОТО{' '}
					<span className={styles.banner_item__1___orange}>
						DRIVE
					</span>
				</p>
				<p className={styles.banner_item__2}>
					ОФИЦИАЛЬНЫЙ РЕГИОНАЛЬНЫЙ ДИЛЛЕР
				</p>
			</section>

			<Slider />


		</main>
	)
}

export default Main
