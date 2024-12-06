// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract SupplyChain {
    enum State { Created, ForSale, Sold, Shipped, Received }

    struct Item {
        uint256 id;
        string name;
        uint256 price;
        uint256 quantity; // Added quantity field
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
    event LogItemRemoved(uint256 id);

    modifier onlySeller(uint256 _id) {
        require(msg.sender == items[_id].seller, "Not authorized: Only seller");
        _;
    }

    modifier onlyBuyer(uint256 _id) {
        require(msg.sender == items[_id].buyer, "Not authorized: Only buyer");
        _;
    }

    function addItem(string memory _name, uint256 _price, uint256 _quantity) public {
        require(_quantity > 0, "Quantity must be greater than zero");
        itemCounter++;
        items[itemCounter] = Item({
            id: itemCounter,
            name: _name,
            price: _price,
            quantity: _quantity,
            state: State.ForSale,
            seller: payable(msg.sender),
            buyer: payable(address(0))
        });
        emit LogForSale(itemCounter);
    }

    function buyItem(uint256 _id, uint256 _quantity) public payable {
        Item storage item = items[_id];
        require(item.state == State.ForSale, "Item not for sale");
        require(item.quantity >= _quantity, "Not enough quantity available");
        require(msg.value >= item.price * _quantity, "Insufficient payment");

        item.quantity -= _quantity;

        // If all items are sold, update the state to Sold
        if (item.quantity == 0) {
            item.state = State.Sold;
        }

        // Transfer funds to the seller
        (bool success, ) = item.seller.call{value: item.price * _quantity}("");
        require(success, "Transfer to seller failed");

        emit LogSold(_id);
    }

    function removeItem(uint256 _id) public {
        require(items[_id].id != 0, "Item does not exist");
        delete items[_id];
        emit LogItemRemoved(_id);
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
