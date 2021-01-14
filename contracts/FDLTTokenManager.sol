// contracts/FDLTTokenManager.sol
// SPDX-License-Identifier: MIT
// Contract Natspec documentation here https://ipfs.io/ipfs/QmYMEZgF9mFL9CDAdT4UdveEXf4LkoZsqYXtb7UZEm1rKj

pragma solidity 0.6.12;

import "./FDLTToken.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/** @author The SmartRetail Team
  * @title FDLTTokenManager
  * @dev Use mintTokenTo function of FDLTToken.sol
  */
interface FDLTTokenInterface {
  function mintTokenTo(address dest, uint amount)  external;
}
/** @author The SmartRetail Team
  * @title FDLTTokenManager
  */
contract FDLTTokenManager is Ownable {
    
	using SafeMath for uint256;
	FDLTToken private token; 
	FDLTTokenInterface private FDLTTokenContract;
	mapping (address => uint256) private tokenPayments;

	event Deposit(address dest, uint allowance);
	event Claimed(address dest, address tokenAddress);

	/// @dev Creates a new instance of the ERC20 FDLTToken smart contract and use its address to create interface for "mintTokenTo" function import
	constructor() public {
		token = new FDLTToken();
		FDLTTokenContract = FDLTTokenInterface(address(token));
	}

	/**
	* @dev Add deposits of the reward token
	* @param _dest The address of the rewarded user
	* @param _amount The amount of tokens to increase
	*/
	function asyncDeposit(address _dest, uint256 _amount) public onlyOwner {
		tokenPayments[_dest] = tokenPayments[_dest].add(_amount);
		emit Deposit(_dest, tokenPayments[_dest]);
	}

	/**
	* @dev Call mintTokenTo function of FDLTToken contract in order to mint tokens according to user balance. Note: the user's token balance is reset to zero
	* @param _dest The address of the rewarded user to manage balance
	*/
	function claim(address _dest) external {
		require(tokenPayments[_dest] !=0, "not enought tokens");
		FDLTTokenContract.mintTokenTo(_dest,tokenPayments[_dest]);
		emit Claimed(_dest, address(token));
		tokenPayments[_dest] = 0;
	}

	/**
	* @dev Set a new FDLTToken.sol contract address in case of updates
	* @param _address The new FDLTToken.sol contract address
	*/
	function setFDLTTokenContractAddress(address _address) external onlyOwner {
		FDLTTokenContract = FDLTTokenInterface(_address);
	}
}