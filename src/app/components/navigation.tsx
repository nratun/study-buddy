import React from 'react';
import { NavLink } from 'react-router-dom';

function Navigate() {
  return (
    <div>
      <NavLink to="/page1">
        <button>Page 1</button>
      </NavLink>
      <NavLink to="/page2">
        <button>Page 2</button>
      </NavLink>
    </div>
  );
}

export default Navigate;