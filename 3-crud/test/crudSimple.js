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
    assert(data.toString() === "4");
  })

  //struct variables in solidity are treated as array in javascript.
  //Thats why we have data[] down here.
  it("4--should read user name", async () => {
    const data = await crudSimple.read(2);
    assert(data[0].toString() == "2");
    assert(data[1] === "agit");
  })

  it("5--should update user name", async () => {
    await crudSimple.update(1, "Baran")
    const data = await crudSimple.read(1);
    assert(data[1] === "Baran");
  })

  it("6--should not update a non-existing user", async () => {
    try {
      await crudSimple.update(4, "siverek");
    } catch (error) {
      assert(error.message.includes("user does not exist"));
    }
  })

  it("7--should not update a non-existing user - EXTRA SECURITY MODE", async () => {
    try {
      await crudSimple.update(5, "kercos");
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

  it("8--should remove record's values and make them default", async () => {
    await crudSimple.remove(1);
    const data = await crudSimple.users(0); //Thats how you access an array inside contract file.
    assert(data[0].toString() === "0");
  })

  it("9--should remove the record's values and make them default 2", async () => {
    await crudSimple.remove(2);
    const data = await crudSimple.read(2);
    assert(data[0].toString() === "0");
  });



  it("10--should not remove a non-existing user", async () => {
    try {
      await crudSimple.remove(6); 
    } catch (error) {
      assert(error.message.includes("user does not exist"));
    }
  })



})
