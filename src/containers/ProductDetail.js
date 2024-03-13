import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import {
  removeSelectedProduct,
  selectedProduct,
} from '../redux/actions/productAction';
import { useEffect } from 'react';

const ProductDetail = () => {
  const product = useSelector((state) => state.product);
  const { image, title, price, category, description } = product;

  const productID = useLocation().pathname.split('/')[2];
  // console.log('ProductID: ', productID);
  const dispatch = useDispatch();
  // console.log('ProductDetail: ', product);

  const fetchProductDetail = async (productID) => {
    const response = await axios
      .get(`https://fakestoreapi.com/products/${productID}`)
      .catch((err) => {
        console.log('Err: ', err);
      });
    // ! ACTION SELECTED PRODUCT (REDUCER ACTION) HERE
    dispatch(selectedProduct(response.data));
  };

  useEffect(() => {
    if (productID && productID !== '') fetchProductDetail(productID);
    return () => {
      dispatch(removeSelectedProduct());
    };
  }, [productID]);

  return (
    <div className='ui grid container'>
      {Object.keys(product).length === 0 ? (
        <div>...Loading</div>
      ) : (
        <div className='ui placeholder segment'>
          <div className='ui two column stackable center aligned grid'>
            <div className='ui vertical divider'>AND</div>
            <div className='middle aligned row'>
              <div className='column lp'>
                <img className='ui fluid image' src={image} alt={title} />
              </div>
              <div className='column rp'>
                <h1>{title}</h1>
                <h2>
                  <span className='ui teal tag label'>${price}</span>
                </h2>
                <h3 className='ui brown block header'>{category}</h3>
                <p>{description}</p>
                <div className='ui vertical animated button' tabIndex='0'>
                  <div className='hidden content'>
                    <i className='shop icon'></i>
                  </div>
                  <div className='visible content'>Add to Cart</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
