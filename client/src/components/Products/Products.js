import React, { useState } from 'react';
import formatCurrency from '../../utils';
import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';
import Modal from 'react-modal';

import './products.css';
const ProductList = ({ products, addToCart }) => {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     selectedProduct: null,
  //   };
  // }
  const [selectedProduct, setSelectedProduct] = useState(null);
  const openModal = (product) => {
    setSelectedProduct({ selectedProduct: product });
  };
  const closeModal = () => {
    setSelectedProduct({ selectedProduct: null });
  };
  return (
    <div>
      <Fade bottom cascade>
        <ul className="products">
          {products.map((product) => (
            <li key={product.id}>
              <div className="product">
                <a
                  className="product-link"
                  href={'#' + product.id}
                  onClick={() => openModal(product)}
                >
                  <img src={product.image} alt={product.title}></img>
                  <p>{product.title}</p>
                </a>
                <div className="product-price">
                  <span>{formatCurrency(product.price)}</span>
                  <button
                    onClick={() => addToCart(product)}
                    className="button primary"
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Fade>
      {selectedProduct && (
        <Modal isOpen={true} onRequestClose={closeModal}>
          <Zoom>
            <button className="close-modal" onClick={closeModal}>
              x
            </button>
            <div className="product-details">
              <img src={selectedProduct.image} alt={selectedProduct.title} />
              <div className="product-details-description">
                <p>
                  <strong>{selectedProduct.title}</strong>
                </p>
                <p>{selectedProduct.description}</p>
                <p>
                  available Sizes:{' '}
                  {selectedProduct.availableSizes.map((x) => (
                    <span>
                      {' '}
                      <button className="button">{x}</button>
                    </span>
                  ))}
                </p>
                <div className="product-price">
                  <div>{formatCurrency(selectedProduct.price)}</div>
                  <button
                    className="button primary"
                    onClick={() => {
                      this.props.addToCart(selectedProduct);
                      this.closeModal();
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </Zoom>
        </Modal>
      )}
    </div>
  );
};

export default ProductList;
