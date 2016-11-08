import React from 'react'
import { IndexLink, Link, browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { login as loginAction , logout as logoutAction} from '../../modules/auth'

let input = null

const Header = (props) => (
    <div>
      <input 
        type='file' 
        style={{display: 'none'}}
        ref={i=>input=i} 
        onChange={props.login}
      />

      <IndexLink to='/' activeClassName='route--active'>
        Home
      </IndexLink>

      {' · '}
      <Link to='/simple' activeClassName='route--active'>
        Simple
      </Link>

      {console.log('addr: ' + props.address)}
      {props.wallet ? 
        <span>
          {' . '}<Link onClick={props.logout} activeClassName='route--active'>Logout</Link>
          {' '}Logged with {props.address}
        </span>
        :
        <span>
          {' . '}<Link onClick={()=>input.click()} activeClassName='route--active'>Login</Link>
        </span>
      }
    </div>
)

const mapStateToProps = (state) => {
  return {
    address : state.auth.address,
    wallet : state.auth.wallet
  };
}

const mapDispatchToProps = ({
  login: loginAction,
  logout: () => {
    browserHistory.push('/');
    return logoutAction();
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);
