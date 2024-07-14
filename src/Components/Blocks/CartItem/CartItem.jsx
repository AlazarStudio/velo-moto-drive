import styles from './CartItem.module.css'

function CartItem({...props }) {
	return (
		<div className={styles.cart_item}>
			<div className={styles.cart_item__img_text}>
				<div className={styles.cart_item__check_box___wrapper}>
					<input type='checkbox' className={styles.cart_item__check_box} />
				</div>
				<div className={styles.cart_item__img}>
					<img src={props.img} alt='' />
				</div>
				<div className={styles.cart_item__info}>
					<div className={styles.cart_item__info___text}>
						<p style={{ fontWeight: '700' }}>{props.name}</p>
						<p className={styles.cart_item__info_secondary}>{props.gender}</p>
					</div>
					<button className={styles.cart_item__btn}>Удалить</button>
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
					{props.originalPrice} ₽
				</p>
			</div>
		</div>
	)
}

export default CartItem
