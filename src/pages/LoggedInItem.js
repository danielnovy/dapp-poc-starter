import React from 'react'
import { browserHistory } from 'react-router'

export const LoggedInItem = () => (
  <div>
    <h2>Page for logged users</h2>
    <h4>This page is only available for logged in users</h4>
  </div>
)

export default (store) => ({
  path: '/logged/item',
  onEnter: () => {
    if (!store.getState().auth.wallet) {
      browserHistory.push('/denied');
    }
  },
  component: LoggedInItem
})
