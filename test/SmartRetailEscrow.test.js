const { BN } = require('@openzeppelin/test-helpers');
const { expect } = require('chai');
const SmartRetailEscrow = artifacts.require("SmartRetailEscrow");

contract('SmartRetailEscrow', function (accounts) {
    const admin = accounts[8];
    const seller = accounts[1];
    const buyer = accounts[2];

    let SmartRetailEscrowInstance;
    const amount = new BN(5000);

    beforeEach(async function () {
        SmartRetailEscrowInstance = await SmartRetailEscrow.new({from: admin});
    });

    it("SendPaymentToSeller", async () => {

        await SmartRetailEscrowInstance.sendPayment(seller, amount, {from: buyer, value: amount });
        let amountDepositOfSeller = await SmartRetailEscrowInstance.getDepositsOf({from:seller});

        expect(amountDepositOfSeller).to.be.bignumber.equal(amount);

    });

    // it("Adminstrator should start proposal registration session", async () => {

    //     let beforeStatus = await VotingInstance.currState();
    //     expect(status[beforeStatus]).to.equal('RegisteringVoters');

    //     await VotingInstance.startProposalsSession({from: admin});

    //     let afterStatus = await VotingInstance.currState();
    //     expect(status[afterStatus]).to.equal('ProposalsRegistrationStarted');
    // });
        
    // it("Voter should register a proposal", async () => {

    //     await VotingInstance.addVoter(voter1, {from: admin});
    //     await VotingInstance.addVoter(voter2, {from: admin});
    //     await VotingInstance.addVoter(voter3, {from: admin});

    //     await VotingInstance.startProposalsSession({from: admin});

    //     let afterStatus = await VotingInstance.currState();
    //     expect(status[afterStatus]).to.equal('ProposalsRegistrationStarted');

    //     nbProposals = await VotingInstance.proposalId();

    //     await VotingInstance.addProposal('aaa', {from: voter1});
    //     await VotingInstance.addProposal('bbb', {from: voter2});
    //     await VotingInstance.addProposal('ccc', {from: voter3});

    //     expect(new BN(await VotingInstance.proposalId())).to.be.bignumber.above(new BN(nbProposals));
    // });
    
});