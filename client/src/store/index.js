import { generateStore } from '@drizzle/store';

import ReduxThunk from 'redux-thunk';
import drizzleOptions from '../drizzleOptions';

import FidelityMiddleware from '../middleware/FidelityMiddleware';
import EscrowMiddleware from '../middleware/EscrowMiddleware';
import fidelityReducer from '../reducers/fidelityReducer';
import productsReducer from '../reducers/productsReducer';
import escrowReducer from '../reducers/escrowReducer';

const appMiddlewares = [FidelityMiddleware, EscrowMiddleware, ReduxThunk];
const appReducers = { fidelity: fidelityReducer, products: productsReducer, escrow: escrowReducer };
// create the store
const store = generateStore({
  drizzleOptions,
  appReducers,
  appMiddlewares,
  disableReduxDevTools: false, // enable ReduxDevTools!
});

export default store;
