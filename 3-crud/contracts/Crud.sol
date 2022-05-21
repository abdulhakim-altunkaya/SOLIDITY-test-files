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
        users[i-1].name = _newName;
    }

    function remove(uint i) public {
        delete users[i-1];
    }
    /*
    function find(uint i) internal view returns(uint) {
        for(uint index = 1; index<users.length+1; index++) {
            if( users[index].id == i) {
                return users[index].id;
            } else {
                break;
            }

        }
    }
    */
}