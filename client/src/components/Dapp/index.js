import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { usePromiseTracker } from 'react-promise-tracker';
// local import
import Marketplace from '../../containers/Marketplace';
import Loading from '../ReactLoading';
import './dapp.scss';

const Dapp = ({
  drizzle,
  fetchFidelityContract,
  fetchProducts,
  fetchEscrowContract,
  products,
}) => {
  const fidelityContract = drizzle.drizzle.options.contracts[1];
  const escrowContract = drizzle.drizzle.contracts.SmartRetailEscrow;

  useEffect(() => {
    fetchFidelityContract(fidelityContract);
    fetchEscrowContract(escrowContract);
    fetchProducts();
  }, []);

  const { promiseInProgress } = usePromiseTracker();
  return (
    <div className="dapp">
      {promiseInProgress ? (
        <Loading type="bubbles" color="#3F51B5" />
      ) : (
        products.map((product) => (
          <Marketplace
            key={product.id}
            productId={product.id}
            title={product.title}
            img={product.imgUrl}
            description={product.description}
            price={product.unitPrice}
          />
        ))
      )}
    </div>
  );
};
Dapp.propTypes = {
  drizzle: PropTypes.shape({
    drizzle: PropTypes.shape({
      contracts: PropTypes.shape({
        SmartRetailEscrow: PropTypes.any.isRequired,
      }).isRequired,
      options: PropTypes.shape({
        contracts: PropTypes.any.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
  fetchEscrowContract: PropTypes.func.isRequired,
  fetchFidelityContract: PropTypes.func.isRequired,
  fetchProducts: PropTypes.func.isRequired,
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    unitPrice: PropTypes.number.isRequired,
    imgUrl: PropTypes.string.isRequired,
    map: PropTypes.func,
  }).isRequired),
};

export default Dapp;
