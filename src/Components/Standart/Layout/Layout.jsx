import { Outlet } from 'react-router-dom'

import Footer from '../../Blocks/Footer/Footer'
import Header from '../../Blocks/Header/Header'

function Layout({ children, ...props }) {
	return (
		<>
			<Header />
			<Outlet />
			<Footer />
		</>
	)
}

export default Layout
