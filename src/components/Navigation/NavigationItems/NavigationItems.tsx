import { Form, Link, NavLink, useRouteLoaderData } from 'react-router-dom';

import './NavigationItems.css';

const navItems = [
  { id: 'feed', text: 'Feed', link: '/', auth: true },
  { id: 'login', text: 'Login', link: '/', auth: false },
  { id: 'signup', text: 'Signup', link: '/signup', auth: false },
  { id: 'logout', text: 'Logout', link: '/logout', auth: true }
];

type NavigationItemsProps = {
  // mobile: boolean;
  text: string;
  link: string;
};

function NavigationItem(props: NavigationItemsProps) {

  return (
    <>
      <li
        // className={['navigation-item', props.mobile ? 'mobile' : ''].join(' ')}
        className='navigation-item'
      >
        <NavLink to={props.link}>
          {props.text}
        </NavLink>
      </li>
    </>
  );
}

export default NavigationItem;
