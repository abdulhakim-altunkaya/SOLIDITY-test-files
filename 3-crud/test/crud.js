const Crud = artifacts.require("Crud.sol");

contract("Crud", () => {
  let crud = null;

  before( async() => {
    crud = await Crud.new();
  })

  it("should create a new user", async () => {
    await crud.create("harro");
    const data = await crud.nextId();
    assert(data.toString() === "2");
  })

  it("should create a second user", async () => {
    await crud.create("agit");
    const data = await crud.nextId();
    assert(data.toString() === "3");
  })

  //struct variables in solidity are treated as array in javascript.
  //Thats why we have data[] down here.
  it("should read user name", async () => {
    const data = await crud.read(2);
    assert(data[0].toString() == "2");
    assert(data[1] == "agit");
  })

  it("should update user name", async () => {
    await crud.update(1, "Baran")
    const data = await crud.read(1);
    assert(data[1] === "Baran");
  })

})
