import React, { useState, Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import LandingPage from './components/LandingPage/LandingPage';
import SecretsPage from './components/SecretsPage/SecretsPage';
import ResetPassword from './components/ResetPassword/ResetPassword';
import Loader from './components/common/Loader/Loader';

const App = () => {
  const LoginRegister = lazy(() => import('./components/Login_Register/LoginRegister'));
  const NotFound = lazy(() => import('./components/NotFound/NotFound'));
  const PrivacyPolicy = lazy(() => import('./components/PrivacyPolicy/PrivacyPolicy'));
  const UserProfile = lazy(() => import('./components/UserProfile/UserProfile'));
  const About = lazy(() => import('./components/About/About'));

  const [showLogin, setShowLogin] = useState(false);
  const [loginStatusChange, setLoginStatusChange] = useState(false);
  const [popupType, setPopupType] = useState('login');

  const getRoutes = () => (
    <Routes>
      <Route path="/" element={<LandingPage setShowLogin={setShowLogin} setPopupType={setPopupType} />} />
      <Route
        path="/mysecrets"
        element={(
          <Suspense fallback={<Loader showLoader />}>
            <SecretsPage />
          </Suspense>
          )}
      />
      <Route
        path="/reset-password/*"
        element={(
          <Suspense fallback={<Loader showLoader />}>
            <ResetPassword />
          </Suspense>
        )}
      />
      <Route
        path="/privacypolicy"
        element={(
          <Suspense fallback={<Loader showLoader />}>
            <PrivacyPolicy />
          </Suspense>
        )}
      />
      <Route
        path="/about"
        element={(
          <Suspense fallback={<Loader showLoader />}>
            <About />
          </Suspense>
        )}
      />
      <Route
        path="/userprofile"
        element={(
          <Suspense fallback={<Loader showLoader />}>
            <UserProfile />
          </Suspense>
        )}
      />
      <Route
        path="*"
        element={(
          <Suspense fallback={<Loader showLoader />}>
            <NotFound />
          </Suspense>
        )}
      />
    </Routes>
  );

  return (
    <div className="main-content">
      <Header setShowLogin={setShowLogin} loginStatusChange={loginStatusChange} />
      <div className="container">
        {
          showLogin
            ? (
              <Suspense fallback={<Loader showLoader />}>
                <LoginRegister
                  setShowLogin={setShowLogin}
                  setLoginStatusChange={setLoginStatusChange}
                  popupType={popupType}
                  setPopupType={setPopupType}
                />
              </Suspense>
            )
            : <div />
        }
        {getRoutes()}
      </div>
      <Footer />
    </div>
  );
};

export default App;
