import { ReactNode } from 'react';

import './Layout.css';

type LayoutProps = {
  header: ReactNode;
  mobileNav: ReactNode;
  children: ReactNode;

}

const Layout = (props: LayoutProps) => (
  <>
    <header className="main-header">{props.header}</header>
    {props.mobileNav}
    <main className="content">{props.children}</main>
  </>
);

export default Layout;
