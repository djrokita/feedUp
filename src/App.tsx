import { useLoaderData } from 'react-router-dom';


import Layout from './components/Layout/Layout';
// import Backdrop from './components/Backdrop/Backdrop';
import Toolbar from './components/Toolbar/Toolbar';
import MainNavigation from './components/Navigation/MainNavigation/MainNavigation';
// import MobileNavigation from './components/Navigation/MobileNavigation/MobileNavigation';
// import ErrorHandler from './components/ErrorHandler/ErrorHandler';
// import FeedPage from './pages/Feed/Feed';
// import SinglePostPage from './pages/Feed/SinglePost/SinglePost';
// import LoginPage from './pages/Auth/Login';
// import SignupPage from './pages/Auth/Signup';
import { Outlet } from 'react-router-dom';
import { checkIsAuth, retrieveToken } from './utils/auth';

function App() {
  // state = {
  //   showBackdrop: false,
  //   showMobileNav: false,
  //   isAuth: false,
  //   token: null,
  //   userId: null,
  //   authLoading: false,
  //   error: null
  // };
  const isAuth = useLoaderData();
  console.log("APP isAuth:", isAuth);

  // componentDidMount() {
  //   const token = localStorage.getItem('token');
  //   const expiryDate = localStorage.getItem('expiryDate');
  //   if (!token || !expiryDate) {
  //     return;
  //   }
  //   if (new Date(expiryDate) <= new Date()) {
  //     this.logoutHandler();
  //     return;
  //   }
  //   const userId = localStorage.getItem('userId');
  //   const remainingMilliseconds =
  //     new Date(expiryDate).getTime() - new Date().getTime();
  //   this.setState({ isAuth: true, token: token, userId: userId });
  //   // this.setAutoLogout(remainingMilliseconds);
  // }

  // backdropClickHandler = () => {
  //   this.setState({ showBackdrop: false, showMobileNav: false, error: null });
  // };

  // logoutHandler = () => {
  //   this.setState({ isAuth: false, token: null });
  //   localStorage.removeItem('token');
  //   localStorage.removeItem('expiryDate');
  //   localStorage.removeItem('userId');
  // };

  // loginHandler = (event, authData) => {
  //   event.preventDefault();
  //   this.setState({ authLoading: true });
  //   fetch('http://localhost:8080/auth/login', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       email: authData.email,
  //       password: authData.password
  //     })
  //   })
  //     .then(res => {
  //       if (res.status === 422) {
  //         throw new Error('Validation failed.');
  //       }
  //       if (res.status !== 200 && res.status !== 201) {
  //         console.log('Error!');
  //         throw new Error('Could not authenticate you!');
  //       }
  //       return res.json();
  //     })
  //     .then(resData => {
  //       console.log(resData);
  //       this.setState({
  //         isAuth: true,
  //         token: resData.token,
  //         authLoading: false,
  //         userId: resData.userId
  //       });
  //       localStorage.setItem('token', resData.token);
  //       localStorage.setItem('userId', resData.userId);
  //       const remainingMilliseconds = 60 * 60 * 1000;
  //       const expiryDate = new Date(
  //         new Date().getTime() + remainingMilliseconds
  //       );
  //       localStorage.setItem('expiryDate', expiryDate.toISOString());
  //       this.setAutoLogout(remainingMilliseconds);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //       this.setState({
  //         isAuth: false,
  //         authLoading: false,
  //         error: err
  //       });
  //     });
  // };

  // signupHandler = (event, authData) => {
  //   event.preventDefault();
  //   this.setState({ authLoading: true });
  //   fetch('http://localhost:8080/auth/signup', {
  //     method: 'PUT',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       email: authData.signupForm.email.value,
  //       password: authData.signupForm.password.value,
  //       name: authData.signupForm.name.value
  //     })
  //   })
  //     .then(res => {
  //       if (res.status === 422) {
  //         throw new Error(
  //           "Validation failed. Make sure the email address isn't used yet!"
  //         );
  //       }
  //       if (res.status !== 200 && res.status !== 201) {
  //         console.log('Error!');
  //         throw new Error('Creating a user failed!');
  //       }
  //       return res.json();
  //     })
  //     .then(resData => {
  //       console.log(resData);
  //       this.setState({ isAuth: false, authLoading: false });
  //       this.props.history.replace('/');
  //     })
  //     .catch(err => {
  //       console.log(err);
  //       this.setState({
  //         isAuth: false,
  //         authLoading: false,
  //         error: err
  //       });
  //     });
  // };

  // setAutoLogout = milliseconds => {
  //   setTimeout(() => {
  //     this.logoutHandler();
  //   }, milliseconds);
  // };

  // errorHandler = () => {
  //   this.setState({ error: null });
  // };


  return (
    <Layout
      header={<Toolbar>
        <MainNavigation
        // onOpenMobileNav={this.mobileNavHandler.bind(this, true)}
        />
      </Toolbar>}
    // mobileNav={<MobileNavigation
    //   open={this.state.showMobileNav}
    //   mobile
    //   onChooseItem={this.mobileNavHandler.bind(this, false)}
    //   onLogout={this.logoutHandler}
    //   isAuth={this.state.isAuth} />} 
    // children={undefined}        
    >
      {/* {routes} */}
      <Outlet />
    </Layout>
  );
}

// export default withRouter(App);
export default App;

export function loader({ request }) {
  console.log("🚀 ~ file: App.tsx:184 ~ loader ~ request:", request);
  return checkIsAuth();

  // return null;
}