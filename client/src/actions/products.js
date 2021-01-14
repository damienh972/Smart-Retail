// npm import
import axios from 'axios';
import { trackPromise } from 'react-promise-tracker';

// local import
export const FETCH_PRODUCTS_PENDING = 'FETCH_PRODUCTS_PENDING';
export const FETCH_PRODUCTS_SUCCES = 'FETCH_PRODUCTS_SUCCES';
export const FETCH_PRODUCTS_ERROR = 'FETCH_PRODUCTS_ERROR';

const fetchProductsPending = () => ({
  type: FETCH_PRODUCTS_PENDING,
});

const fetchProductsSucces = (products) => ({
  type: FETCH_PRODUCTS_SUCCES,
  products,
});

const fetchProductsError = (error) => ({
  type: FETCH_PRODUCTS_ERROR,
  error,
});

// Asynchronous actions
export const fetchProducts = () => {
  return (dispatch) => {
    dispatch(fetchProductsPending());
    return trackPromise(
      axios
        .get(
          `https://salty-citadel-63624.herokuapp.com/api/products?page=${1}`,
        )
        .then((json) => {
          const { data } = json;
          const products = data['hydra:member'];
          dispatch(fetchProductsSucces(products));
        })
        .catch((error) => {
          dispatch(fetchProductsError(error));
        }),
    );
  };
};
