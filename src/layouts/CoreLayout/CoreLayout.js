import React from 'react'
import { IndexLink, Link } from 'react-router'
import { connect } from 'react-redux'
import { login as loginDispatch } from '../../store/login'
import './CoreLayout.scss'
import '../../styles/core.scss'

let input = null

const CoreLayout = ({ children, login, wallet, address }) => (
  <div className='container text-center'>
    <div>
      <input 
        type='file' 
        style={{display: 'none'}}
        ref={i=>input=i} 
        onChange={login}
      />

      <IndexLink to='/' activeClassName='route--active'>
        Home
      </IndexLink>

      {' · '}
      <Link to='/counter' activeClassName='route--active'>
        Counter
      </Link>

      {console.log('addr: ' + address)}
      {wallet ? 
        <span>{' . '}Logged as {address}</span>
        :
        <span>{' . '}<Link onClick={()=>input.click()}>Login</Link></span>
      }

    </div>
    <div className='core-layout__viewport'>
      {children}
    </div>
  </div>
)

const mapStateToProps = (state) => {
  //console.log('state=' + JSON.stringify(state));
  console.log('mapStateToProps called');
  return {
    address : state.address,
    wallet : state.wallet
  };
}

//const mapDispatchToProps = (dispatch) => {
const mapDispatchToProps = {
  login: loginDispatch
  /*
  return {
    login: (evt) => {
      console.log('WILL DISPATCH!');
      dispatch({type: 'LOGIN', payload: {wallet: {x:'xx'}, address: 'adr'}});
    }
  }
  */
}

export default connect(mapStateToProps, mapDispatchToProps)(CoreLayout);
