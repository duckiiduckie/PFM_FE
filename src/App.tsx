import { Outlet } from 'react-router';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { ToastContainer } from 'react-toastify';
import { UserProvider } from './contexts/useAuth';
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
