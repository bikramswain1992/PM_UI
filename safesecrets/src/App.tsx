import {useState, Suspense, lazy} from 'react';
import Header from "./components/Header/Header";
import Footer from './components/Footer/Footer';
// import LoginRegister from "./components/Login_Register/LoginRegister";
import LandingPage from './components/LandingPage/LandingPage';
import {Routes, Route} from 'react-router-dom';
import SecretsPage from './components/SecretsPage/SecretsPage';
import ResetPassword from './components/ResetPassword/ResetPassword';
// import NotFound from './components/NotFound/NotFound';

function App() {

  const LoginRegister = lazy(() => import("./components/Login_Register/LoginRegister"));
  const NotFound = lazy(() => import("./components/NotFound/NotFound"));

  const [showLogin, setShowLogin] = useState(false);
  const [loginStatusChange, setLoginStatusChange] = useState(false);

  return (
    <div className='main-content'>
      <Header setShowLogin={setShowLogin} loginStatusChange={loginStatusChange} />
      <div className="container">
        {
          showLogin
          ?
          <Suspense fallback={<>Loading...</>} >
            <LoginRegister setShowLogin={setShowLogin} setLoginStatusChange={setLoginStatusChange}/>
          </Suspense>
          :
          <></>
        }
        <Routes>
          <Route path='/' element={<LandingPage />}></Route>
          <Route path='/mysecrets' 
            element={
              <Suspense fallback={<>Loading...</>}>
                <SecretsPage />
              </Suspense>
            }></Route>
          <Route path='/reset-password/*' 
            element={
            <Suspense fallback={<>Loading...</>}>
              <ResetPassword />
            </Suspense>
          }></Route>
          <Route path='*' 
            element={
            <Suspense fallback={<>Loading...</>}>
              <NotFound/>
            </Suspense>
          }></Route>
        </Routes>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default App
