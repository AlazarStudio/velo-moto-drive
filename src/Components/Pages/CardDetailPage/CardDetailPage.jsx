import axios from 'axios'
import { useEffect, useState } from 'react'
import Loader from 'react-js-loader'
import { Link, useNavigate, useParams } from 'react-router-dom'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { products } from '../../../data'
import serverConfig from '../../../serverConfig'
import uploadsConfig from '../../../uploadsConfig'
import CardDetailInfoBlock from '../../Blocks/CardDetailInfoBlock/CardDetailInfoBlock'
import ProductCard from '../../Blocks/ProductCard/ProductCard'
import ProductColor from '../../Blocks/ProductColor/ProductColor'
import ProductDetailBlock from '../../Blocks/ProductDetailBlock/ProductDetailBlock'
import ProductMotoTechInfo from '../../Blocks/ProductMotoTechInfo/ProductMotoTechInfo'
import ProductTechInfo from '../../Blocks/ProductTechInfo/ProductTechInfo'
import Button from '../../Standart/Button/Button'
import CenterBlock from '../../Standart/CenterBlock/CenterBlock'
import WidthBlock from '../../Standart/WidthBlock/WidthBlock'
import Non_Found_Page from '../Non_Found_Page'

import styles from './CardDetailPage.module.css'

const fetchProducts = async id => {
	try {
		const response = await axios.get(`${serverConfig}/items/${id}`)
		return response.data
	} catch (error) {
		console.error('Error fetching products:', error)
		return []
	}
}

const fetchAllProducts = async () => {
	try {
		const response = await axios.get(`${serverConfig}/items`)
		return response.data
	} catch (error) {
		console.error('Error fetching products:', error)
		return []
	}
}

