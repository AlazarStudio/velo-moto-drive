import styles from './OrgName.module.css'

function OrgName() {
	return (
		<section className={styles.banner}>
			<p className={styles.banner_item__1}>
				ВЕЛО & МОТО{' '}
				<span className={styles.banner_item__1___orange}>DRIVE</span>
			</p>
			<p className={styles.banner_item__2}>ОФИЦИАЛЬНЫЙ РЕГИОНАЛЬНЫЙ ДИЛЛЕР</p>
		</section>
	)
}

export default OrgName
