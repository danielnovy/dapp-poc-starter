import React from 'react'
import Header from './containers/Header'
import './CoreLayout.scss'
import '../styles/core.scss'

let input = null

const CoreLayout = (props) => (
  <div className='container text-center'>
    <Header />
    <div className='core-layout__viewport'>
      {props.children}
    </div>
  </div>
)

export default CoreLayout
