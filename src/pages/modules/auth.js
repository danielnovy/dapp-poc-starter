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

// ------------------------------------
// Async Action
// ------------------------------------
export const login = (evt) => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      var reader = new FileReader();
      reader.onload = function() {
        let wallet = JSON.parse(reader.result);
        let address = wallet.ksData["m/0'/0'/0'"].addresses[0];
        console.log('address=' + address);
        dispatch({type: LOGIN, payload: {wallet, address}})
        resolve()
      };  
      reader.readAsText(evt.target.files[0]);
      evt.target.value = ''; 
    }).then(() => {
      console.log('testando');
      browserHistory.push('/logged/role0');
    })
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
