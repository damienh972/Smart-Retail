import { connect } from 'react-redux';
import Marketplace from '../../components/Dapp/Marketplace';

const mapStateToProps = (state) => ({
  tokenAmount: state.fidelity.fidelityTokenAmount,
});

const mapDispatchToProps = (dispatch) => {

};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Marketplace);
