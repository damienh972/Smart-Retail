import {
  CLAIM_TOKENS,
  storeTokenAddress,
  resetBalance,
} from '../actions/fidelity';

const FidelityMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case CLAIM_TOKENS: {
      const escrowState = store.getState().escrow;
      const claimTokens = async function claimTokens() {
        const transaction = await escrowState.contract.methods.claimFDLTToken().send({
          from: escrowState.account,
        })
          .then(
            (response) => {
              store.dispatch(storeTokenAddress(response.events[0].address));
              store.dispatch(resetBalance());
            },
          );
      };
      claimTokens();
      break;
    }
    default: next(action);
  }
};
export default FidelityMiddleware;
