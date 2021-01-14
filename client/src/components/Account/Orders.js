import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionActions from '@material-ui/core/AccordionActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    alignSelf: 'center',
  },
  content: {
    margin: '6px 0',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
  column: {
    width: '20%',
    flexBasis: '33.33%',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

const Orders = ({
  orders,
  sendConfirmationDelivery,
  status,
  drizzle,
}) => {
  const classes = useStyles();
  const state = drizzle.drizzle.store.getState();
  const ordersList = [];
  
  return (
    <div className={classes.root}>
      {orders[0].orderId !== 0 && (
        orders.map((order) => (
          <Accordion
            key={order.orderId}
            TransitionProps={{ unmountOnExit: true }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1c-content"
              id="panel1c-header"
            >
              <div className={classes.column}>
                <Typography className={classes.heading}>Command number</Typography>
                <Typography className={classes.secondaryHeading}>{order.orderId}</Typography>
              </div>
              <div className={classes.column}>
                <Typography className={classes.heading}>seller</Typography>
                <Typography className={classes.secondaryHeading}>{order.seller.slice(0, 10)}{order.seller.length > 10 && ('...')}</Typography>
              </div>
              <div className={classes.column}>
                <Typography className={classes.heading}>price</Typography>
                <Typography className={classes.secondaryHeading}>{order.amount.slice(0, 10)}{order.amount.length > 10 && ('...')}</Typography>
              </div>
              <div className={classes.column}>
                <Typography className={classes.heading}>status</Typography>
                {order.state === '1' && (
                <Typography className={classes.secondaryHeading}>awaiting delivery</Typography>
                )}
                {status === 'success' && (
                <Typography className={classes.secondaryHeading}>Paied</Typography>
                )}
              </div>
            </AccordionSummary>
            <Divider />
            <AccordionActions>
              <Button size="small">Cancel</Button>
              <Button
                size="small"
                color="primary"
                onClick={() => sendConfirmationDelivery(order.orderId)}
              >
                Confirm Delivery
              </Button>
            </AccordionActions>
          </Accordion>
        )))}
    </div>
  );
};

export default Orders;

Orders.propTypes = {
  orders: PropTypes.arrayOf(
    PropTypes.shape({
      orderId: PropTypes.any.isRequired,
      seller: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      state: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
  sendConfirmationDelivery: PropTypes.func.isRequired,
};
