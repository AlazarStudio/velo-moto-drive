import { useState } from 'react'
import { useParams } from 'react-router-dom'
import 'swiper/css'
import { Swiper, SwiperSlide } from 'swiper/react'

import { products } from '../../../data'
import CardDetailInfoBlock from '../../Blocks/CardDetailInfoBlock/CardDetailInfoBlock'
import ProductDetailBlock from '../../Blocks/ProductDetailBlock/ProductDetailBlock'
import ProductTechInfo from '../../Blocks/ProductTechInfo/ProductTechInfo'
import Button from '../../Standart/Button/Button'
import CenterBlock from '../../Standart/CenterBlock/CenterBlock'
import WidthBlock from '../../Standart/WidthBlock/WidthBlock'
import Non_Found_Page from '../Non_Found_Page'

import styles from './CardDetailPage.module.css'
import ProductColor from '../../Blocks/ProductColor/ProductColor'

function CardDetailPage() {
	const { id } = useParams()

	const product = products.find(p => p.linkName === id)

	if (!product) {
		return <Non_Found_Page />
	} else {
		const [swiper, setSwiper] = useState()
		const [activeIndex, setActiveIndex] = useState(0)
		return (
			<main>
				<CenterBlock>
					<WidthBlock>
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
											КУПИТЬ
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
								<p className={styles.product_description}>
									{product.description}
								</p>
								<ProductColor color={product.color} />
								<ProductTechInfo id={id} />
							</div>
						</div>
					</WidthBlock>
				</CenterBlock>
			</main>
		)
	}
}

export default CardDetailPage
