import { Link } from 'react-router-dom'

import Text from '../../Standart/Text/Text'

import classes from './Burger.module.css'

function Burger({ children, ...props }) {
	const textProps = {
		font_size: '16px',
		line_height: '19.5px',
		color: 'white',
		font_weight: '500'
	}
	return (
		<nav className={classes.nav}>
			<ul className={classes.nav_list}>
				<li>
					<Link to='/'>
						<Text {...textProps}>ГЛАВНАЯ</Text>
					</Link>
				</li>
				<li>
					<Link to='/catalog'>
						<Text {...textProps}>КАТАЛОГ</Text>
					</Link>
				</li>
				<li>
					<Link to='/delivery'>
						<Text {...textProps}>ДОСТАВКА</Text>
					</Link>
				</li>
				<li>
					<a href='#about_us'>
						<Text {...textProps}>О НАС</Text>
					</a>
				</li>
				<li>
					<Link to='/'>
						<Text {...textProps}>КОНТАКТЫ</Text>
					</Link>
				</li>
			</ul>
		</nav>
	)
}

export default Burger
