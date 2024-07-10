import React from 'react'

import styles from './SliderInfo.module.css'

function SliderInfo({ info }) {
	return (
		<ul className={styles.slider_info}>
			<li className={styles.slider_info__item}>
				<img src='/images/orange_circle.png' alt='' />
				<div className={styles.slider_info__item___text}>
					<p>{info.title}</p>
					<p style={{ fontWeight: '500' }}>
						{info.subtitle}
					</p>
				</div>
			</li>
			{info.details.map((detail, index) => (
				<li
					key={index}
					className={styles.slider_info__item}
				>
					<img src='/images/orange_circle.png' alt='' />
					<div className={styles.slider_info__item___text}>
						<p>{detail.label}:</p>
						<p style={{ fontWeight: '500' }}>
							{detail.value}
						</p>
					</div>
				</li>
			))}
		</ul>
	)
}

export default SliderInfo
