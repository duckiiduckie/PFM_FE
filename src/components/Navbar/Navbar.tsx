import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/useAuth";

interface Props {}

const Navbar = (props: Props) => {
  const { isLoggedIn, userName, logout } = useAuth();
  return (
    <nav className="bg-yellow-100 shadow-md py-4">
      <div className="container mx-auto flex items-center justify-between px-6">
        <div className="flex items-center space-x-8">
          <Link to="/" className="text-2xl font-bold text-yellow-500">
            Duckie
          </Link>
        </div>
        <div className="hidden lg:flex items-center space-x-6">
          {isLoggedIn() ? (
            <>
              <span className="text-gray-700">Welcome, {userName}</span>
              <button
                onClick={logout}
                className="px-4 py-2 bg-yellow-500 text-white font-semibold rounded hover:bg-yellow-400 transition duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-700 hover:text-yellow-500 transition duration-200">
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-yellow-500 text-white font-semibold rounded hover:bg-yellow-400 transition duration-200"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
