import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import styles from './Burger.module.css'

function Burger() {
	const [isOpen, setIsOpen] = useState(false)
	const menuRef = useRef(null)

	const toggleMenu = () => {
		setIsOpen(prevIsOpen => {
			// console.log('Current state:', prevIsOpen)
			return !prevIsOpen
		})
	}

	const handleClickOutside = event => {
		if (
			menuRef.current &&
			!menuRef.current.contains(event.target) &&
			event.target !== document.querySelector(`.${styles.burger_icon}`)
		) {
			setIsOpen(false)
		}
	}

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [])

	return (
		<>
			<div className={styles.burger_icon} onClick={toggleMenu}>
				&#9776;
			</div>
			<nav
				ref={menuRef}
				className={`${styles.nav} ${isOpen ? styles.open : styles.closed}`}
			>
				<ul className={styles.nav_list}>
					<li>
						<Link
							to='/'
							onClick={() => {
								setIsOpen(false),
									window.scrollTo({ top: 0, behavior: 'smooth' })
							}}
						>
							<p className={styles.burger_item}>ГЛАВНАЯ</p>
						</Link>
					</li>
					<li>
						<Link to='/catalog/velosipedy?page=1' onClick={() => setIsOpen(false)}>
							<p className={styles.burger_item}>КАТАЛОГ</p>
						</Link>
					</li>
					<li>
						<Link to='/delivery' onClick={() => setIsOpen(false)}>
							<p className={styles.burger_item}>ДОСТАВКА</p>
						</Link>
					</li>
					<li>
						<Link to='/aboutOrganization' onClick={() => setIsOpen(false)}>
							<p className={styles.burger_item}>ОБ ОРГАНИЗАЦИИ</p>
						</Link>
					</li>
					<li>
						<Link to='/?section=about_us' onClick={() => setIsOpen(false)}>
							<p className={styles.burger_item}>О НАС</p>
						</Link>
					</li>
					<li>
						<Link to='/?section=contacts' onClick={() => setIsOpen(false)}>
							<p className={styles.burger_item}>КОНТАКТЫ</p>
						</Link>
					</li>
				</ul>
			</nav>
		</>
	)
}

export default Burger
