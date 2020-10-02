import React, { useState, useEffect } from 'react';
import ProductList from './components/Products/Products';
import Filter from './components/Filter/Filter';
import Cart from './components/Cart/Cart';
import useRequest from './hooks/use-request';
import Axios from 'axios';

const App = () => {
  const [products, setProducts] = useState([]);
  const [size, setSize] = useState('');
  const [sort, setSort] = useState('');
  const [cartItems, setCartItems] = useState(
    localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : []
  );

  const { doRequest } = useRequest({
    url: '/api/shopping/products',
    method: 'get',
    body: {},
    onSuccess: (data) => {
      setProducts(data);
    },
  });
  useEffect(() => {
    const fectchData = async () => {
      const response = await Axios.get('/api/shopping/products', {});
      setProducts(response.data);
    };
    fectchData();
  }, []);

  const sortProducts = (event) => {
    event.preventDefault();
    const sort = event.target.value;
    setProducts(
      products
        .slice()
        .sort((a, b) =>
          sort === 'lowest'
            ? a.price > b.price
              ? 1
              : -1
            : sort === 'highest'
            ? a.price < b.price
              ? 1
              : -1
            : a.id > b.id
            ? 1
            : -1
        )
    );
    setSort(sort);
  };
  const filterProducts = (event) => {
    event.preventDefault();
    if (event.target.value === '') {
      setSize(event.target.value);
      setProducts(products);
    } else {
      setSize(event.target.value);
      setProducts(
        products.filter(
          (product) => product.availableSizes.indexOf(event.target.value) >= 0
        )
      );
    }
  };
  const removeFromCart = (product) => {
    const updatedCartItems = cartItems
      .slice()
      .filter((x) => x.id !== product.id);
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };
  const addToCart = (product) => {
    const updatedCartItems = cartItems.slice();
    let alreadyInCart = false;
    updatedCartItems.forEach((item) => {
      if (item.id === product.id) {
        item.count++;
        alreadyInCart = true;
      }
    });
    if (!alreadyInCart) {
      updatedCartItems.push({ ...product, count: 1 });
    }
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };
  const createOrder = (order) => {
    alert('Need to save order for ' + order.name);
    //console.log('Need to save order for ', order.name);
  };

  return (
    <div className="grid-container">
      <header>
        <a href="/">Shopping Cart</a>
      </header>
      <main>
        <div className="content">
          <div className="main">
            <Filter
              count={products.length}
              size={size}
              sort={sort}
              filterProducts={filterProducts}
              sortProducts={sortProducts}
            />
            <ProductList addToCart={addToCart} products={products} />
          </div>
          <div className="sidebar">
            <Cart
              cartItems={cartItems}
              removeFromCart={removeFromCart}
              createOrder={createOrder}
            />
          </div>
        </div>
      </main>
      <footer>All right reserved to @invasive mushrooms</footer>
    </div>
  );
};

export default App;
