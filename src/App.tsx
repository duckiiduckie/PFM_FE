import { Outlet } from 'react-router';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { UserProvider } from './contexts/useAuth';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <UserProvider>
        <Navbar />
        <Outlet />
        <ToastContainer />
      </UserProvider>
    </>
  );
}

export default App;
