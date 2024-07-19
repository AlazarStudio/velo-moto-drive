import { Link } from 'react-router-dom'

import Burger from '../Burger/Burger'

import styles from './Header.module.css'

function Header() {
	return (
		<header className={styles.header}>
			<Link to='/' className={styles.logo}>
				<img src='/images/logo.png' alt='ВЕЛО & МОТО DRIVE' />
			</Link>

			<Burger />

			<div className={styles.nav_icons}>
				<Link to='/shopping-cart'>
					<img src='/images/shopping_cart.png' alt='' />
				</Link>
				<Link to='/catalog'>
					<img src='/images/search.png' alt='' />
				</Link>
			</div>
		</header>
	)
}

export default Header
