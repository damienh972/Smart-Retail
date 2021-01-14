import { connect } from 'react-redux';
import { fetchUserBalance, claimTokens, resetBalance } from '../../actions/fidelity';

import Account from '../../components/Account';

const mapStateToProps = (state) => ({
  balance: state.fidelity.userBalance,
  tokenAddress: state.fidelity.tokenAddress,
});

const mapDispatchToProps = (dispatch) => ({

  fetchUserBalance: (id) => {
    dispatch(fetchUserBalance(id));
  },
  claimTokens: () => {
    dispatch(claimTokens());
  },
  resetBalance: (id) => {
    dispatch(resetBalance(id));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Account);
