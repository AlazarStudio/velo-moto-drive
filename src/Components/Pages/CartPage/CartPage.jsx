import CartItem from '../../Blocks/CartItem/CartItem'
import CenterBlock from '../../Standart/CenterBlock/CenterBlock'
import WidthBlock from '../../Standart/WidthBlock/WidthBlock'

import styles from './CartPage.module.css'

function CartPage({ children, ...props }) {
	return (
		<main>
			<CenterBlock>
				<WidthBlock>
					<div className={styles.cart_wrapper}>
						<div className={styles.cart}>
							<div className={styles.cart_title__wrapper}>
								<p className={styles.cart_title}>КОРЗИНА</p>
								<hr color='#b4b4b4' />
							</div>
							<CartItem
								img='/images/card3.png'
								name='ROCKY 2.0 DISC 29'
								gender='Мужской'
								currentPrice='33 026'
								originalPrice='40 440'
							/>
							<CartItem
								img='/images/card3.png'
								name='ROCKY 2.0 DISC 29'
								gender='Мужской'
								currentPrice='33 026'
								originalPrice='40 440'
							/>
							<CartItem
								img='/images/card3.png'
								name='ROCKY 2.0 DISC 29'
								gender='Мужской'
								currentPrice='33 026'
								originalPrice='40 440'
							/>
						</div>
						<div className={styles.cart_total}>
							<div className={styles.cart_total__item}>
								<p
									style={{
										fontSize: '20px',
										lineHeight: '24px',
										color: '#000',
										fontWeight: '600'
									}}
								>
									ИТОГО
								</p>
								<p
									style={{
										fontSize: '20px',
										lineHeight: '24px',
										color: '#000',
										fontWeight: '600'
									}}
								>
									99 078 ₽
								</p>
							</div>
							<div className={styles.cart_total__item}>
								<p>Всего товаров</p>
								<p>3</p>
							</div>
							<div className={styles.cart_total__item}>
								<p>Скидка</p>
								<p>-220 000 ₽</p>
							</div>
							<button className={styles.total_btn} type='submit'>ОФОРМИТЬ ЗАКАЗ</button>
							<div className={styles.check_box}>
								<div className={styles.check_box__wrapper}>
									<input
										className={styles.checkbox_round}
										required='true'
										type='checkbox'
										name=''
										id=''
									/>
								</div>
								<p className={styles.check_box__text}>
									Согласен с условиями{' '}
									<a href='/' target='_blank' style={{ color: '#f77523' }}>
										Правил пользования торговой площадкой и правилами возврата
									</a>
								</p>
							</div>
						</div>
					</div>
				</WidthBlock>
			</CenterBlock>
		</main>
	)
}

export default CartPage
