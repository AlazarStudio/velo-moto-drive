import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import serverConfig from '../../../serverConfig'

import styles from './SliderLinks.module.css'

function SliderLinks({ children, ...props }) {
	const [groups, setGroups] = useState([])
	useEffect(() => {
		const fetchGroups = async () => {
			try {
				const response = await axios.get(`${serverConfig}/groups`)
				setGroups(response.data)
			} catch (error) {
				console.error('Error fetching groups:', error)
			}
		}
		fetchGroups()
	}, [])

	const transliterate = text => {
		if (!text || typeof text !== 'string') {
			return ''
		}

		const map = {
			А: 'A',
			Б: 'B',
			В: 'V',
			Г: 'G',
			Д: 'D',
			Е: 'E',
			Ё: 'Yo',
			Ж: 'Zh',
			З: 'Z',
			И: 'I',
			Й: 'J',
			К: 'K',
			Л: 'L',
			М: 'M',
			Н: 'N',
			О: 'O',
			П: 'P',
			Р: 'R',
			С: 'S',
			Т: 'T',
			У: 'U',
			Ф: 'F',
			Х: 'Kh',
			Ц: 'Ts',
			Ч: 'Ch',
			Ш: 'Sh',
			Щ: 'Shch',
			Ъ: '',
			Ы: 'Y',
			Ь: '',
			Э: 'E',
			Ю: 'Yu',
			Я: 'Ya',
			а: 'a',
			б: 'b',
			в: 'v',
			г: 'g',
			д: 'd',
			е: 'e',
			ё: 'yo',
			ж: 'zh',
			з: 'z',
			и: 'i',
			й: 'j',
			к: 'k',
			л: 'l',
			м: 'm',
			н: 'n',
			о: 'o',
			п: 'p',
			р: 'r',
			с: 's',
			т: 't',
			у: 'u',
			ф: 'f',
			х: 'kh',
			ц: 'ts',
			ч: 'ch',
			ш: 'sh',
			щ: 'shch',
			ъ: '',
			ы: 'y',
			ь: '',
			э: 'e',
			ю: 'yu',
			я: 'ya'
		}

		return text
			.toLowerCase()
			.split('')
			.map(char => map[char] || char)
			.join('')
			.replace(/ /g, '_')
	}
	return (
		<ul className={styles.slider_links}>
			{groups
				.map(group => (
					<li key={group.id}>
						<Link key={group.id} to={`/catalog/${transliterate(group.name)}`}>
							{group.name}
						</Link>
					</li>
				))
				.reverse()}
			{/* <li>
				<Link to='/catalog/bike'>Велосипеды</Link>
			</li>
			<li>
				<Link to='/catalog/mopeds'>Мопеды</Link>
			</li>
			<li>
				<Link to='/catalog/scooters'>Самокаты</Link>
			</li>
			<li>
				<Link to='/catalog/atvs'>Квадроциклы</Link>
			</li> */}
		</ul>
	)
}

export default SliderLinks
