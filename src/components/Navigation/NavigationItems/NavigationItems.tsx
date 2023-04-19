import { NavLink, useRouteLoaderData } from 'react-router-dom';

import './NavigationItems.css';

const navItems = [
  { id: 'feed', text: 'Feed', link: '/', auth: true },
  { id: 'login', text: 'Login', link: '/', auth: false },
  { id: 'signup', text: 'Signup', link: '/signup', auth: false },
  { id: 'logout', text: 'Logout', link: '/logout', auth: true }
];

type NavigationItemsProps = {
  onLogout(): void;
  // mobile: boolean;
};

function NavigationItems(props: NavigationItemsProps) {
  const isAuth = useRouteLoaderData('root');

  return [
    ...navItems.filter(item => item.auth === isAuth).map(item => (
      <li
        key={item.id}
        // className={['navigation-item', props.mobile ? 'mobile' : ''].join(' ')}
        className='navigation-item'
      >
        <NavLink to={item.link}>
          {item.text}
        </NavLink>
      </li>
    )),
  ];
}

export default NavigationItems;
