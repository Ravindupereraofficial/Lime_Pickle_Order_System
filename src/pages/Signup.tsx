import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';


interface SignupProps {
  onSuccess?: () => void;
}

const Signup: React.FC<SignupProps> = ({ onSuccess }) => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    const { email, password, full_name, whatsapp_number } = data;
    // Check if user already exists
    const { data: existing, error: checkError } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .limit(1);
    if (checkError) {
      alert('Signup failed. Please try again.');
      return;
    }
    if (existing && existing.length > 0) {
      alert('Email already registered. Please login.');
      return;
    }
    // Insert new user
    const { error } = await supabase
      .from('users')
      .insert({
        full_name,
        whatsapp_number,
        email,
        password
      });
    if (error) {
      alert('Signup failed. Please try again.');
    } else {
      alert('Signup successful! You can now login.');
      if (onSuccess) onSuccess();
      else navigate('/login');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded shadow-md w-full max-w-md space-y-6">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      <div>
        <label>Full Name</label>
        <input {...register('full_name', { required: true })} className="w-full border p-2 rounded" />
        {errors.full_name && <span className="text-red-500 text-sm">Full name is required</span>}
      </div>
      <div>
        <label>WhatsApp Number</label>
        <input {...register('whatsapp_number', { required: true })} className="w-full border p-2 rounded" />
        {errors.whatsapp_number && <span className="text-red-500 text-sm">WhatsApp number is required</span>}
      </div>
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
      <button type="submit" disabled={isSubmitting} className="w-full bg-lime-500 text-white py-2 rounded font-bold">Sign Up</button>
    </form>
  );
};

export default Signup;
