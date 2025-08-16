import React, { useState } from 'react';
import Login from '../pages/Login';
import Signup from '../pages/Signup';

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  mode: 'login' | 'signup';
  setMode: (mode: 'login' | 'signup') => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ open, onClose, mode, setMode }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-2xl"
          onClick={onClose}
        >
          ×
        </button>
        <div className="mb-4 flex justify-center space-x-4">
          <button
            className={`px-4 py-2 rounded font-bold ${mode === 'login' ? 'bg-lime-500 text-white' : 'bg-gray-100 text-gray-700'}`}
            onClick={() => setMode('login')}
          >
            Login
          </button>
          <button
            className={`px-4 py-2 rounded font-bold ${mode === 'signup' ? 'bg-lime-500 text-white' : 'bg-gray-100 text-gray-700'}`}
            onClick={() => setMode('signup')}
          >
            Sign Up
          </button>
        </div>
        {mode === 'login' ? <Login onSuccess={onClose} /> : <Signup onSuccess={onClose} />}
      </div>
    </div>
  );
};

export default AuthModal;
