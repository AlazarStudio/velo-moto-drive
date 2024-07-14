import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import AboutUs from '../../Blocks/AboutUs/AboutUs'
import Contacts from '../../Blocks/Contacts/Contacts'
import MainBanner from '../../Blocks/MainBanner/MainBanner'
import OrgName from '../../Blocks/OrgName/OrgName'
import PopularProducts from '../../Blocks/PopularProducts/PopularProducts'
import Slider from '../../Blocks/Slider/Slider'

function Main() {
	const location = useLocation()

	useEffect(() => {
		const section = new URLSearchParams(location.search).get('section')
		if (section) {
			const element = document.getElementById(section)
			if (element) {
				element.scrollIntoView({ behavior: 'smooth' })
			}
		}
	}, [location])
	return (
		<main>
			<OrgName />
			<Slider />
			<MainBanner />
			<PopularProducts />
			<AboutUs id='about_us' />
			<Contacts id='contacts' />
		</main>
	)
}

export default Main
