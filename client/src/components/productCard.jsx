import React from 'react';
import {Link} from 'react-router';
import {Grid, Thumbnail, Button,Row, Col } from 'react-bootstrap';
import numeral from 'numeral';
import ProductImage from './productImage';
import Timer from './timer';
import BuyButton from './buyButton';
import ProductDetailModal from './productDetailModal';

class ProductCard extends React.Component {
  render() {
    let milliseconds = this.props.productDetail.timeRemaining || 1200;
    let secondsRemaining = (milliseconds / 100);

    return (
        <Col xs={6} md={3} className="portfolio-item">
          <div className="productCard" id={this.props.productDetail._id}>
            <div className="productName">
               {this.props.productDetail.productName}
            </div>

            <Thumbnail className="productImage" image={this.props.productDetail.image} alt="242x200">
            </Thumbnail>
            <row>
              <div className="productTime">
                <Timer secondsRemaining={secondsRemaining}/>
              </div>

              <div className="productQuantity">
                <p className="productinfo">Quantity: {this.props.productDetail.quantity}</p>
              </div>

              <div className="productPrice">
                <p className="productinfo">Price: {numeral(this.props.productDetail.price).format('$0,0[.]00')}</p>
              </div>
            </row>

            <row>
              <div className="text-center">
                <ProductDetailModal items={this.props.productDetail._id} />
              </div>
            </row>
          </div>
        </Col>
    );
  }
};

export default ProductCard;
