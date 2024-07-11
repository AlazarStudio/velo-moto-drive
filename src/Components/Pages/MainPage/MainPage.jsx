import AboutUs from '../../Blocks/AboutUs/AboutUs'
import Contacts from '../../Blocks/Contacts/Contacts'
import MainBanner from '../../Blocks/MainBanner/MainBanner'
import OrgName from '../../Blocks/OrgName/OrgName'
import PopularProducts from '../../Blocks/PopularProducts/PopularProducts'
import Slider from '../../Blocks/Slider/Slider'
import CenterBlock from '../../Standart/CenterBlock/CenterBlock'
import WidthBlock from '../../Standart/WidthBlock/WidthBlock'

import styles from './MainPage.module.css'

function Main() {
	return (
		<main>
			<OrgName />
			<Slider />
			<MainBanner />
			<PopularProducts />
			<AboutUs />
			<Contacts />
		</main>
	)
}

export default Main
