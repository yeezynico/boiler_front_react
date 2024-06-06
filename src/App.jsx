import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { userAtom } from './atoms';
import {BrowserRouter, Routes, Route, Link,} from 'react-router-dom';
// import './tailwind.css';
import './App.scss';
import Cookies from 'js-cookie';
import SignUp from './pages/register';
import Login from './pages/login';
import LogoutLink from './components/logout';

function App() {
  const [user, setUser] = useAtom(userAtom);

  useEffect(() => {
  const token = Cookies.get('token');
  const userId = Cookies.get('id');

  if (token && userId) {
    setUser({
      email: "",
      id: userId,
      token: token,
      isLoggedIn: true,
    });
   }
  }, [setUser]);

  return (
    <BrowserRouter>
      <nav>
        <ul>
          {user.isLoggedIn? (
            <>
              <li> <Link to="/logout"> Se déconnecter </Link></li>
            </>
          ) : (
            <>
              <li> <Link to="/signup"> S'inscrire </Link></li>
              <li> <Link to="/login"> Se connecter </Link></li>
            </>
          )}
        </ul>
      </nav>

      <Routes>
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/logout" element={<LogoutLink/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
