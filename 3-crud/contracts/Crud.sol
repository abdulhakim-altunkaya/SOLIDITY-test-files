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

    function remove(uint id) public {
        uint i = find(id);
        delete users[i];
    }
    function update(uint id, string memory _newName) public {
        uint i = find(id);
        users[i].name = _newName;
    }
    function read(uint id) public view returns(uint, string memory) {
        uint i = find(id);
        return(users[i].id, users[i].name);
    }
    
    function find(uint id) internal view returns(uint) {
        for(uint i = 0; i<users.length; i++) {
            if(users[i].id == id) {
                return i;
            } 
        }
        revert("user does not exist");
    }
}