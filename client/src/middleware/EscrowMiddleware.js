import axios from 'axios';
import {
  SEND_CONFIRMATION_DELIVERY,
  storeOrders,
  // updateStatus,
} from '../actions/escrow';
import { SEND_TRANSACTION } from '../actions/fidelity';

const EscrowMiddleware = (store) => (next) => (action) => {
  const state = store.getState()
  
  const BigNumber = require('bignumber.js');
  const { account, price } = store.getState().fidelity;
  const escrowState = store.getState().escrow;
  
  switch (action.type) {
    case SEND_TRANSACTION: {
      const seller = escrowState.sellerAddress;
      const amount = new BigNumber(escrowState.amountInWei);
      const payment = async function sendPaymentToEscrow() {
        const transaction = await escrowState.contract.methods.sendPayment(seller, amount).send({
          from: account,
          value: amount,
        })
        const values = transaction.events.FundSendToContract.returnValues;
        store.dispatch(storeOrders(values.orderId, values.seller, values.amount, values.state));
        axios.post('https://salty-citadel-63624.herokuapp.com/api/orders', {
          referenceId: parseInt(values.orderId),
          price: price,
          status: 'awaiting payement',
          userId: [35],
        })
        .then(
          (response) => {
            console.log(response);
          }
        )
        .catch(
          (error) => {
          console.log(error);
      })
      };
      payment();
      next(action);
      break;
    }

    case SEND_CONFIRMATION_DELIVERY: {
      const confirmation = async function sendConfirmationDelivery() {
        const transaction = await escrowState.contract.methods.confirmDelivery(action.orderId).send({ from: account });
        console.log(transaction);
        // const status = transaction.events.FundSendToSeller.returnValues.currentState;
        // updateStatus(status,action.orderId);
      };
      confirmation();
      next(action);
      break;
    }
    default: next(action);
  }
};
export default EscrowMiddleware;
