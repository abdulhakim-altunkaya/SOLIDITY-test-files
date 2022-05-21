const Crud = artifacts.require("Crud.sol");

contract("Crud", () => {
  let crud = null;

  before( async() => {
    crud = await Crud.new();
  })

  it("1--should create a new user", async () => {
    await crud.create("harro");
    const data = await crud.nextId();
    assert(data.toString() === "2");
  })

  it("2--should create a second user", async () => {
    await crud.create("agit");
    const data = await crud.nextId();
    assert(data.toString() === "3");
  })

  //struct variables in solidity are treated as array in javascript.
  //Thats why we have data[] down here.
  it("3--should read user name", async () => {
    const data = await crud.read(2);
    assert(data[0].toString() == "2");
    assert(data[1] == "agit");
  })

  it("4--should update user name", async () => {
    await crud.update(1, "Baran")
    const data = await crud.read(1);
    assert(data[1] === "Baran");
  })


  it("5--should not update a non-existing user", async () => {
    try {
      await crud.update(4, "siverek");
    } catch (error) {
      assert(error.message.includes("user does not exist"));
    }
  })

  it("6--should not update a non-existing user - EXTRA SECURITY MODE", async () => {
    try {
      await crud.update(5, "kercos");
    } catch (error) {
      assert(error.message.includes("user does not exist"));
      return; //I added return here. So that if the code reaches this line, it will execute the
      //assert line above and finish execution with return. Therefore it will not execute line below. It will pass.
    }
    //this line below is an extra caution. If there is a problem
    //with our smart contract, this try-catch can still pass. To prevent it:
    assert(false);
    //Now, the only possible way for this test block to pass it to stop 
    //at the assert code line of catch.
  })

  it("7--should remove record's values and make them default", async () => {
    await crud.remove(1);
    const data = await crud.users(0); //Thats how you access an array inside contract file.
    assert(data.id == 0);
  })

})
