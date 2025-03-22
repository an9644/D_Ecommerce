// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract ACToken is ERC20, Ownable, ReentrancyGuard {
    mapping(uint256 => address) public assetOwners;
    mapping(uint256 => uint256) public assetPrices; // Track asset prices
    uint256 public assetCounter;
    
    struct Transaction {
        uint256 transactionId;
        uint256 assetId;
        address buyer;
        address seller;
        uint256 timestamp;
    }
    
    event AssetCreated(uint256 indexed assetId, address indexed owner);
    event AssetBought(uint256 indexed assetId, address indexed buyer, address indexed seller, uint256 price);
    event AssetSold(uint256 indexed assetId, address indexed seller, uint256 price);
    event TokensPurchased(address indexed buyer, uint256 amount);
    event TokensMinted(address indexed account, uint256 amount);
   
    constructor() ERC20("AC Token", "ACT") Ownable() {}

    function mint(address account, uint256 amount) public onlyOwner {
        _mint(account, amount);
        emit TokensMinted(account, amount);
    }

    function purchaseTokens() public payable {
        require(msg.value > 0, "Send ETH to get AC Tokens");

        uint256 amount = msg.value / 0.001 ether;
        require(amount > 0, "Not enough ETH sent to buy tokens");

        _mint(msg.sender, amount);
        emit TokensPurchased(msg.sender, amount);
    }

      function getBalance(address account) public view returns (uint256) {
    return balanceOf(account);
}


    function createAsset(uint256 _price) public {
        require(_price > 0, "Price must be greater than zero");

        assetCounter++;
        assetOwners[assetCounter] = msg.sender;
        assetPrices[assetCounter] = _price;

        emit AssetCreated(assetCounter, msg.sender);
    }

    function buyAsset(uint256 _assetId) public nonReentrant {
        address seller = assetOwners[_assetId];
        require(seller != msg.sender, "Cannot buy your own asset");
        require(seller != address(0), "Asset does not exist");

        uint256 price = assetPrices[_assetId];
        require(balanceOf(msg.sender) >= price, "Insufficient AC tokens");

        _transfer(msg.sender, seller, price);
        assetOwners[_assetId] = msg.sender;

        emit AssetBought(_assetId, msg.sender, seller, price);
    }

    function sellAsset(uint256 _assetId, uint256 _price) public {
        require(msg.sender == assetOwners[_assetId], "Only the owner can sell the asset");
        require(_price > 0, "Price must be greater than zero");

        assetPrices[_assetId] = _price;
        emit AssetSold(_assetId, msg.sender, _price);
    }
}
