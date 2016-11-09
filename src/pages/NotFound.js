import React from 'react'

export const NotFound = () => (
  <div>
    <h2>Ops!</h2>
    <h4>404: Not found</h4>
  </div>
)

export default {
  path: '*',
  component: NotFound
}
