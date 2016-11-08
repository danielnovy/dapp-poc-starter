import React from 'react'

export const Denied = () => (
  <div>
    <h2>Permission denied</h2>
    <h4>You don't have permission to see this page</h4>
  </div>
)

export default {
  path: '/denied',
  component: Denied
}
