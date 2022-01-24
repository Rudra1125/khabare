import React, { Component } from 'react';
import logo from './1.png';
export class Logo extends Component {
  render() {
    return <div>
        <img  style={{width:"8rem",height:'2rem'}} src={logo} alt="logo" />
    </div>;
  }
}

export default Logo;