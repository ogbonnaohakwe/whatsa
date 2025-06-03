import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { useAuthStore } from '../../store/authStore';
import { Lock, Mail } from 'lucide-react';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const navigate = useNavigate();
  
  const { login, isLoading, error } = useAuthStore();

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

  return (
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
        
        <Input
          id="password"
          type="password"
          label="Password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          required
          leftIcon={<Lock className="h-5 w-5 text-gray-400" />}
        />

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
        <div className="rounded-md bg-error-50 p-3">
          <p className="text-sm text-error-600">{error}</p>
        </div>
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
  );
};

export default LoginForm;