import React from 'react';
import Navbar from './Navbar';

// Component //

const Main = (props) => {
  return (
    <div>
    <Navbar />
      <div className="tempNav">
        {props.children}
      </div>
    </div>
  )
}

export default Main;
