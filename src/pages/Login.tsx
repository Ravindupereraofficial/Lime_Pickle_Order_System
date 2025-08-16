import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface LoginFormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormData>();
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Get the intended destination from location state
  const from = location.state?.from?.pathname || '/';

  const onSubmit = async (data: LoginFormData) => {
    try {
      setMessage(null);
      
      const result = await login(data.email, data.password);
      
      if (result.success) {
        setMessage({ type: 'success', text: 'Login successful! Redirecting...' });
        // Redirect to the intended destination or home page
        setTimeout(() => {
          navigate(from, { replace: true });
        }, 1000);
      } else {
        setMessage({ type: 'error', text: result.message });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An unexpected error occurred. Please try again.' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-50 to-orange-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
          <p className="text-gray-600">Sign in to your account to continue</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-2xl shadow-2xl space-y-6">
          {/* Message Display */}
          {message && (
            <div className={`p-4 rounded-lg ${
              message.type === 'success' 
                ? 'bg-green-100 text-green-700 border border-green-200' 
                : 'bg-red-100 text-red-700 border border-red-200'
            }`}>
              {message.text}
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email *
            </label>
            <input 
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Please enter a valid email address'
                }
              })} 
              type="email" 
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-lime-100 focus:border-lime-500 transition-all duration-200"
              placeholder="Enter your email address"
            />
            {errors.email && (
              <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password *
            </label>
            <input 
              {...register('password', { required: 'Password is required' })} 
              type="password" 
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-lime-100 focus:border-lime-500 transition-all duration-200"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting} 
            className="w-full bg-gradient-to-r from-lime-500 to-orange-500 text-white py-3 px-6 rounded-xl font-bold text-lg hover:from-lime-600 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
          >
            {isSubmitting ? 'Signing In...' : 'Sign In'}
          </button>

          <div className="text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="text-lime-600 hover:text-lime-700 font-semibold">
                Sign up here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
