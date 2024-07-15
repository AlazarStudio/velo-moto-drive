import { useState } from 'react'
import { Link } from 'react-router-dom'

import styles from './ProductCard.module.css'

function ProductCard({ onClick, ...props }) {
	const handleAddToCart = e => {
		e.preventDefault()
		e.stopPropagation();
	}

	const handleLinkClick = () => {
		if (onClick) {
			onClick() // Вызываем функцию onClick, переданную из CardDetailPage
		}
	}

	return (
		<Link
			to={`/product/${props.linkName}`}
			className={styles.card}
			onClick={handleLinkClick}
		>
			<div className={styles.card_img__wrapper}>
				<img src={props.img[0]} alt='' />
				<button className={styles.add_to_cart} onClick={handleAddToCart}>
					<img src='/images/add_to_cart.png' alt='' />
					<p>ДОБАВИТЬ В КОРЗИНУ</p>
				</button>
			</div>
			<div className={styles.card_text__wrapper}>
				<div className={styles.card_text__item___mark}>
					<p className={styles.card_text__mark}>{props.category}</p>
					<p className={styles.card_text__discount}>Скидка: {props.discount}</p>
				</div>
				<div className={styles.card_text__item}>
					<p className={styles.card_text__main} style={{ fontWeight: '700' }}>
						{props.name}
					</p>
					<p
						className={styles.card_text__secondary}
						style={{
							fontWeight: '500',
							color: '#b4b4b4',
							textDecoration: 'line-through'
						}}
					>
						{props.originalPrice} ₽
					</p>
				</div>
				<div className={styles.card_text__item}>
					<p className={styles.card_text__secondary}>{props.gender}</p>
					<p className={styles.card_text__main}>{props.currentPrice} ₽</p>
				</div>
			</div>
		</Link>
	)
}

export default ProductCard
