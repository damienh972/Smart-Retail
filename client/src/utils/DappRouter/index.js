import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';

import Dapp from '../../containers/Dapp';
import ProductDetails from '../../components/ProductDetails';
import Account from '../../containers/Account';

const DappRouter = (drizzle) => (

  <div>
    <Switch>
      <Route
        exact
        path="/"
      >
        <Dapp
          drizzle={drizzle}
        />
      </Route>
      <Route
        exact
        path="/product"
      >
        <ProductDetails />
      </Route>
      <Route
        exact
        path="/account"
      >
        <Account 
          drizzle={drizzle}
        />
      </Route>
    </Switch>
  </div>
);

export default DappRouter;
