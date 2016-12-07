import React from 'react'
import Header from './containers/Header'
import './CoreLayout.scss'
import '../styles/core.scss'

let input = null

const CoreLayout = (props) => (
  <div className='core-layout_wrapper mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header'>

    <Header />
    <main className='core-layout--main mdl-layout__content'>
      <div className="mdl-grid ">
        <div className="mdl-cell mdl-cell--12-col">
          {props.children}
        </div>
      </div>
    </main>
  </div>
)

export default CoreLayout
