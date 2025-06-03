import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { useAuthStore } from '../../store/authStore';
import { Lock, Mail, User } from 'lucide-react';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string; confirmPassword?: string }>({});
  const navigate = useNavigate();
  
  const { register, isLoading, error } = useAuthStore();

  const validate = () => {
    const newErrors: { name?: string; email?: string; password?: string; confirmPassword?: string } = {};
    let isValid = true;

    if (!name) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

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

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
      isValid = false;
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    const success = await register(name, email, password);
    if (success) {
      navigate('/onboarding');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-4">
        <Input
          id="name"
          type="text"
          label="Full Name"
          placeholder="John Smith"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors.name}
          required
          leftIcon={<User className="h-5 w-5 text-gray-400" />}
        />
        
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
          helperText="Password must be at least 6 characters"
          required
          leftIcon={<Lock className="h-5 w-5 text-gray-400" />}
        />
        
        <Input
          id="confirmPassword"
          type="password"
          label="Confirm Password"
          placeholder="••••••••"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={errors.confirmPassword}
          required
          leftIcon={<Lock className="h-5 w-5 text-gray-400" />}
        />

        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="terms"
              type="checkbox"
              required
              className="h-4 w-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="terms" className="font-medium text-gray-700">
              I agree to the{' '}
              <a href="#" className="text-primary-600 hover:text-primary-500">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-primary-600 hover:text-primary-500">
                Privacy Policy
              </a>
            </label>
          </div>
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
        Create account
      </Button>

      <div className="text-center">
        <span className="text-sm text-gray-600">Already have an account? </span>
        <a href="/login" className="text-sm font-medium text-primary-600 hover:text-primary-500">
          Sign in
        </a>
      </div>
    </form>
  );
};

export default RegisterForm;