import { connect } from 'react-redux';
import { sendConfirmationDelivery } from '../../actions/escrow';
import Orders from '../../components/Account/Orders';

const mapStateToProps = (state) => ({
  orders: state.escrow.userOrders,
  status: state.escrow.status,
});

const mapDispatchToProps = (dispatch) => ({

  sendConfirmationDelivery: (orderId) => {
    dispatch(sendConfirmationDelivery(orderId));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Orders);
