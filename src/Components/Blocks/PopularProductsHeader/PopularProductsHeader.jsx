import React from 'react'

import Button from '../../Standart/Button/Button'

import styles from './PopularProductsHeader.module.css'

function PopularProductsHeader() {
	return (
		<header className={styles.popular_products__header}>
			<div className={styles.popular_products__header__item}>
				<p className={styles.popular_products__title}>
					ПОПУЛЯРНЫЕ
				</p>
				<div className={styles.popular_products__btn}>
					<p className={styles.popular_products__title}>ТОВАРЫ</p>
					<Button to='/catalog/velosipedy?page=1'>СМОТРЕТЬ ВСЕ</Button>
				</div>
			</div>
			<div className={styles.run_img}>
				<img src='/images/popular_prod_img.png' alt='' />
			</div>
		</header>
	)
}

export default PopularProductsHeader
