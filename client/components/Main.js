import React from 'react';
import Navbar from './Navbar';

// Component //

const Main = (props) => {
  return (
    <div>
      <Navbar />
      {props.children}
    </div>
  )
}

export default Main;
