import { browserHistory } from 'react-router'
import { getUserInfo } from '../blockchain/UserRegistry'

// ------------------------------------
// Constants
// ------------------------------------
export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'

export function logout () {
  return {
    type: LOGOUT
  }
}

// ------------------------------------
// Async Action
// ------------------------------------
export const login = (evt) => {
  return (dispatch, getState) => {
    let wallet = {}, address = '';
    return new Promise((resolve, reject) => {
      var reader = new FileReader();
      reader.onload = function() {
        try {
          let wallet = JSON.parse(reader.result);
          let address = '0x' + wallet.ksData["m/0'/0'/0'"].addresses[0];
          resolve({address, wallet})
        } catch (Err) {
          console.log(Err);
          reject();
        }
      };
      reader.readAsText(evt.target.files[0]);
      evt.target.value = ''; 
    }).then((data) => {
      wallet = data.wallet
      address = data.address
      return getUserInfo(data.address);
    }).then((data) => {
        console.log(JSON.stringify(data));
        dispatch({
          type: LOGIN, 
          payload: {
            wallet,
            address,
            ...data
          }
        })
        browserHistory.push(data.targetPage);
    }).catch((Err) => {
        console.log(Err);
        browserHistory.push('/invalidWallet');
    });
  }
}

export const actions = {
  login,
  logout
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = ({
  [LOGIN] : (state, action) => ({
    wallet: action.payload.wallet,
    address: action.payload.address,
    name: action.payload.name,
    role: action.payload.role,
    photoUrl: action.payload.photoUrl
  }),
  [LOGOUT] : (state, action) => ({
    wallet: null,
    address: null,
    name: null,
    role: null,
    photoUrl: null
  })
})

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {}
export default function authReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
