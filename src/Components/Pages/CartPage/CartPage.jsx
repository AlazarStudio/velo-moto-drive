import React, { useEffect, useState } from 'react';

import CartItem from '../../Blocks/CartItem/CartItem';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';

import styles from './CartPage.module.css';

function CartPage({ children, ...props }) {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [originalPrice, setOriginalPrice] = useState(0);

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(cartData);
    calculateTotals(cartData);
  }, []);

  const calculateTotals = (items) => {
    const newTotalPrice = items.reduce((total, item) => {
      if (item.isChecked) {
        return total + parseFloat(item.currentPrice.replace(/\s/g, ''));
      }
      return total;
    }, 0);

    const newOriginalPrice = items.reduce((total, item) => {
      if (item.isChecked) {
        return total + parseFloat(item.originalPrice.replace(/\s/g, ''));
      }
      return total;
    }, 0);

    setTotalPrice(newTotalPrice);
    setOriginalPrice(newOriginalPrice);
  };

  const handleCheckboxChange = (isChecked, itemName, itemPrice) => {
    const updatedCartItems = cartItems.map(item =>
      item.name === itemName ? { ...item, isChecked: isChecked } : item
    );
    setCartItems(updatedCartItems);
    calculateTotals(updatedCartItems);
    localStorage.setItem('cart', JSON.stringify(updatedCartItems)); // Update localStorage
  };

  const handleDeleteItem = () => {
    const updatedCartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(updatedCartItems);
    calculateTotals(updatedCartItems);
  };

  const formatNumber = num => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  };

  return (
    <main>
      <CenterBlock>
        <WidthBlock>
          {cartItems.length === 0 ? (
            <p className={styles.empty_cart}>Корзина пустая</p>
          ) : (
            <div className={styles.cart_wrapper}>
              <div className={styles.cart}>
                <div className={styles.cart_title__wrapper}>
                  <p className={styles.cart_title}>КОРЗИНА</p>
                  <hr color='#b4b4b4' />
                </div>
                {cartItems.slice().reverse().map((item, index) => ( // Display items in reverse order
                  <CartItem
                    key={index}
                    isChecked={item.isChecked || false}
                    onChange={(isChecked, itemName, itemPrice) =>
                      handleCheckboxChange(isChecked, itemName, itemPrice)
                    }
                    onDelete={handleDeleteItem}
                    img={item.img[0]}
                    name={item.name}
                    gender={item.gender}
                    currentPrice={item.currentPrice}
                    originalPrice={item.originalPrice}
                  />
                ))}
              </div>
              <div className={styles.cart_total}>
                <div className={styles.cart_total__item}>
                  <p className={styles.cart_total__main}>ИТОГО</p>
                  <p className={styles.cart_total__main}>
                    {formatNumber(totalPrice)} ₽
                  </p>
                </div>
                <div className={styles.cart_total__item}>
                  <p>Выбрано товаров</p>
                  <p>{cartItems.filter(item => item.isChecked).length}</p>
                </div>
                <div className={styles.cart_total__item}>
                  <p>Всего товаров</p>
                  <p>{cartItems.length}</p>
                </div>
                <div className={styles.cart_total__item}>
                  <p>Скидка</p>
                  <p> {formatNumber(-(originalPrice - totalPrice))} ₽</p>
                </div>
                <form action="" style={{display:'flex', flexDirection:'column', gap:'12px'}}>
                  <button className={styles.total_btn} type='reset'>
                    ОФОРМИТЬ ЗАКАЗ
                  </button>
                  <div className={styles.check_box}>
                    <div className={styles.check_box__wrapper}>
                      <input
                        className={styles.checkbox_round}
                        required={true}
                        type='checkbox'
                        name=''
                        id=''
                      />
                    </div>
                    <p className={styles.check_box__text}>
                      Согласен с условиями{' '}
                      <a href='/' target='_blank' style={{ color: '#f77523' }}>
                        Правил пользования торговой площадкой и правилами возврата
                      </a>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          )}
        </WidthBlock>
      </CenterBlock>
    </main>
  );
}

export default CartPage;
