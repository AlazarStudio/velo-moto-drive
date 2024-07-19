import gsap from 'gsap'
import { useLayoutEffect, useRef, useState, useEffect } from 'react'
import styles from './Footer.module.css'

function Footer() {
  const [isMobile, setIsMobile] = useState(false)
  const textRef = useRef(null)
  const spanRef = useRef(null)

  // Обработчик изменения размера экрана
  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 1299px)')
    const handleChange = () => setIsMobile(mediaQuery.matches)

    handleChange() // Установить начальное значение
    mediaQuery.addEventListener('change', handleChange)

    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // Анимация GSAP для мобильных устройств
  useLayoutEffect(() => {
    if (isMobile && textRef.current && spanRef.current) {
      const textWidth = textRef.current.scrollWidth
      const containerWidth = spanRef.current.clientWidth

      gsap.fromTo(
        textRef.current,
        { x: containerWidth + 'px' },
        { x: -textWidth + 'px', duration: 40, repeat: -1, ease: 'linear' }
      )
    }
  }, [isMobile])

  return (
    <footer className={styles.footer}>
      <div className={styles.footer_run__text__wrapper}>
        {isMobile ? (
          <p className={styles.run_text} ref={textRef}>
            <span ref={spanRef}>
              ВЕЛО & МОТО <span style={{ color: '#f77523' }}>DRIVE</span>{' '}
            </span>
            <span>
              ВЕЛО & МОТО <span style={{ color: '#f77523' }}>DRIVE</span>{' '}
            </span>
            <span>
              ВЕЛО & МОТО <span style={{ color: '#f77523' }}>DRIVE</span>{' '}
            </span>
						<span>
              ВЕЛО & МОТО <span style={{ color: '#f77523' }}>DRIVE</span>{' '}
            </span>
            <span>
              ВЕЛО & МОТО <span style={{ color: '#f77523' }}>DRIVE</span>{' '}
            </span>
						<span>
              ВЕЛО & МОТО <span style={{ color: '#f77523' }}>DRIVE</span>{' '}
            </span>
            <span>
              ВЕЛО & МОТО <span style={{ color: '#f77523' }}>DRIVE</span>{' '}
            </span>
          </p>
        ) : (
          <p className={styles.run_text}>
            ВЕЛО & МОТО <span style={{ color: '#f77523' }}>DRIVE</span>
          </p>
        )}
        <img src='/images/footer_vel.png' alt='' />
      </div>
      <div className={styles.footer_info}>
        <a href='https://alazarstudio.ru/' target='_blank' rel='noopener noreferrer'>
          <img src='/images/alazar_logo.png' alt='' />
        </a>
        <div className={styles.footer_docs}>
          <a href='/' target='_blank' rel='noopener noreferrer'>
            Политика конфиденциальности
          </a>
          <a href='/' target='_blank' rel='noopener noreferrer'>
            Пользовательское соглашение
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
