import React, { useState } from 'react'
import 'swiper/css'
import { Swiper, SwiperSlide } from 'swiper/react'

import Button from '../../Standart/Button/Button'

import styles from './Slider.module.css'
import SliderLinks from '../SliderLinks/SliderLinks'

function Slider() {
	const [swiper, setSwiper] = useState()

	return (
		<>
		<SliderLinks />
			<div className={styles.swiper_wrapper}>
				<Swiper
					className={styles.sliderBox}
					slidesPerView={1}
					onSwiper={setSwiper}
				>
					<SwiperSlide className={styles.swiper_slide}>
						<img src='/images/vel_1.png' alt='' />
					</SwiperSlide>
					<SwiperSlide className={styles.swiper_slide}>
						<img src='/images/vel_2.png' alt='' />
					</SwiperSlide>
					<SwiperSlide className={styles.swiper_slide}>
						<img src='/images/vel_3.png' alt='' />
					</SwiperSlide>
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
		</>
	)
}

export default Slider

{
	/* <CenterBlock>
						<div className={styles.shadow_vel3}>
							<div style={{ marginLeft:'30px', width: '40%' }}>
								<img
									style={{ width: '40%' }}
									src='/images/shadow1_vel1.png'
									alt=''
								/>
							</div>
							<div style={{ width: '40%' }}>
								<img
									style={{ width: '40%' }}
									src='/images/shadow2_vel1.png'
									alt=''
								/>
							</div>
						</div>
					</CenterBlock> */
}
