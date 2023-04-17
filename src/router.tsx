import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import App from './App';
import Feed from "./pages/Feed";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SinglePost from "./pages/SinglePost";
import User from "./pages/User";
import Error from "./pages/Error";

function RootRouter() {
  const router = createBrowserRouter([{
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Feed />,
      },
      {
        path: '/auth',
        children: [
          {
            path: 'signup',
            element: <Signup />
          },
          {
            path: 'login',
            element: <Login />
          }
        ]
      },
      {
        path: '/user',
        element: <User />
      },
      {
        path: '/:postId',
        element: <SinglePost />
      }
    ]
  }]);

  return <RouterProvider router={router} />
}

export default RootRouter;