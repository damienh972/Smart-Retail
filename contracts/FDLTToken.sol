// contrats/FDLTToken.sol
// SPDX-License-Identifier: MIT 
// Contract Natspec documentation here https://ipfs.io/ipfs/QmW6XEMY77kaaz47WoZT3NKCBED9n9cT4yU3JqoWcH9Xe7

pragma solidity 0.6.12;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/** @author The SmartRetail Team
  * @title FDLTToken 
  * @dev Token creator and distributor 
  */
contract FDLTToken is ERC20 , Ownable{

	event Minted(address dest, uint amount, address tokenAddress);
	/// @dev Standart ERC20 constructor from oppenzeppelin smartcontract library
	constructor() public ERC20("SmartRetail Fidelity Token", "FDLT") {}

	/**
		* @dev Mint and send tokens to _dest parameter address
		* @param _dest The buyer address
		* @param _amount The value of the purchase in wei
		*/
	function mintTokenTo(address _dest, uint _amount) public onlyOwner {
		_mint(_dest, _amount);
		emit Minted(_dest, _amount, address(this));
	}
}