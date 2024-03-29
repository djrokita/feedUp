import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import RootLayout, { loader as authLoader } from "./pages/Root/Root";
import Feed, { loader as postsLoader } from "./pages/Feed/Feed";
import Login, { action as loginAction } from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import SinglePost, { loader as postLoader } from "./pages/SinglePost/SinglePost";
import User from "./pages/User";
import Error from "./pages/Error";
import Logout, { action as logoutAction } from "./pages/Logout/Logout";
import PostForm, { action as postAction } from "./pages/PostForm/PostForm";

function RootRouter() {
  const router = createBrowserRouter([{
    path: '/',
    element: <RootLayout />,
    errorElement: <Error />,
    id: 'root',
    loader: authLoader,
    children: [
      {
        index: true,
        element: <Feed />,
        loader: postsLoader,
        // action: postAction
      },
      {
        path: '/new',
        element: <PostForm />,
        action: postAction
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
        id: 'single-post',
        loader: postLoader,
        children: [
          {
            index: true,
            element: <SinglePost />,
          },
          {
            path: '/:postId/edit',
            element: <PostForm />,
            action: postAction
          }
        ]
      },
      {
        path: '/logout',
        element: <Logout />,
        action: logoutAction
      }
    ]
  }]);

  return <RouterProvider router={router} />;
}

export default RootRouter;