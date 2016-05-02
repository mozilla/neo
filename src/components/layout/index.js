import React from 'react';
import Nav from '../nav';
import { tools as Devtools } from '../../app/devtools';

import '!style!css!sass!./layout.scss';

export default function Layout({ children }) {
  return (
    <div>
      <Nav />
      <main id="content">{children}</main>
      <Devtools />
    </div>
  );
}

Layout.displayName = 'Layout';
