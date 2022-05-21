const CrudSimple = artifacts.require("CrudSimple.sol");

contract("CrudSimple", () => {
  let crudSimple = null;

  before( async() => {
    crudSimple = await CrudSimple.new();
  })

  it("1--should create a new user", async () => {
    await crudSimple.create("harro");
    const data = await crudSimple.nextId();
    assert(data.toString() === "2");
  })

  it("2--should create a second user", async () => {
    await crudSimple.create("agit");
    const data = await crudSimple.nextId();
    assert(data.toString() === "3");
  })

  it("3--should create a third user", async () => {
    await crudSimple.create("azad");
    const data = await crudSimple.nextId();
    assert(data.toString() == "4");
  })



})
