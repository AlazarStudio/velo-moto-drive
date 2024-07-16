import { useState } from 'react'
import 'swiper/css'
import { Swiper, SwiperSlide } from 'swiper/react'

import { slides } from '../../../data'
import Button from '../../Standart/Button/Button'
import SliderInfo from '../SliderInfo/SliderInfo'
import SliderLinks from '../SliderLinks/SliderLinks'

import styles from './Slider.module.css'

function Slider() {
	const [swiper, setSwiper] = useState()
	const [activeIndex, setActiveIndex] = useState(0)

	return (
		<section className={styles.slider_wrapper}>
			<SliderLinks />
			<div className={styles.swiper_wrapper}>
				<Swiper
					className={styles.sliderBox}
					slidesPerView={1}
					direction='horizontal'
					loop={true}
					onSwiper={setSwiper}
					onSlideChange={swiper => setActiveIndex(swiper.realIndex)}
				>
					{slides.map((slide, index) => (
						<SwiperSlide key={index} className={styles.swiper_slide}>
							<img src={slide.image} alt={`Slide ${index + 1}`} />
						</SwiperSlide>
					))}
				</Swiper>
				<div className={styles.swiper_buttons}>
					<Button
						className={styles.swiper_button_prev}
						onClick={() => swiper.slidePrev()}
					>
						<img src='/images/prev_slide.png' alt='' />
					</Button>
					<Button
						className={styles.swiper_button_next}
						onClick={() => swiper.slideNext()}
					>
						<img src='/images/next_slide.png' alt='' />
					</Button>
				</div>
			</div>
			<SliderInfo info={slides[activeIndex].info} />
		</section>
	)
}

export default Slider
