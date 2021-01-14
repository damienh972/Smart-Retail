import { connect } from 'react-redux';
import { fetchFidelityContract } from '../../actions/fidelity';
import { fetchEscrowContract } from '../../actions/escrow';
import { fetchProducts } from '../../actions/products';
import Dapp from '../../components/Dapp';

const mapStateToProps = (state) => ({
  currentAccount: state.fidelity.account,
  products: state.products,
  balance: state.fidelity.fidelityTokenAmount,
});

const mapDispatchToProps = (dispatch) => ({
  fetchFidelityContract: (contract) => {
    dispatch(fetchFidelityContract(contract));
  },

  fetchEscrowContract: (contract) => {
    dispatch(fetchEscrowContract(contract));
  },

  fetchProducts: (products) => {
    dispatch(fetchProducts(products));
},
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dapp);
