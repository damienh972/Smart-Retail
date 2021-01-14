import PropTypes from 'prop-types';
import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Orders from '../../containers/Account/Orders';

const Account = ({
  drizzle,
  balance,
  claimTokens,
  tokenAddress,
}) => {
  const useStyles = makeStyles({
    account_Paper: {
      backgroundColor: '#3f51b5',
      display: 'flex',
      flexDirection: 'column',
      margin: 'auto',
      marginTop: '4em',
      width: '60vw',
      height: '60vh',
    },
    account_buttons: {
      backgroundColor: 'white',
      margin: '1em auto',
      color: '#3f51b5',
    },
    account_text: {
      textAlign: 'center',
      fontSize: '2em',
      fontWeight: 'bold',
      color: 'white',
      marginTop: '2em',
      marginBottom: 0,
    },
    account_address: {
      textAlign: 'center',
      fontWeight: 'bold',
      color: 'white',
    },
  });

  const classes = useStyles();
  const handleClaim = () => {
    claimTokens();
  };

  return (
    <div>
      <Paper className={classes.account_Paper} elevation={2}>
        <Typography
          className={classes.account_text}
          gutterBottom
          variant="h5"
          component="h2"
        >
          <p>Pending delivery :</p>
        </Typography>
        <Orders
          drizzle={drizzle}
        />
        <Typography
          className={classes.account_text}
          gutterBottom
          variant="h5"
          component="h2"
        >
          <p>Your balance :</p>
          <p>{balance} FDLT</p>
        </Typography>
        <Button
          className={classes.account_buttons}
          variant="contained"
          onClick={handleClaim}
        >
          Claim tokens
        </Button>
        <Typography
          className={classes.account_address}
          gutterBottom
          variant="h5"
          component="h2"
        >
          <p>{tokenAddress}</p>
        </Typography>
      </Paper>
    </div>
  );
};

Account.propTypes = {
  balance: PropTypes.number.isRequired,
  claimTokens: PropTypes.func.isRequired,
  tokenAddress: PropTypes.string.isRequired,
};

export default Account;
