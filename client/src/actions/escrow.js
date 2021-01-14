export const FETCH_ESCROW_CONTRACT = 'FETCH_ESCROW_CONTRACT';

export const SEND_CONFIRMATION_DELIVERY = 'SEND_CONFIRMATION_DELIVERY';
export const STORE_ORDERS = 'STORE_ORDERS';

export const fetchEscrowContract = (contract) => ({
  type: FETCH_ESCROW_CONTRACT,
  contract,
});

export const sendConfirmationDelivery = (orderId) => ({
  type: SEND_CONFIRMATION_DELIVERY,
  orderId,
});

export const storeOrders = (orderId, seller, amount, state) => ({
  type: STORE_ORDERS,
  orderId,
  seller,
  amount,
  state,
});
