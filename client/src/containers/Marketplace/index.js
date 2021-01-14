import { connect } from 'react-redux';
import {
  sendProduct,
  sendBalance,
} from '../../actions/fidelity';
import Marketplace from '../../components/Dapp/Marketplace';

const mapStateToProps = (state) => ({
  tokenBalance: state.fidelity.fidelityTokenAmount,
});

const mapDispatchToProps = (dispatch) => ({

  sendProduct: (productPrice) => {
    dispatch(sendProduct(productPrice));
  },
  sendBalance: (id) => {
    dispatch(sendBalance(id));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Marketplace);
