import React from 'react'
import { IndexLink, Link, browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { login as loginAction , logout as logoutAction} from '../../modules/auth'

import './Header.scss'

let input = null

const Header = (props) => (

  <div className="header mdl-layout__drawer mdl-color--primary mdl-color-text--white">

    <div className="header--title mdl-color--primary-dark">
      dapp-poc-starter
    </div>

    {props.wallet ?
      <div className='header--user mdl-color--primary-dark'>
        <img className='header--user--picture' src={props.photoUrl}/>
        <div className="header--user-name">
          {props.name}
        </div>
        <div className="header--user-addrsss">
          {props.address}
        </div>

      </div>
     :null
    }

    <nav className="header--nav mdl-navigation mdl-color-text--white">

      <IndexLink className="mdl-navigation__link mdl-color-text--primary-contrast" to='/' activeClassName='route--active'>
        Home
      </IndexLink>

      <Link className="mdl-navigation__link mdl-color-text--primary-contrast" to='/simple' activeClassName='route--active'>
        Simple
      </Link>

      {!props.wallet ?
        <div>
          <input
              type='file'
              style={{display: 'none'}}
              ref={i=>input=i}
              onChange={props.login}
          />
          <Link className="mdl-navigation__link mdl-color-text--primary-contrast" onClick={()=>input.click()} activeClassName='route--active'>
            Login
          </Link>
        </div>
        :
        <div>
          <Link className="mdl-navigation__link mdl-color-text--primary-contrast" to='/logged/item' activeClassName='route--active'>
            Private Page
          </Link>
          <Link className="mdl-navigation__link mdl-color-text--primary-contrast" onClick={props.logout} activeClassName='route--active'>Logout</Link>
        </div>
      }
    </nav>

  </div>

)


const mapStateToProps = (state) => {
  return {
    wallet: state.auth.wallet,
    address: state.auth.address,
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
