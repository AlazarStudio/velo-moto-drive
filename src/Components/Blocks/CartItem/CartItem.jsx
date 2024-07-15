import React, { useState } from 'react'

import styles from './CartItem.module.css'

function CartItem({ onChange, onDelete, ...props }) {
	const [isChecked, setIsChecked] = useState(false)

	const handleCheckboxChange = () => {
		const newChecked = !isChecked
		setIsChecked(newChecked)
		if (onChange) {
			onChange(newChecked, props.name, props.currentPrice) // Передаем новое состояние, имя и цену
		}
	}

	const handleDelete = () => {
		const cartItems = JSON.parse(localStorage.getItem('cart')) || []
		const updatedCart = cartItems.filter(
			item =>
				item.name !== props.name || item.currentPrice !== props.currentPrice
		)
		localStorage.setItem('cart', JSON.stringify(updatedCart))
		onDelete()
	}

	return (
		<div className={styles.cart_item}>
			<div className={styles.cart_item__img_text}>
				<div className={styles.cart_item__check_box___wrapper}>
					<input
						type='checkbox'
						className={styles.cart_item__check_box}
						checked={isChecked}
						onChange={handleCheckboxChange}
					/>
				</div>
				<div className={styles.cart_item__img}>
					<img src={props.img} alt='' />
				</div>
				<div className={styles.cart_item__info}>
					<div className={styles.cart_item__info___text}>
						<p style={{ fontWeight: '700' }}>{props.name}</p>
						<p className={styles.cart_item__info_secondary}>{props.gender}</p>
					</div>
					<button className={styles.cart_item__btn} onClick={handleDelete}>Удалить</button>
				</div>
			</div>
			<div className={styles.cart_item__price}>
				<p className={styles.cart_item__info_primary}>{props.currentPrice} ₽</p>
				<p
					className={styles.cart_item__info_secondary}
					style={{
						textAlign: 'right',
						textDecoration: 'line-through'
					}}
				>
					{props.originalPrice} ₽
				</p>
			</div>
		</div>
	)
}

export default CartItem
