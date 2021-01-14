import {
  FETCH_FIDELITY_CONTRACT,
  FETCH_CURRENT_ACCOUNT,
  STORE_TOKEN_AMOUNT_IN_WEI,
  STORE_USER_BALANCE,
  STORE_TOKEN_ADDRESS,
  RESET_BALANCE,
  STORE_PRODUCT_PRICE_IN_DOLLARS,
} from '../actions/fidelity';

const initialState = {
  tokenAddress: '',
  account: '',
  tokenEarnedInWei: 0,
  userBalance: 0,
  productPriceInDollars: null,
};

const fidelityReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_FIDELITY_CONTRACT:
      return {
        ...state,
        contract: action.contract,
      };

    case FETCH_CURRENT_ACCOUNT:
      return {
        ...state,
        account: action.account,
      };
    case STORE_TOKEN_AMOUNT_IN_WEI:
      return {
        ...state,
        tokenEarnedInWei: action.amount,
      };
    case STORE_USER_BALANCE:
      return {
        ...state,
        userBalance: state.userBalance + action.balance,
      };
    case STORE_TOKEN_ADDRESS:
      return {
        ...state,
        tokenAddress: action.address,
      };
    case RESET_BALANCE:
      return {
        ...state,
        userBalance: 0,
      };
    case STORE_PRODUCT_PRICE_IN_DOLLARS:
      return {
        ...state,
        productPriceInDollars: action.price,
      };
    default: return state;
  }
};

export default fidelityReducer;
