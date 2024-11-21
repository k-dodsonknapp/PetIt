import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import { authenticate } from "./store/session";
import MainPage from "./components/MainPage";
import UpdatePost from "./components/UpdatePost";
import CreatePost from "./components/CreatePost";
import OnePost from "./components/OnePost";
// TODO: Figure out what this was for
import SplashPage from './components/SplashPage';
import PageNotFound from "./components/PageNotFound";
import MainCommunitiesPage from "./components/MainCommunitiesPage";

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
      <Routes>
        {/* <Route path='/' exact={true}>
          <SplashPage />
        </Route> */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/sign-up" element={<SignUpForm />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/communities" element={<MainCommunitiesPage />} />
        <Route
          path="/posts/new"
          element={
            <ProtectedRoute>
              <CreatePost />
            </ProtectedRoute>
          }
        />
        <Route
          path="/posts/:postId/edit"
          element={
            <ProtectedRoute>
              <UpdatePost />
            </ProtectedRoute>
          }
        />
        <Route path="/posts/:postId" element={<OnePost />}></Route>
        <Route
          path="/post"
          element={
            <ProtectedRoute>
              <OnePost />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <UsersList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users/:userId"
          element={
            <ProtectedRoute>
              <User />
            </ProtectedRoute>
          }
        />
        <Route element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
