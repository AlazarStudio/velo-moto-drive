import React from 'react'

import MainBanner from '../../Blocks/MainBanner/MainBanner'
import OrgName from '../../Blocks/OrgName/OrgName'
import PopularProducts from '../../Blocks/PopularProducts/PopularProducts'
import Slider from '../../Blocks/Slider/Slider'

import styles from './MainPage.module.css'

function Main() {
	return (
		<main>
			<OrgName />
			<Slider />
			<MainBanner />
			<PopularProducts />
		</main>
	)
}

export default Main
