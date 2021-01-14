import {
  FETCH_ESCROW_CONTRACT,
  STORE_ORDERS,
} from '../actions/escrow';
import {
  STORE_PRODUCT_PRICE_IN_WEI,
  STORE_TRANSACTION_PARAMS,
} from '../actions/fidelity';

const initialState = {
  contract: {},
  sellerAddress: '',
  amountInWei: 0,
  userOrders: [{
    orderId: 0,
    seller: '',
    amount: 0,
    state: 0,
  }],
  status: '',
};
const escrowReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case STORE_TRANSACTION_PARAMS:
      return {
        ...state,
        sellerAddress: action.seller,
        amount: action.value,
      };

    case STORE_PRODUCT_PRICE_IN_WEI:
      return {
        ...state,
        amountInWei: action.price,
      };
      
    case FETCH_ESCROW_CONTRACT:
      return {
        ...state,
        contract: action.contract,
      };

    case STORE_ORDERS:
      if (state.userOrders[0].orderId === 0) {
        return {
          ...state,
          userOrders: [{
            orderId: action.orderId,
            seller: action.seller,
            amount: action.amount,
            state: action.state,
          }],
        };
      }
      return {
        ...state,
        userOrders: [...state.userOrders, {
          orderId: action.orderId,
          buyer: action.buyer,
          seller: action.seller,
          amount: action.amount,
          state: action.state,
        }],
      };
    default: return state;
  }
};
export default escrowReducer;
