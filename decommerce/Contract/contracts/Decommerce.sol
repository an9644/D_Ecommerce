// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {ERC20Permit} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract ACToken is ERC20, Ownable, ERC20Permit, ReentrancyGuard {
    mapping(uint256 => Asset) public assets;
    uint256 public assetCounter;

    struct Asset {
        uint256 id;
        string name;
        string description;
        string imageURL;
        uint256 price;
        address owner;
    }

    event AssetCreated(uint256 indexed assetId, string name, string description, string imageURL, uint256 price, address indexed owner);
    event AssetUpdated(uint256 indexed assetId, string name, string description, string imageURL, uint256 price);
    event AssetDeleted(uint256 indexed assetId);
    event AssetBought(uint256 indexed assetId, address indexed buyer, uint256 price);
    event AssetSold(uint256 indexed assetId, address indexed seller, uint256 price);

    constructor() ERC20("AC Token", "ACT") Ownable() ERC20Permit("AC Token") {}

    function mint(address account, uint256 amount) public onlyOwner {
        _mint(account, amount);
    }
            function purchaseTokens() public payable {
            require(msg.value > 0, "Send ETH to get AC Tokens");
            uint256 amount = msg.value / 0.001 ether; 
            _mint(msg.sender, amount);
        }


    function createAsset(string memory _name, string memory _description, string memory _imageURL, uint256 _price) public {
        require(_price > 0, "Price must be greater than zero");
        assetCounter++;
        assets[assetCounter] = Asset(assetCounter, _name, _description, _imageURL, _price, msg.sender);
        emit AssetCreated(assetCounter, _name, _description, _imageURL, _price, msg.sender);
    }

    function updateAsset(uint256 _assetId, string memory _name, string memory _description, string memory _imageURL, uint256 _price) public {
        require(msg.sender == assets[_assetId].owner, "Only the owner can update the asset");
        require(_price > 0, "Price must be greater than zero");
        assets[_assetId].name = _name;
        assets[_assetId].description = _description;
        assets[_assetId].imageURL = _imageURL;
        assets[_assetId].price = _price;
        emit AssetUpdated(_assetId, _name, _description, _imageURL, _price);
    }

    function deleteAsset(uint256 _assetId) public {
        require(msg.sender == assets[_assetId].owner, "Only the owner can delete the asset");
        delete assets[_assetId];
        emit AssetDeleted(_assetId);
    }

    function buyAsset(uint256 _assetId) public nonReentrant {
        require(assets[_assetId].owner != msg.sender, "Cannot buy your own asset");
        require(assets[_assetId].price > 0, "Asset price must be greater than zero");
        require(balanceOf(msg.sender) >= assets[_assetId].price, "Insufficient AC tokens");
        // Transfer AC tokens from buyer to seller
        _transfer(msg.sender, assets[_assetId].owner, assets[_assetId].price);
        // Update asset ownership
        assets[_assetId].owner = msg.sender;
        emit AssetBought(_assetId, msg.sender, assets[_assetId].price);
    }

    function sellAsset(uint256 _assetId, uint256 _price) public nonReentrant {
        require(msg.sender == assets[_assetId].owner, "Only the owner can sell the asset");
        require(_price > 0, "Price must be greater than zero");
        assets[_assetId].price = _price;
        emit AssetSold(_assetId, msg.sender, _price);
    }
}