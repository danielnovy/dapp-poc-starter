import React from 'react'
import { connect } from 'react-redux'

const LoggedInRole0 = (props) => (
  <div style={{ margin: '0 auto' }} >
    <h2>Page style 1</h2>
    <h4>address: {props.address}</h4>
    <h4>name: {props.name}</h4>
    <h4>role: {props.role}</h4>
    <h4>photo: <img src={props.photoUrl}/></h4>
  </div>
)

const mapDispatchToProps = {
  //increment : () => increment(1),
  //doubleAsync
}

const mapStateToProps = (state) => {
  return {
    address: state.auth.address,
    name: state.auth.name,
    role: state.auth.role,
    photoUrl: state.auth.photoUrl
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoggedInRole0)
