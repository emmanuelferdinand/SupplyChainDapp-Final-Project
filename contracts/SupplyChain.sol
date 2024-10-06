// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract SupplyChain {
    enum State { Created, ForSale, Sold, Shipped, Received }

    struct Item {
        uint256 id;
        string name;
        uint256 price;
        State state;
        address payable seller;
        address payable buyer;
    }

    mapping(uint256 => Item) public items;
    uint256 public itemCounter;

    event LogForSale(uint256 id);
    event LogSold(uint256 id);
    event LogShipped(uint256 id);
    event LogReceived(uint256 id);

    modifier onlySeller(uint256 _id) {
        require(msg.sender == items[_id].seller, "Not authorized: Only seller");
        _;
    }

    modifier onlyBuyer(uint256 _id) {
        require(msg.sender == items[_id].buyer, "Not authorized: Only buyer");
        _;
    }

    function addItem(string memory _name, uint256 _price) public {
        itemCounter++;
        items[itemCounter] = Item({
            id: itemCounter,
            name: _name,
            price: _price,
            state: State.ForSale,
            seller: payable(msg.sender),
            buyer: payable(address(0))
        });
        emit LogForSale(itemCounter);
    }

    function buyItem(uint256 _id) public payable {
        Item storage item = items[_id];
        require(item.state == State.ForSale, "Item not for sale");
        require(msg.value >= item.price, "Insufficient payment");

        item.buyer = payable(msg.sender);
        item.state = State.Sold;

        // Transfer funds to the seller
        (bool success, ) = item.seller.call{value: item.price}("");
        require(success, "Transfer to seller failed");

        emit LogSold(_id);
    }

    function shipItem(uint256 _id) public onlySeller(_id) {
        Item storage item = items[_id];
        require(item.state == State.Sold, "Item not sold yet");
        item.state = State.Shipped;
        emit LogShipped(_id);
    }

    function receiveItem(uint256 _id) public onlyBuyer(_id) {
        Item storage item = items[_id];
        require(item.state == State.Shipped, "Item not shipped yet");
        item.state = State.Received;
        emit LogReceived(_id);
    }
}
