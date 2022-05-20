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
}