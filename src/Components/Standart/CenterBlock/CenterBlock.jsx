import styles from './CenterBlock.module.css'

function CenterBlock({ children, ...props }) {
	return (
		<>
			<div
				{...props}
				className={styles.CenterBlock}
				style={{
					width: props.width,
					height: props.height,
					gap: props.gap,
					background: `url(${props.background})`,
					backgroundRepeat: props.backgroundRepeat || 'no-repeat',
					backgroundSize: `${props.backgroundSize}`,
					margin: props.margin,
					padding: props.padding,
				}}
			>
				{children}
			</div>
		</>
	)
}

export default CenterBlock
