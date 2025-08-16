import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';


interface LoginProps {
  onSuccess?: () => void;
}

const Login: React.FC<LoginProps> = ({ onSuccess }) => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    const { email, password } = data;
    // Query users table for matching email and password
    const { data: users, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .eq('password', password)
      .limit(1);
    if (error) {
      alert('Login failed. Please try again.');
    } else if (!users || users.length === 0) {
      alert('Invalid email or password.');
    } else {
      // Save user to localStorage
      localStorage.setItem('user', JSON.stringify(users[0]));
      if (onSuccess) onSuccess();
      else navigate('/');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded shadow-md w-full max-w-md space-y-6">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <div>
        <label>Email</label>
        <input {...register('email', { required: true })} type="email" className="w-full border p-2 rounded" />
        {errors.email && <span className="text-red-500 text-sm">Email is required</span>}
      </div>
      <div>
        <label>Password</label>
        <input {...register('password', { required: true })} type="password" className="w-full border p-2 rounded" />
        {errors.password && <span className="text-red-500 text-sm">Password is required</span>}
      </div>
      <button type="submit" disabled={isSubmitting} className="w-full bg-lime-500 text-white py-2 rounded font-bold">Login</button>
    </form>
  );
};

export default Login;
