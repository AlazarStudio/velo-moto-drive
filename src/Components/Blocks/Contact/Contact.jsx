import styles from './Contact.module.css'

function Contact({img, title, value}) {
	return (
		<div className={styles.contacts_item}>
			<img src={img} alt='' />
			<div className={styles.contacts_item__text}>
				<p style={{ fontWeight: '700' }}>{title}</p>
				<p>{value}</p>
			</div>
		</div>
	)
}

export default Contact
