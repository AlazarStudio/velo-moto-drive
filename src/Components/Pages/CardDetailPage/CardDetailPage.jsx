import { useEffect, useState } from 'react'
import Loader from 'react-js-loader'
import { useParams } from 'react-router-dom'
import 'swiper/css'
import { Swiper, SwiperSlide } from 'swiper/react'

import { products } from '../../../data'
import CardDetailInfoBlock from '../../Blocks/CardDetailInfoBlock/CardDetailInfoBlock'
import ProductCard from '../../Blocks/ProductCard/ProductCard'
import ProductColor from '../../Blocks/ProductColor/ProductColor'
import ProductDetailBlock from '../../Blocks/ProductDetailBlock/ProductDetailBlock'
import ProductTechInfo from '../../Blocks/ProductTechInfo/ProductTechInfo'
import Button from '../../Standart/Button/Button'
import CenterBlock from '../../Standart/CenterBlock/CenterBlock'
import WidthBlock from '../../Standart/WidthBlock/WidthBlock'
import Non_Found_Page from '../Non_Found_Page'

import styles from './CardDetailPage.module.css'

function CardDetailPage() {
	const { id } = useParams()

	const product = products.find(p => p.linkName === id)
	const [loading, setLoading] = useState(false)
	const [isExpanded, setIsExpanded] = useState(false)

	if (!product) {
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
						<WidthBlock style={{ gap: '50px' }}>
							<div className={styles.product_detail_wrapper}>
								<div className={styles.product_detail_swiper}>
									<p className={styles.product_detail_title}>{product.name}</p>
									<Swiper
										className={styles.sliderBox}
										slidesPerView={1}
										direction='horizontal'
										loop={true}
										onSwiper={setSwiper}
										onSlideChange={swiper => setActiveIndex(swiper.activeIndex)}
									>
										{product.img.map((img, index) => (
											<SwiperSlide key={index} className={styles.swiper_slide}>
												<img src={img} alt='' />
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
												СКИДКА: {product.discount}
											</p>
											<p className={styles.original_price}>
												{product.originalPrice} ₽
											</p>
											<p className={styles.current_price}>
												{product.currentPrice} ₽
											</p>
										</div>
										<div className={styles.product_buy_item}>
											<button
												className={styles.buy_btn}
												style={{ backgroundColor: '#f77523', color: '#fff' }}
											>
												ДОБАВИТЬ В КОРЗИНУ
											</button>
										</div>
									</div>
								</div>
								<div className={styles.product_detail_info}>
									<div className={styles.product_detail__blocks}>
										<ProductDetailBlock
											itemName={
												product.frameMaterial === 'Алюминий' ? 'ALU' : 'ST'
											}
											itemValue={'рама'}
										/>
										<ProductDetailBlock
											itemName={product.speed}
											itemValue={'скоростей'}
										/>
										<ProductDetailBlock
											itemName={product.wheelsSize}
											itemValue={'колеса'}
										/>
										<ProductDetailBlock
											itemName={product.weight}
											itemValue={'вес, кг'}
										/>
									</div>
									<div
										className={isExpanded ? styles.expanded : styles.collapsed}
									>
										<p className={styles.product_description}>
											{product.description}
										</p>
										<button
											className={styles.toggleButton}
											onClick={toggleExpand}
										>
											{isExpanded ? 'Свернуть' : 'Читать дальше'}
										</button>
									</div>

									<ProductColor color={product.color.toLowerCase()} />
									<ProductTechInfo id={id} />
								</div>
							</div>
							<p className={styles.similar_products_title}>ПОХОЖИЕ ТОВАРЫ</p>
							<div className={styles.similar_products_wrapper}>
								{products
									.filter(
										productFromDb =>
											productFromDb.currentPrice !== product.currentPrice
									)
									.slice(-3)
									.map((productFromDb, index) => (
										<ProductCard
											key={index}
											{...productFromDb}
											onClick={handleCardClick}
										/>
									))}
							</div>
						</WidthBlock>
					</CenterBlock>
				)}
			</main>
		)
	}
}

export default CardDetailPage
