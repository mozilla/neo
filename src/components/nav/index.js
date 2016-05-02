import React from 'react';
import { Link } from 'react-router';
import routes from '../../routes';

export default function Nav() {
  return (
    <nav className="navbar navbar-full navbar-dark bg-inverse">
      <a className="navbar-brand" href="/">Project Name</a>
      <div className="nav navbar-nav">
        {routes.map(r => <Link className="nav-item nav-link" key={r.path} to={r.path}>{r.title}</Link>)}
      </div>
    </nav>
  );
}

Nav.displayName = 'Nav';

export default Nav;
