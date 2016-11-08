pragma solidity ^0.4.0;

contract UserRegistry {

  struct User {
    //uint8 role;
    string role;
    string name;
    string photoUrl;
  }

  mapping (address => User) public users;

  function register(address addr, string name, string role, string photoUrl) {
    users[addr].name = name;
    users[addr].role = role;
    users[addr].photoUrl = photoUrl;
  }

}
