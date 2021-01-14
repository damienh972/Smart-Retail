import {
  FETCH_PRODUCTS_SUCCES,
}
  from '../actions/products';

const initialState = [];

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_SUCCES:
      return action.products;
    default:
      return state;
  }
}

export default productsReducer;
