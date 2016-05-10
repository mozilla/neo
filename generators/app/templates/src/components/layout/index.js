import React from 'react';
import Nav from '../nav';

import './index.scss';

export default function Layout({ children }) {
  return (
    <div>
      <Nav />
      <main id="content">{children}</main>
    </div>
  );
}

Layout.displayName = 'Layout';
