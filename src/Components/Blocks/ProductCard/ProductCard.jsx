import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import uploadsConfig from '../../../uploadsConfig'

import styles from './ProductCard.module.css'

function ProductCard({ onClick, ...props }) {
	const [isAddedToCart, setIsAddedToCart] = useState(false)
	const navigate = useNavigate()

	useEffect(() => {
		// Проверяем, есть ли текущий товар в корзине при загрузке компонента
		const cart = JSON.parse(localStorage.getItem('cart') || '[]')
		const isAlreadyInCart = cart.some(item => item.id === props.id)
		setIsAddedToCart(isAlreadyInCart)
	}, [props.id])

	const handleAddToCart = e => {
		e.preventDefault()
		e.stopPropagation()

		const cart = JSON.parse(localStorage.getItem('cart') || '[]')

		const isAlreadyInCart = cart.some(item => item.id === props.id)

		if (!isAlreadyInCart) {
			const newCart = [...cart, props]
			localStorage.setItem('cart', JSON.stringify(newCart))
			setIsAddedToCart(true)
		}
	}

	const handleLinkClick = () => {
		if (onClick) {
			onClick() // Вызываем функцию onClick, переданную из CardDetailPage
		}
	}

	const handleCartClick = e => {
		e.preventDefault()
		e.stopPropagation()
		navigate('/shopping-cart')
	}

	return (
		<Link
			to={`/product/${props.id}`}
			className={styles.card}
			onClick={handleLinkClick}
		>
			<div className={styles.card_img__wrapper}>
				<img src={`${uploadsConfig}${props.images[0]}`} alt='' />
			</div>
			<div className={styles.card_text__wrapper}>
				<div className={styles.card_text__item___mark}>
					<p className={styles.card_text__mark}>{props.type}</p>
					<p className={styles.card_text__discount}>Скидка: 18%</p>
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
						{Math.round(
							parseFloat(props.priceForSale.toString().replace(/\s/g, '')) *
								1.18
						)
							.toString()
							.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
						 ₽
					</p>
				</div>
				<div className={styles.card_text__item}>
					<p className={styles.card_text__secondary}>{props.gender}</p>
					<p className={styles.card_text__main}>
						{props.priceForSale
							.toString()
							.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}{' '}
						₽
					</p>
				</div>
			</div>
			{isAddedToCart ? (
				<button className={styles.add_to_cart} onClick={handleCartClick}>
					<p>ДОБАВЛЕНО В КОРЗИНУ &#10148;</p>
				</button>
			) : (
				<button className={styles.add_to_cart} onClick={handleAddToCart}>
					<img src='/images/add_to_cart.png' alt='' />
					<p>ДОБАВИТЬ В КОРЗИНУ</p>
				</button>
			)}
		</Link>
	)
}

export default ProductCard
