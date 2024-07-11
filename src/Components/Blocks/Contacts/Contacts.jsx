import CenterBlock from '../../Standart/CenterBlock/CenterBlock'
import WidthBlock from '../../Standart/WidthBlock/WidthBlock'
import Contact from '../Contact/Contact'
import YandexMap from '../YandexMap/YandexMap'

import styles from './Contacts.module.css'

function Contacts() {
	return (
		<>
			<p className={styles.contacts_title}>КОНТАКТЫ</p>
			<section className={styles.contacts_wrapper}>
				<CenterBlock>
					<WidthBlock
						style={{
							flexDirection: 'row',
							flexWrap: 'wrap',
							gap: '0',
							justifyContent: 'space-between'
						}}
					>
						<Contact
							img={'/images/contacts_phone.png'}
							title={'ТЕЛЕФОН'}
							value={'89383499996'}
						/>
						<Contact
							img={'/images/contacts_location.png'}
							title={'НАШ АДРЕС'}
              value={'г. Черкесск'}
						/>
						<a
							href='https://yandex.ru/maps/-/CDGTM6oY'
							target='_blank'
							className={styles.map_btn}
						>
							Проложить маршрут
						</a>
					</WidthBlock>
				</CenterBlock>
				<YandexMap />
			</section>
		</>
	)
}

export default Contacts
