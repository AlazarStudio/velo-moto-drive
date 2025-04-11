import CenterBlock from '../../Standart/CenterBlock/CenterBlock'
import WidthBlock from '../../Standart/WidthBlock/WidthBlock'
import Contact from '../Contact/Contact'
import YandexMap from '../YandexMap/YandexMap'

import styles from './Contacts.module.css'

function Contacts({ id }) {
	return (
		<>
			<p className={styles.contacts_title} id={id}>
				КОНТАКТЫ
			</p>
			<CenterBlock>
				<WidthBlock>
					<section className={styles.contacts_wrapper}>
						<Contact
							img={'/images/contacts_phone.png'}
							title={'ТЕЛЕФОН'}
							value={'+7-929-241-98-88'}
						/>
						<Contact
							img={'/images/contacts_location.png'}
							title={'НАШ АДРЕС'}
							value={'г. Черкесск, проспект Ленина, 334Г'}
						/>
						<a
							href='https://yandex.ru/maps/-/CHVhjMMw'
							target='_blank'
							className={styles.map_btn}
						>
							Проложить маршрут
						</a>
					</section>
				</WidthBlock>
			</CenterBlock>
			<YandexMap />
		</>
	)
}

export default Contacts
