import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import MainPage from './components/MainPage';
import UpdatePost from './components/UpdatePost';
import CreatePost from './components/CreatePost';
import OnePost from './components/OnePost';
// TODO: Figure out what this was for
// import SplashPage from './components/SplashPage';
import PageNotFound from './components/PageNotFound';
import MainCommunitiesPage from './components/MainCommunitiesPage';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        {/* <Route path='/' exact={true}>
          <SplashPage />
        </Route> */}
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <Route path='/' exact={true} >
          <MainPage />
        </Route>
        <Route path='/communities' exact={true} >
          <MainCommunitiesPage />
        </Route>
        <ProtectedRoute path='/posts/new' exact={true} >
          <CreatePost />
        </ProtectedRoute>
        <ProtectedRoute path='/posts/:postId/edit' exact={true} >
          <UpdatePost />
        </ProtectedRoute>
        <Route path='/posts/:postId' exact={true} >
          <OnePost />
        </Route>
        <ProtectedRoute path='/post' exact={true} >
          <OnePost />
        </ProtectedRoute>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute>
          <PageNotFound />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
