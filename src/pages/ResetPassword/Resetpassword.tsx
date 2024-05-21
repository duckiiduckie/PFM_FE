import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { resetPasswordAPI } from '../../services/UserService';
import { toast } from 'react-toastify';

interface ResetPasswordDto {
  email: string;
  token: string;
  password: string;
}

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const ResetPassword: React.FC = () => {
  const query = useQuery();
  const navigate = useNavigate();
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const token = query.get('token') || '';
  const email = query.get('email') || '';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    const resetPasswordDto: ResetPasswordDto = {
      email,
      token,
      password,
    };

    try {
      await resetPasswordAPI(resetPasswordDto);
      setMessage('Your password has been successfully reset.');
      toast.success("Your password has been successfully reset!");
      navigate('/login');
    } catch (error) {
      setMessage('An error occurred, please try again.');
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Reset Password
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  New Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirm-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-lightGreen hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Reset Password
              </button>
            </form>
            {message && <p className="mt-2 text-center text-sm text-red-600">{message}</p>}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
