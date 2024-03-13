import { combineReducers } from 'redux';
import { productReducer, selectedProductReducer } from './productReducer';

const reducers = combineReducers({
  // * key: reducer
  allProducts: productReducer,
  product: selectedProductReducer,
});

export default reducers;
