import PropTypes from "prop-types";
import React, { useEffect } from 'react';
import { DrizzleContext } from '@drizzle/react-plugin';
import { Drizzle } from '@drizzle/store';
import { BrowserRouter as Router } from 'react-router-dom';
import store from '../../store';
import drizzleOptions from '../../drizzleOptions';

import DappRouter from '../../utils/DappRouter';
import NavBar from '../NavBar';
import Loading from '../ReactLoading';

// It instanciate new drizzle object with our drizzleOptions
const drizzle = new Drizzle(drizzleOptions, store);

const App = ({ fetchCurrentAccount, currentAccount }) => {
  async function getAccount() {
    const accounts = await window.ethereum.enable();
    fetchCurrentAccount(accounts[0]);
  }
  window.ethereum.on('accountsChanged', () => {
    getAccount();
  });

  // We use another react hook in order to make a new component render each time the currentAccount
  // variable change his value, learn more at https://fr.reactjs.org/docs/hooks-effect.html
  useEffect(() => {
    getAccount();
  }, [currentAccount]);

  return (
    // Here is native drizzle components who helps to Dapp initialisation
    <DrizzleContext.Provider drizzle={drizzle}>
      <DrizzleContext.Consumer>
        {(drizzleContext) => {
          const { initialized } = drizzleContext;
          return initialized ? (
            <div className="app">
              <Router>
                <NavBar currentAccount={currentAccount} />
                <DappRouter drizzle={drizzle} currentAccount={currentAccount} />
              </Router>
            </div>
          ) : (
            <Loading type="cylon" color="#357EDD" />
          );
        }}
      </DrizzleContext.Consumer>
    </DrizzleContext.Provider>
  );
};

App.propTypes = {
  currentAccount: PropTypes.string.isRequired,
  fetchCurrentAccount: PropTypes.func.isRequired,
};

export default App;
