# PoC dApp Starter

The idea of this project is to serve as boilerplate for building 
blockchain based PoC projects. A very common requirement is the ability for
a user to login into the system using a lightwallet. Depending on the user's
role, a different profile page should be shown.

Users and roles are stored on a registry in the blockchain. The smart contract
`./contracts/UserRegistry.sol` is a very simple contract for storing this
info. Besides storing users and roles, it also stores user names and an url
(relative to this PoC) where a picture of the logged user should be found.

In future versions, this boilerplate can be integrated with uPort.

This project is based on the 
[react-redux-starter-kit](https://github.com/davezuko/react-redux-starter-kit)
but with a much simpler folder structure.

# Building

```
npm install
```

# Running
This project is shipped with webpack hot-reloading feature. For running on
development mode, run:
```
npm run dev
```
See other running modes in file `package.json`.

# How it works

to be written

# Adapting to your PoC


