const { expect } = require("chai");
const { ethers } = require("hardhat");


describe("deployment with beforeEach", () => {
    let crud;

    beforeEach("deploy contract", async () => {
        const Crud = await ethers.getContractFactory("Crud");
        crud = await Crud.deploy();
    })

    it("should return string value", async () => {
        expect(await crud.name()).to.equal("bla bla");
    })

})