function CardDetailPage() {
	const { id } = useParams()

	const product = products.find(p => p.linkName === id)
	const [productsDB, setProducts] = useState([])
	const [productsAllDB, setAllProducts] = useState([])

	useEffect(() => {
		const getProducts = async () => {
			const productsDB = await fetchProducts(id)
			// console.log(productsDB)
			setProducts(productsDB)
		}
		getProducts()
	}, [id])

	useEffect(() => {
		const getProducts = async () => {
			const productsAllDB = await fetchAllProducts()
			// console.log(productsDB)
			setAllProducts(productsAllDB)
		}
		getProducts()
	}, [])

	const [loading, setLoading] = useState(false)
	const [isExpanded, setIsExpanded] = useState(false)

	const [isAddedToCart, setIsAddedToCart] = useState(false)

	const navigate = useNavigate()

	useEffect(() => {
		// Проверяем, есть ли текущий товар в корзине при загрузке компонента
		const cart = JSON.parse(localStorage.getItem('cart') || '[]')
		const isAlreadyInCart = cart.some(item => item.name === productsDB.name)
		setIsAddedToCart(isAlreadyInCart)
	}, [productsDB.name])

	const handleAddToCartPage = () => {
		const cart = JSON.parse(localStorage.getItem('cart') || '[]')

		const isAlreadyInCart = cart.some(item => item.name === productsDB.name)

		if (!isAlreadyInCart) {
			const newCart = [...cart, productsDB]
			localStorage.setItem('cart', JSON.stringify(newCart))
			setIsAddedToCart(true)
		}
	}

	if (!productsDB) {
		return <Non_Found_Page />
	} else {
		const [swiper, setSwiper] = useState()
		const [activeIndex, setActiveIndex] = useState(0)

		const [loading, setLoading] = useState(true)
		setTimeout(() => {
			setLoading(false) // Имитация загрузки: устанавливаем состояние загрузки в false через некоторое время
		}, 1000)

		const handleCardClick = () => {
			setLoading(true) // Устанавливаем состояние загрузки в true при клике на карточку товара
			setTimeout(() => {
				setLoading(false)
			}, 1000)
		}
		const handleAddToCart = e => {
			e.preventDefault()
		}

		const toggleExpand = () => {
			setIsExpanded(!isExpanded)
		}

		return (
			<main>
				{loading ? (
					<div className={styles.loader_wrapper}>
						<Loader type='spinner-circle' bgColor={'#f77523'} size={128} />
					</div>
				) : (
					<CenterBlock>
						<WidthBlock>
							<div
								className={styles.back_button}
								// onClick={() => navigate(-1)} // Переход на предыдущую страницу
							>
								<Link to='/'>Главная /</Link>{' '}
								<Link to='/catalog/velosipedy?page=1'>Каталог /</Link>{' '}
								{productsDB.name}
							</div>
							<div className={styles.product_detail_wrapper}>
								<div className={styles.product_detail_swiper}>
									<p className={styles.product_detail_title}>
										{productsDB.name}
									</p>
									<Swiper
										className={styles.sliderBox}
										slidesPerView={1}
										direction='horizontal'
										loop={true}
										onSwiper={setSwiper}
										onSlideChange={swiper => setActiveIndex(swiper.activeIndex)}
									>
										{productsDB.images.map((file, index) => (
											<SwiperSlide key={index} className={styles.swiper_slide}>
												<img src={`${uploadsConfig}${file}`} alt='' />
											</SwiperSlide>
										))}
									</Swiper>
									<div className={styles.swiper_buttons}>
										<Button
											className={styles.swiper_button_prev}
											onClick={() => swiper.slidePrev()}
										>
											<img src='/images/black_prev_slide.png' alt='' />
										</Button>
										<Button
											className={styles.swiper_button_next}
											onClick={() => swiper.slideNext()}
										>
											<img src='/images/black_next_slide.png' alt='' />
										</Button>
									</div>

									<div className={styles.product_buy_banner}>
										<div className={styles.product_buy_item}>
											<p className={styles.discount}>
												СКИДКА: 18%{/*{product.discount}*/}
											</p>
											<p className={styles.original_price}>
												{Math.round(
													parseFloat(
														productsDB.priceForSale
															.toString()
															.replace(/\s/g, '')
													) * 1.18
												)
													.toString()
													.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
												₽
											</p>
											<p className={styles.current_price}>
												{productsDB.priceForSale
													.toString()
													.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}{' '}
												₽
											</p>
										</div>
										<div className={styles.product_buy_item}>
											{isAddedToCart ? (
												<Link to={'/shopping-cart'} className={styles.buy_btn}>
													<p>ДОБАВЛЕНО В КОРЗИНУ &#10148;</p>
												</Link>
											) : (
												<button
													className={styles.buy_btn}
													style={{ backgroundColor: '#f77523', color: '#fff' }}
													onClick={handleAddToCartPage}
												>
													ДОБАВИТЬ В КОРЗИНУ
												</button>
											)}
										</div>
									</div>
								</div>
								<div className={styles.product_detail_info}>
									{productsDB?.group?.name === 'Велосипеды' ? (
										<div className={styles.product_detail__blocks}>
											<ProductDetailBlock
												itemName={
													productsDB.frame === 'Алюминий' ? 'ALU' : 'ST'
												}
												itemValue={'рама'}
											/>
											<ProductDetailBlock
												itemName={productsDB.speed}
												itemValue={'скоростей'}
											/>
											<ProductDetailBlock
												itemName={productsDB.wheelSize}
												itemValue={'колеса'}
											/>
											<ProductDetailBlock
												itemName={productsDB.weight}
												itemValue={'вес, кг'}
											/>
										</div>
									) : null}

									<p style={{ fontWeight: '700' }}>
										Количество:{' '}
										{productsDB.Warehouse.count + productsDB.Store.count} шт
									</p>
									<div
										className={isExpanded ? styles.expanded : styles.collapsed}
									>
										<p className={styles.product_description}>
											{productsDB.description}
										</p>
										<button
											className={styles.toggleButton}
											onClick={toggleExpand}
										>
											{isExpanded ? 'Свернуть' : 'Читать дальше'}
										</button>
									</div>

									<ProductColor color={productsDB.color.toLowerCase()} />
									{productsDB?.group?.name === 'Велосипеды' ? (
										<ProductTechInfo id={id} />
									) : (
										<ProductMotoTechInfo id={id} />
									)}
								</div>
							</div>
							<p className={styles.similar_products_title}>ПОХОЖИЕ ТОВАРЫ</p>
							<div className={styles.similar_products_wrapper}>
								<Swiper
									className={styles.similar_products_swiper}
									slidesPerView={3}
									spaceBetween={20}
									pagination={{ clickable: true }}
									breakpoints={{
										0: {
											slidesPerView: 1
										},

										1299: {
											slidesPerView: 3
										}
									}}
									modules={[Pagination]}
								>
									{productsAllDB
										.filter(
											productFromDb =>
												// (productFromDb.name !== productsDB.name) &
												productFromDb.group.name.toLowerCase() === productsDB?.group?.name.toLowerCase()
										)
										.slice(-3)
										.map(productFromDb => (
											<SwiperSlide
												key={productFromDb.id}
												className={styles.swiper_slide_sm}
											>
												<ProductCard
													{...productFromDb}
													onClick={handleCardClick}
												/>
											</SwiperSlide>
										))}
								</Swiper>
							</div>
						</WidthBlock>
					</CenterBlock>
				)}
			</main>
		)
	}
}

export default CardDetailPage
