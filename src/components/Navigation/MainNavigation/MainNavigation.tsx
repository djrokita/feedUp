import { NavLink, useRouteLoaderData } from 'react-router-dom';

// import MobileToggle from '../MobileToggle/MobileToggle';
import Logo from '../../Logo/Logo';
import NavigationItem from '../NavigationItems/NavigationItems';

import './MainNavigation.css';

const navItems = [
  { id: 'feed', text: 'Feed', link: '/', auth: true },
  { id: 'login', text: 'Login', link: '/', auth: false },
  { id: 'signup', text: 'Signup', link: '/signup', auth: false },
  { id: 'logout', text: 'Logout', link: '/logout', auth: true }
];


type MainNavigationProps = {
  // isAuth: boolean;
};

const MainNavigation = (props: MainNavigationProps) => {
  const token = useRouteLoaderData('root');

  const renderNavItems = navItems.filter(item => !!token === item.auth).map(item => <NavigationItem key={item.id} {...item} />);

  return (
    <nav className="main-nav">
      {/* <MobileToggle onOpen={props.onOpenMobileNav} /> */}
      <div className="main-nav__logo">
        <NavLink to="/">
          <Logo />
        </NavLink>
      </div>
      <div className="spacer" />
      <ul className="main-nav__items">
        {renderNavItems};
      </ul>
    </nav>
  );
};

export default MainNavigation;
