import {useState} from 'react';
import Header from "./components/Header/Header";
import Footer from './components/Footer/Footer';
import LoginRegister from "./components/Login_Register/LoginRegister";
import LandingPage from './components/LandingPage/LandingPage';
import {Routes, Route} from 'react-router-dom';
import SecretsPage from './components/SecretsPage/SecretsPage';
import ResetPassword from './components/ResetPassword/ResetPassword';
import NotFound from './components/NotFound/NotFound';

function App() {

  const [showLogin, setShowLogin] = useState(false);
  const [loginStatusChange, setLoginStatusChange] = useState(false)

  return (
    <div className='main-content'>
      <Header setShowLogin={setShowLogin} loginStatusChange={loginStatusChange} />
      <div className="container">
        {
          showLogin
          ?
          <LoginRegister setShowLogin={setShowLogin} setLoginStatusChange={setLoginStatusChange}/>
          :
          <></>
        }
        <Routes>
          <Route path='/' element={<LandingPage />}></Route>
          <Route path='/mysecrets' element={<SecretsPage />}></Route>
          <Route path='/reset-password/*' element={<ResetPassword />}></Route>
          <Route path='*' element={<NotFound />}></Route>
        </Routes>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default App
