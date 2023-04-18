import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import App, { loader as tokenLoader } from './App';
import Feed, { loader as postsLoader } from "./pages/Feed/Feed";
import Login, { action, action as loginAction } from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import SinglePost from "./pages/SinglePost";
import User from "./pages/User";
import Error from "./pages/Error";

function RootRouter() {
  const router = createBrowserRouter([{
    path: '/',
    element: <App />,
    errorElement: <Error />,
    id: 'root',
    // loader: tokenLoader,
    children: [
      {
        index: true,
        element: <Feed />,
        loader: postsLoader,
      },
      {
        path: '/auth',
        children: [
          {
            index: true,
            element: <Login />,
            action: loginAction
          },
          {
            path: 'signup',
            element: <Signup />
          },
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

  return <RouterProvider router={router} />;
}

export default RootRouter;