//SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.7;

contract CrudSimple {

    struct User {
        uint id;
        string name;
    }

    User[] public users;
    uint public nextId = 1;

    modifier checkNumber(uint i) {
        require(i>0, "Number must be > 0");
        require(i<= users.length, "user does not exist");
        _;
    }

    function create(string memory _name) public {
        users.push(User(nextId, _name));
        nextId++;
    }

    function read(uint i) public view checkNumber(i) returns(uint, string memory) {
        User memory myUser = users[i-1];
        return (myUser.id, myUser.name);
    }

    function remove(uint i) public checkNumber(i) { 
        delete users[i-1];
    }

    function update(uint i, string memory _newName) public checkNumber(i) {
        users[i-1].name = _newName;
    }
    
}