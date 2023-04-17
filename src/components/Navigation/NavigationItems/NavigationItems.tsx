// import { NavLink } from 'react-router-dom';

import './NavigationItems.css';

const navItems = [
  { id: 'feed', text: 'Feed', link: '/', auth: true },
  { id: 'login', text: 'Login', link: '/', auth: false },
  { id: 'signup', text: 'Signup', link: '/signup', auth: false }
];

type NavigationItemsProps = {
  isAuth: boolean;
  onLogout(): void;
  // mobile: boolean;
}

const NavigationItems = (props: NavigationItemsProps) => [
  ...navItems.filter(item => item.auth === props.isAuth).map(item => (
    <li
      key={item.id}
      // className={['navigation-item', props.mobile ? 'mobile' : ''].join(' ')}
      >
      {item.text}
      {/* <NavLink to={item.link} exact onClick={props.onChoose}>
        {item.text}
      </NavLink> */}
    </li>
  )),
  props.isAuth && (
    <li className="navigation-item" key="logout">
      <button onClick={props.onLogout}>Logout</button>
    </li>
  )
];

export default NavigationItems;
