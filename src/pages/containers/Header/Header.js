import React from 'react'
import { IndexLink, Link, browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { login as loginAction , logout as logoutAction} from '../../modules/auth'

import './Header.scss'

let input = null

const Header = (props) => (
    <div>
    <div className='header header-menu'>
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

      {props.wallet ? 
        <span>{' . '}
        <Link to='/logged/item' activeClassName='route--active'>
          LoggedPage
        </Link>
        </span>
        :null}

    </div>
    <div className='header header-login'>
      {!props.wallet ? 
        <div className='header-not-logged'>
          <Link onClick={()=>input.click()} activeClassName='route--active'>Login</Link>
        </div>
        :
        <div className='header-logged'>
          <table className='logged-table'><tbody>
            <tr>
              <td>{props.name}</td>
              <td rowSpan='3'><img className='photo' src={props.photoUrl}/></td>
            </tr>
            <tr>
              <td>{props.address}</td>
            </tr>
            <tr>
              <td><Link onClick={props.logout} activeClassName='route--active'>Logout</Link></td>
            </tr>
          </tbody></table>
        </div>
      }
    </div>
    </div>
)

const transformAddress = (address) => {
  if (!address) return null;
  let pre = address.substring(0,10);
  let pos = address.substring(address.length - 5);
  return pre + '...' + pos;
}

const mapStateToProps = (state) => {
  return {
    wallet: state.auth.wallet,
    address: transformAddress(state.auth.address),
    name: state.auth.name,
    role: state.auth.role,
    photoUrl: state.auth.photoUrl
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
