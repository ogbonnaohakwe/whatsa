import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { useAuthStore } from '../../store/authStore';
import { Lock, Mail, User, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const navigate = useNavigate();
  
  const { login, isLoading, error } = useAuthStore();

  // Demo user accounts
  const demoUsers = [
    {
      email: 'user@example.com',
      password: 'password',
      name: 'Regular User',
      role: 'user',
      description: 'Regular user account with sample data'
    },
    {
      email: 'admin@example.com',
      password: 'password',
      name: 'Admin User',
      role: 'admin',
      description: 'Admin account with full access'
    }
  ];

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};
    let isValid = true;

    if (!email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    if (!password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    const success = await login(email, password);
    if (success) {
      navigate('/dashboard');
    }
  };

  const handleDemoLogin = (demoUser: typeof demoUsers[0]) => {
    setEmail(demoUser.email);
    setPassword(demoUser.password);
    toast.success(`Demo credentials loaded for ${demoUser.name}`);
  };

  return (
    <div className="space-y-6">
      {/* Demo Accounts Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-blue-50 border border-blue-200 rounded-lg p-4"
      >
        <h3 className="text-sm font-semibold text-blue-900 mb-3 flex items-center">
          <User size={16} className="mr-2" />
          Demo Accounts - Click to Login
        </h3>
        <div className="space-y-2">
          {demoUsers.map((user, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              onClick={() => handleDemoLogin(user)}
              className="w-full text-left p-3 bg-white border border-blue-200 rounded-md hover:bg-blue-50 hover:border-blue-300 transition-colors group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-blue-900 group-hover:text-blue-700">
                    {user.name}
                    {user.role === 'admin' && (
                      <span className="ml-2 px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded-full">
                        Admin
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-blue-600">{user.email}</p>
                  <p className="text-xs text-blue-500 mt-1">{user.description}</p>
                </div>
                <div className="text-blue-400 group-hover:text-blue-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
        <p className="text-xs text-blue-600 mt-3">
          💡 Click any demo account above to auto-fill the login form
        </p>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-4">
          <Input
            id="email"
            type="email"
            label="Email"
            placeholder="name@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
            required
            leftIcon={<Mail className="h-5 w-5 text-gray-400" />}
          />
          
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              label="Password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              required
              leftIcon={<Lock className="h-5 w-5 text-gray-400" />}
            />
            <button
              type="button"
              className="absolute right-3 top-8 text-gray-400 hover:text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
              />
              <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>
            
            <a href="#" className="text-sm font-medium text-primary-600 hover:text-primary-500">
              Forgot password?
            </a>
          </div>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-md bg-error-50 p-3"
          >
            <p className="text-sm text-error-600">{error}</p>
          </motion.div>
        )}

        <Button 
          type="submit" 
          variant="primary" 
          fullWidth 
          size="lg"
          isLoading={isLoading}
        >
          Sign in
        </Button>

        <div className="text-center">
          <span className="text-sm text-gray-600">Don't have an account? </span>
          <a href="/register" className="text-sm font-medium text-primary-600 hover:text-primary-500">
            Create one now
          </a>
        </div>
      </form>

      {/* Demo Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-gray-50 border border-gray-200 rounded-lg p-4"
      >
        <h4 className="text-sm font-medium text-gray-700 mb-2">Demo Features:</h4>
        <ul className="text-xs text-gray-600 space-y-1">
          <li>• Pre-loaded sample contacts and conversations</li>
          <li>• Example automations and campaigns</li>
          <li>• Mock WhatsApp connection status</li>
          <li>• Sample analytics and reporting data</li>
          <li>• All features unlocked for testing</li>
        </ul>
      </motion.div>
    </div>
  );
};

export default LoginForm;