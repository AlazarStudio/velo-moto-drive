import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'

import CartItem from '../../Blocks/CartItem/CartItem'
import CenterBlock from '../../Standart/CenterBlock/CenterBlock'
import WidthBlock from '../../Standart/WidthBlock/WidthBlock'

import styles from './CartPage.module.css'

Modal.setAppElement('#root')

function CartPage({ children, ...props }) {
	const [cartItems, setCartItems] = useState([])
	const [totalPrice, setTotalPrice] = useState(0)
	const [originalPrice, setOriginalPrice] = useState(0)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
	const [formData, setFormData] = useState({
		fullName: '',
		phone: '',
		email: ''
	})
	const [successMessage, setSuccessMessage] = useState('')

	useEffect(() => {
		const cartData = JSON.parse(localStorage.getItem('cart') || '[]')
		setCartItems(cartData)
		calculateTotals(cartData)
	}, [])

	const calculateTotals = items => {
		const newTotalPrice = items.reduce((total, item) => {
			if (item.isChecked) {
				return total + parseFloat(item.currentPrice.replace(/\s/g, ''))
			}
			return total
		}, 0)

		const newOriginalPrice = items.reduce((total, item) => {
			if (item.isChecked) {
				return total + parseFloat(item.originalPrice.replace(/\s/g, ''))
			}
			return total
		}, 0)

		setTotalPrice(newTotalPrice)
		setOriginalPrice(newOriginalPrice)
	}

	const handleCheckboxChange = (isChecked, itemName) => {
		const updatedCartItems = cartItems.map(item =>
			item.name === itemName ? { ...item, isChecked: isChecked } : item
		)
		setCartItems(updatedCartItems)
		calculateTotals(updatedCartItems)
		localStorage.setItem('cart', JSON.stringify(updatedCartItems))
	}

	const handleDeleteItem = () => {
		const updatedCartItems = JSON.parse(localStorage.getItem('cart') || '[]')
		setCartItems(updatedCartItems)
		calculateTotals(updatedCartItems)
	}

	const formatNumber = num => {
		return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
	}

	const handleOrderClick = () => {
		setIsModalOpen(true)
	}

	const closeModal = () => {
		setIsModalOpen(false)
	}

	const closeSuccessModal = () => {
		setIsSuccessModalOpen(false)
	}

	const handleChange = e => {
		const { name, value } = e.target
		setFormData(prevData => ({
			...prevData,
			[name]: value
		}))
	}

	const handleSubmit = e => {
		e.preventDefault()

		const selectedItems = cartItems
			.filter(item => item.isChecked)
			.map(item => ({
				name: item.name,
				price: item.currentPrice,
				type: item.type,
				category: item.category,
				color: item.color,
				gender: item.gender,
				ageGroup: item.ageGroup,
				frameGrowth: item.frameGrowth,
				speed: item.speed,
				wheelsSize: item.wheelsSize
			}))

		const payload = {
			...formData,
			items: selectedItems
		}

		fetch('/mail/mail.php', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(payload)
		})
			.then(response => response.json())
			.then(data => {
				if (data.success) {
					setSuccessMessage('Сообщение успешно отправлено!')
					setFormData({
						fullName: '',
						phone: '',
						email: ''
					})
					setIsModalOpen(false)
					setIsSuccessModalOpen(true)
					clearSelectedItems()
				} else {
					console.error('Произошла ошибка:', data.message)
				}
			})
			.catch(error => {
				console.error('Произошла ошибка:', error)
			})
	}

	const clearSelectedItems = () => {
		const updatedCartItems = cartItems.filter(item => !item.isChecked)
		setCartItems(updatedCartItems)
		calculateTotals(updatedCartItems)
		localStorage.setItem('cart', JSON.stringify(updatedCartItems))
	}

	return (
		<main>
			<CenterBlock>
				<WidthBlock>
					{cartItems.length === 0 ? (
						<p className={styles.empty_cart}>Корзина пустая</p>
					) : (
						<div className={styles.cart_wrapper}>
							<div className={styles.cart}>
								<div className={styles.cart_title__wrapper}>
									<p className={styles.cart_title}>КОРЗИНА</p>
									<hr color='#b4b4b4' />
								</div>
								{cartItems
									.slice()
									.reverse()
									.map((item, index) => (
										<CartItem
											key={index}
											isChecked={item.isChecked || false}
											onChange={(isChecked, itemName) =>
												handleCheckboxChange(isChecked, itemName)
											}
											onDelete={handleDeleteItem}
											img={item.img[0]}
											name={item.name}
											gender={item.gender}
											currentPrice={item.currentPrice}
											originalPrice={item.originalPrice}
										/>
									))}
							</div>
							<div className={styles.cart_total}>
								<div className={styles.cart_total__item}>
									<p className={styles.cart_total__main}>ИТОГО</p>
									<p className={styles.cart_total__main}>
										{formatNumber(totalPrice)} ₽
									</p>
								</div>
								<div className={styles.cart_total__item}>
									<p>Выбрано товаров</p>
									<p>{cartItems.filter(item => item.isChecked).length}</p>
								</div>
								<div className={styles.cart_total__item}>
									<p>Всего товаров</p>
									<p>{cartItems.length}</p>
								</div>
								<div className={styles.cart_total__item}>
									<p>Скидка</p>
									<p> {formatNumber(-(originalPrice - totalPrice))} ₽</p>
								</div>
								<button
									className={styles.total_btn}
									type='button'
									onClick={handleOrderClick}
								>
									ОФОРМИТЬ ЗАКАЗ
								</button>
							</div>
						</div>
					)}
				</WidthBlock>
			</CenterBlock>
			<Modal
				isOpen={isModalOpen}
				onRequestClose={closeModal}
				className={styles.modal}
				overlayClassName={styles.overlay}
			>
				<p className={styles.modal_title}>
					Оформление заказа{' '}
					<span className={styles.modal_info}>
						После отправления формы, с Вами свяжется наш менеджер для
						дальнейшего уточнения деталей заказа и доставки.
					</span>
				</p>
				<form onSubmit={handleSubmit}>
					<input
						type='text'
						name='fullName'
						placeholder='ФИО*'
						value={formData.fullName}
						onChange={handleChange}
						required
					/>
					<input
						type='tel'
						name='phone'
						placeholder='Телефон*'
						value={formData.phone}
						onChange={handleChange}
						required
					/>
					<input
						type='email'
						name='email'
						placeholder='E-mail*'
						value={formData.email}
						onChange={handleChange}
						required
					/>
					<div className={styles.check_box_form}>
						<div className={styles.check_box__wrapper_form}>
							<input
								className={styles.checkbox_round_form}
								required={true}
								type='checkbox'
								name=''
								id=''
							/>
						</div>
						<p className={styles.check_box__text_form}>
							Отправляя форму, я даю согласие на обработку персональных данных,
							подтверждаю согласие с политикой конфиденциальности
						</p>
					</div>
					<button type='submit' className={styles.submit_form_btn}>
						Отправить
					</button>
					<button
						type='button'
						onClick={closeModal}
						className={styles.close_modal}
					>
						X
					</button>
				</form>
			</Modal>
			<Modal
				isOpen={isSuccessModalOpen}
				onRequestClose={closeSuccessModal}
				className={styles.modal}
				overlayClassName={styles.overlay}
			>
				<p className={styles.success_message}>{successMessage}</p>
				<button
					type='button'
					onClick={closeSuccessModal}
					className={styles.close_modal}
				>
					X
				</button>
			</Modal>
		</main>
	)
}

export default CartPage
