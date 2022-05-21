//SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.7;

contract Crud {

    struct User {
        uint id;
        string name;
    }

    User[] public users;
    uint public nextId = 1;

    function create(string memory _name) public {
        users.push(User(nextId, _name));
        nextId++;
    }

    function read(uint i) public view returns(uint, string memory) {
        User memory myUser = users[i-1];
        return (myUser.id, myUser.name);
    }

    function update(uint i, string memory _newName) public {
        find(i);
        users[i-1].name = _newName;
    }

    function find(uint id) internal view returns(uint) {
        for(uint i = 0; i<users.length; i++) {
            if(users[i].id == id) {
                return id;
            } 
        }
        revert("user does not exist");
    }

    function remove(uint i) public checkNumber(i) {
        delete users[i-1];
    }
    modifier checkNumber(uint i) {
        require(i>0, "Number must be > 0");
        require(i<= users.length, "doesnt exist");
        _;
    }
}