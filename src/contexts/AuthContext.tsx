import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authUtils, User, AuthContextType } from '../lib/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for existing user session on app load
    const currentUser = authUtils.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const result = await authUtils.login(email, password);
    if (result.success && result.user) {
      setUser(result.user);
      setIsAuthenticated(true);
    }
    return result;
  };

  const signup = async (userData: { email: string; password: string }) => {
    return await authUtils.signup(userData);
  };

  const logout = () => {
    authUtils.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  const value: AuthContextType = {
    user,
    login,
    signup,
    logout,
    isAuthenticated
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
