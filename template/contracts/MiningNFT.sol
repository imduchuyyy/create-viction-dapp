// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MiningNFT is ERC721, Ownable {
    uint256 public nextTokenId;
    uint256 public mintPrice;

    constructor(uint256 _mintPrice) ERC721("MiningNFT", "MNFT") Ownable(msg.sender) {
        mintPrice = _mintPrice;
    }

    function mint() external payable {
        require(msg.value == mintPrice, "Incorrect Ether value sent");
        _safeMint(msg.sender, nextTokenId);
        nextTokenId++;
    }

    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        payable(owner()).transfer(balance);
    }
}