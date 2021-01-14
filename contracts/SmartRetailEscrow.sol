// contracts/SmartRetailEscrow.sol
// SPDX-License-Identifier: MIT
// Contract Natspec documentation here https://ipfs.io/ipfs/QmPR6XfxE5siK2crKoLybpVucyk8C5jEbVtyeBZ41bsTVY

pragma solidity 0.6.12;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/payment/escrow/Escrow.sol";
import "./FDLTTokenManager.sol";

/** @author The SmartRetail Team
  * @title TokenManagerInterface
  * @dev Use asyncDeposit and claim from FDLTTokenManager.sol 
  */
interface FDLTTokenManagerInterface {
	function asyncDeposit(address dest, uint256 amount) external;
	function claim(address dest) external ;
}

/** @author The SmartRetail Team
  * @title SmartRetailEscrow
  */
contract SmartRetailEscrow is Ownable, ReentrancyGuard { 
    
	enum State { AWAITING_PAYMENT, AWAITING_DELIVERY, PAID}
	
	struct Order {
		address payable seller;
		address buyer;
		uint amount;
		State state;
	} 
    	
	Escrow private escrow;
	FDLTTokenManager private manager;
	FDLTTokenManagerInterface private tokenManagerContract;

	event FundSendToContract(string contractMessage, FDLTTokenManager FDLTTokenManagerContract,  uint orderId, address seller, address buyer, uint amount ,State state);
	event FundSendToSeller(string sellerMessage,  uint orderId);

	mapping(uint => Order) public listOrders;
	
  /// @dev Creates new escrow contract and a new instance of the FDLTTokenManager smart contract for current order
	constructor() ReentrancyGuard() public {
		escrow = new Escrow();
		manager = new FDLTTokenManager(); 
		tokenManagerContract = FDLTTokenManagerInterface(address(manager));
	}

	receive() external payable {}

	/**
	  * @dev Receives payments from buyer address and keep it in an escrow, the _value param's unit must be in wei
	  * @param _seller The address of the product seller
	  * @param _value The value of the product
	  */
	function sendPayment(address payable _seller, uint _value) external payable {
		require((_value) == msg.value, "You're not sending the correct value");

		Order memory newOrder;

		newOrder.seller = _seller;
		newOrder.buyer = msg.sender;
		newOrder.amount =_value;

		escrow.deposit{value: msg.value}(_seller);
		newOrder.state = State.AWAITING_DELIVERY;
		listOrders[block.timestamp] = newOrder;

		emit FundSendToContract("Successfully deposit funds to contract",manager, block.timestamp, newOrder.seller, newOrder.buyer,  newOrder.amount, newOrder.state);
	}

	/**
	  * @dev Withdraw funds from escrow to seller address, the _orderId param must be the block timestamp of the associated sendPayement fonction transaction
	  * @param _orderId The order id
	  */
	function confirmDelivery(uint _orderId) external nonReentrant() {
		require(listOrders[_orderId].state != State.PAID, "order is already paid");
		require(listOrders[_orderId].state == State.AWAITING_DELIVERY, "You cannot confirm until deposit first");
		require(listOrders[_orderId].buyer == msg.sender, "caller is not the the buyer");

		escrow.withdraw(listOrders[_orderId].seller);
		// todo function convert orderAmount to tokenAmount
		tokenManagerContract.asyncDeposit(msg.sender, listOrders[_orderId].amount );
		listOrders[_orderId].state = State.PAID;

		emit FundSendToSeller("Successfully transferred funds to seller", _orderId);
	}

  /// @dev Call the claim function of FDLTTokenManager contract
	function claimFDLTToken() external  {
		tokenManagerContract.claim(msg.sender);
	}

	/**
	  * @dev Set a new FDLTTokenManager.sol contract address in case of updates
	  * @param _address The FDLTTokenManager.sol contract address
	  */
	function setTokenManagerContractAddress(address _address) external onlyOwner {
		tokenManagerContract = FDLTTokenManagerInterface(_address);
	}
	
	/**
	  * @dev Return the deposit amount locked in escrow contract waiting to transfer to caller
	  * @return @param test
	  */
	function getDepositsOf() public view returns(uint){
		return escrow.depositsOf(msg.sender);
	}
}