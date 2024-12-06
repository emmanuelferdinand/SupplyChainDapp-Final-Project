const SupplyChain = artifacts.require("SupplyChain");

contract("SupplyChain", (accounts) => {
  let instance;
  const seller = accounts[0];
  const buyer = accounts[1];

  before(async () => {
    // Deploy a new instance for testing
    instance = await SupplyChain.new();
  });

  it("should add an item with a quantity", async () => {
    await instance.addItem("Item1", web3.utils.toWei("1", "ether"), 10, { from: seller });
    const item = await instance.items(1);
    assert.equal(item.name, "Item1", "Item name mismatch");
    assert.equal(item.price.toString(), web3.utils.toWei("1", "ether"), "Item price mismatch");
    assert.equal(item.quantity.toNumber(), 10, "Item quantity mismatch");
    assert.equal(item.state.toNumber(), 1, "Item state should be ForSale");
    assert.equal(item.seller, seller, "Seller address mismatch");
  });

  it("should allow a buyer to purchase an item and reduce quantity", async () => {
    await instance.buyItem(1, 2, { from: buyer, value: web3.utils.toWei("2", "ether") }); // Buyer buys 2 items
    const item = await instance.items(1);
    assert.equal(item.quantity.toNumber(), 8, "Item quantity should decrease by 2");
    assert.equal(item.state.toNumber(), 1, "Item state should remain ForSale if quantity > 0");
  });

  it("should mark the item as Sold when quantity becomes zero", async () => {
    await instance.buyItem(1, 8, { from: buyer, value: web3.utils.toWei("8", "ether") }); // Buyer buys remaining items
    const item = await instance.items(1);
    assert.equal(item.quantity.toNumber(), 0, "Item quantity should be zero");
    assert.equal(item.state.toNumber(), 2, "Item state should be Sold when quantity is zero");
  });

  it("should allow the seller to ship the item", async () => {
    await instance.shipItem(1, { from: seller });
    const item = await instance.items(1);
    assert.equal(item.state.toNumber(), 3, "Item state should be Shipped");
  });

  it("should allow the buyer to receive the item", async () => {
      await instance.receiveItem(1, { from: buyer });
      const item = await instance.items(1);
      assert.equal(item.state.toNumber(), 4, "Item state should be Received");
  });
});
