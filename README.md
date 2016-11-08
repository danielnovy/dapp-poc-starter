# PoC dApp Starter

The idea of this project is to serve as boilerplate for building PoC that
retrieves user's roles stored in a registry on the blockchain and re-directs 
users to different pages depending on their roles. Users logs in to the system
using their lightwallet stored on a local disk.

It is based on the `react-redux-starter-kit` that can be found 
[here](https://github.com/davezuko/react-redux-starter-kit).

This project allows a user to sign in using a lightwallet stored on a local
file. The wallet is kept on the store so that it can be retrieved when sending
transactions.

Users are registered in a very simple registry, available on 
`/contracts/UserRegistry.sol`. Depending on the user's role, a different page
is shown after he logs in. In this way, we have a very basic system that can
identify the page that should be opened depending on user's role stored on
the blockchain.
