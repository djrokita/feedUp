import { ReactNode, PropsWithChildren } from 'react';

import './Layout.css';

type LayoutProps = {
  header: ReactNode;
  // mobileNav: ReactNode;
  children: ReactNode;
} & PropsWithChildren

const Layout = (props: LayoutProps) => (
  <>
    <header className="main-header">{props.header}</header>
    {/* {props.mobileNav} */}
    <main className="content">{props.children}</main>
  </>
);

export default Layout;
