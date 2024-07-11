import styles from './Footer.module.css'

function Footer() {
	return (
		<footer className={styles.footer}>
			<div className={styles.footer_run__text__wrapper}>
				<p className={styles.run_text}>
					ВЕЛО & МОТО <span style={{ color: '#f77523' }}>DRIVE</span>
				</p>
				<img src='/images/footer_vel.png' alt='' />
			</div>
			<div className={styles.footer_info}>
				<a href='https://alazarstudio.ru/' target='_blank'>
					<img src='/images/alazar_logo.png' alt='' />
				</a>
				<div className={styles.footer_docs}>
					<a href='/' target='_blank'>
						Политика конфиденциальности
					</a>
					<a href='/' target='_blank'>
						Пользовательское соглашение
					</a>
				</div>
			</div>
		</footer>
	)
}

export default Footer
