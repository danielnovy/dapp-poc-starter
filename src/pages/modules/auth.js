import { browserHistory } from 'react-router'
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

const getUserInfo = (address, wallet) => {
  return new Promise((resolve, reject) => {
    resolve({address, wallet});
  });
}

// ------------------------------------
// Async Action
// ------------------------------------
export const login = (evt) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      var reader = new FileReader();
      reader.onload = function() {
        try {
          let wallet = JSON.parse(reader.result);
          let address = wallet.ksData["m/0'/0'/0'"].addresses[0];
          resolve({address, wallet})
        } catch (Err) {
          reject();
        }
      };
      reader.readAsText(evt.target.files[0]);
      evt.target.value = ''; 
    }).then((data) => {
      return getUserInfo(data.address, data.wallet);
    }).then((data) => {
        dispatch({
          type: LOGIN, 
          payload: {
            wallet: data.wallet, 
            address: data.address,
            name: data.name,
            role: data.role,
            photoUrl: data.photoUrl
          }
        })
        browserHistory.push('/logged/role0');
    }).catch(() => {
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
    address: action.payload.address
  }),
  [LOGOUT] : (state, action) => ({
    wallet: null,
    address: null
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
