// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract SupplyChain {
    enum State { Created, ForSale, Sold, Shipped, Received }
    enum Role { None, Buyer, Seller } // Roles: None, Buyer, Seller

    struct Item {
        uint256 id;
        string name;
        uint256 price;
        uint256 quantity;
        State state;
        address payable seller;
        address payable buyer;
    }

    mapping(uint256 => Item) public items;
    mapping(address => Role) public roles; // Map accounts to roles
    uint256 public itemCounter;

    event LogForSale(uint256 id);
    event LogSold(uint256 id);
    event LogItemRemoved(uint256 id);

    modifier onlySeller() {
        require(roles[msg.sender] == Role.Seller, "Not authorized: Must be seller");
        _;
    }

    modifier onlyBuyer() {
        require(roles[msg.sender] == Role.Buyer, "Not authorized: Must be buyer");
        _;
    }

    modifier onlySellerOfItem(uint256 _id) {
        require(items[_id].seller == msg.sender, "Not authorized: Not the item's seller");
        _;
    }

    function setRole(Role _role) public {
        roles[msg.sender] = _role;
    }

    function addItem(string memory _name, uint256 _price, uint256 _quantity) public onlySeller {
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

    function buyItem(uint256 _id, uint256 _quantity) public payable onlyBuyer {
        Item storage item = items[_id];
        require(item.state == State.ForSale, "Item not for sale");
        require(item.quantity >= _quantity, "Not enough quantity available");
        require(msg.value >= item.price * _quantity, "Insufficient payment");

        item.quantity -= _quantity;

        if (item.quantity == 0) {
            item.state = State.Sold;
        }

        item.buyer = payable(msg.sender);
        (bool success, ) = item.seller.call{value: item.price * _quantity}("");
        require(success, "Transfer to seller failed");

        emit LogSold(_id);
    }

    function removeItem(uint256 _id) public onlySellerOfItem(_id) {
        delete items[_id];
        emit LogItemRemoved(_id);
    }
}
