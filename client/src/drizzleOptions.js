import SmartRetailEscrow from './contracts/SmartRetailEscrow.json';

// Here you can add data usefull for drizzle object initialisation
// like contracts, events, or provider
const options = {
  web3: {
    fallback: {
      type: 'ws',
      url: 'ws://127.0.0.1:7545',
    },
  },
  contracts: [SmartRetailEscrow],
  events: {
    SmartRetailEscrow: ['FundSendToContract', 'FundSendToSeller'],
    FDLTTokenManager: ['Deposit'],
    FDLTToken: ['Minted'],
  },
  // syncAlways: true,
};

export default options;
