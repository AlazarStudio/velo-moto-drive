import WidthBlock from '../../Standart/WidthBlock/WidthBlock'

import styles from './AboutUs.module.css'

function AboutUs({ id }) {
	return (
		<section className={styles.about_us} id={id}>
			<header className={styles.about_us__header}>
				<WidthBlock>
					<div className={styles.about_us__header___img}>
						<img src='/images/about_us_img.png' alt='' />
					</div>

					<p className={styles.about_us__header___title} data-title='О НАС'>
						О НАС
					</p>
				</WidthBlock>
			</header>
			<div className={styles.about_us__wrapper}>
				<WidthBlock style={{ height: '100%', justifyContent: 'end' }}>
					<p className={styles.about_us__text}>
						Мы рады представить вам наш магазин{' '}
						<span style={{ color: '#f77532' }}>Вело & Мото Drive</span>, который
						является официальным региональным дилером качественных товаров для
						активного отдыха и спорта в КЧР. Наша команда профессионалов
						заботится о вашем комфорте и безопасности, предлагая широкий выбор
						продукции от ведущих производителей из Беларуси. <br /> <br />
						Мы гордимся тем, что предлагаем своим клиентам самые выгодные
						условия сотрудничества. Наши опытные консультанты помогут вам
						выбрать подходящий велосипед, самокат или байк, учитывая ваши
						потребности и предпочтения. <br /> <br />
						Наша миссия — сделать активный образ жизни доступным для каждого,
						предоставляя качественные товары и услуги по приемлемым ценам. Мы
						стремимся стать вашим надёжным партнёром в мире спорта и
						развлечений, обеспечивая индивидуальный подход и высокий уровень
						сервиса. <br /> <br />
						Присоединяйтесь к нам и откройте для себя мир скорости, приключений
						и новых впечатлений на велосипеде, самокате или байке!
					</p>
				</WidthBlock>
			</div>
		</section>
	)
}

export default AboutUs
