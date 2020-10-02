import React, { useState } from 'react';
import formatCurrency from '../../utils';
import Fade from 'react-reveal/Fade';
import './Cart.css';
const Cart = ({ cartItems, createOrder, removeFromCart }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [showCheckout, setShowCheckout] = useState(false);

  const handleInput = (event) => {
    const value = event.target.value;
    const target = event.target.name;
    switch (target) {
      case 'name':
        setName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'address':
        setAddress(value);
        break;
      default:
        throw new Error(`${target} is not handled`);
    }
  };

  const createOrderFromCart = (event) => {
    //we do not want to refresh the page when user click on submit
    event.preventDefault();
    const order = {
      name,
      email,
      address,
      cartItems,
    };
    createOrder(order);
    localStorage.removeItem('cartItems');
  };

  return (
    <>
      <div>
        {cartItems.length === 0 ? (
          <div className="cart cart-header">Cart is empty</div>
        ) : (
          <div className="cart cart-header">
            You have {cartItems.length} in the cart
          </div>
        )}
        <div className="cart">
          <Fade left cascade>
            <ul className="cart-items">
              {cartItems.map((item) => (
                <li key={item.id}>
                  <div>
                    <img src={item.image} alt={item.tile} />
                  </div>
                  <div>
                    <div>{item.title}</div>
                    <div className="right">
                      <span>
                        {item.count}X{formatCurrency(item.price)}{' '}
                      </span>
                      <button
                        className="button"
                        onClick={() => removeFromCart(item)}
                      >
                        Remove{' '}
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </Fade>
        </div>

        {cartItems.length > 0 && (
          <div>
            <div className="cart">
              <div className="total">
                <div>
                  Total:{' '}
                  {formatCurrency(
                    cartItems.reduce((a, c) => a + c.price * c.count, 0)
                  )}
                </div>
                <button
                  onClick={() => {
                    setShowCheckout({ showCheckout: true });
                  }}
                  className="button primary"
                >
                  Proceed
                </button>
              </div>
            </div>
            {showCheckout && (
              <Fade right cascade>
                <div className="cart">
                  <form onSubmit={createOrderFromCart}>
                    <ul className="form-container">
                      <li>
                        <label>Email</label>
                        <input
                          type="email"
                          name="email"
                          required
                          onChange={handleInput}
                        ></input>
                      </li>
                      <li>
                        <label>Name</label>
                        <input
                          type="text"
                          name="name"
                          required
                          onChange={handleInput}
                        ></input>
                      </li>
                      <li>
                        <label>Address</label>
                        <input
                          type="text"
                          name="address"
                          required
                          onChange={handleInput}
                        ></input>
                      </li>
                      <li>
                        <button className="button primary" type="submit">
                          Checkout
                        </button>
                      </li>
                    </ul>
                  </form>
                </div>
              </Fade>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
