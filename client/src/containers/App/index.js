import { connect } from 'react-redux';
import { fetchCurrentAccount } from '../../actions/fidelity';
import App from '../../components/App';

const mapStateToProps = (state) => ({
  currentAccount: state.fidelity.account,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrentAccount: (account) => {
    dispatch(fetchCurrentAccount(account));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
