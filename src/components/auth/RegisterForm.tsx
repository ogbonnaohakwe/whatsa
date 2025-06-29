import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { useAuthStore } from '../../store/authStore';
import { Lock, Mail, User, Eye, EyeOff, Info } from 'lucide-react';
import { motion } from 'framer-motion';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-blue-50 border border-blue-200 rounded-lg p-4"
      >
        <h3 className="text-sm font-semibold text-blue-900 mb-2 flex items-center">
          <Info size={16} className="mr-2" />
          Account Creation
        </h3>
        <p className="text-sm text-blue-700 mb-2">
          Create your account to access all features of the WhatsApp Autoresponder platform.
        </p>
      </motion.div>

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
          
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              label="Password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              helperText="Password must be at least 6 characters"
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
          
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              label="Confirm Password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={errors.confirmPassword}
              required
              leftIcon={<Lock className="h-5 w-5 text-gray-400" />}
            />
            <button
              type="button"
              className="absolute right-3 top-8 text-gray-400 hover:text-gray-600"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

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
                <a href="/terms" className="text-primary-600 hover:text-primary-500">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="/privacy" className="text-primary-600 hover:text-primary-500">
                  Privacy Policy
                </a>
              </label>
            </div>
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
          Create account
        </Button>

        <div className="text-center">
          <span className="text-sm text-gray-600">Already have an account? </span>
          <a href="/login" className="text-sm font-medium text-primary-600 hover:text-primary-500">
            Sign in
          </a>
        </div>
      </form>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-gray-50 border border-gray-200 rounded-lg p-4"
      >
        <h4 className="text-sm font-medium text-gray-700 mb-2">What you'll get:</h4>
        <ul className="text-xs text-gray-600 space-y-1">
          <li>• Complete WhatsApp automation platform</li>
          <li>• Contact management and grouping</li>
          <li>• Campaign creation and scheduling</li>
          <li>• Lead page builder with templates</li>
          <li>• Analytics and reporting dashboard</li>
          <li>• Integration with popular tools</li>
        </ul>
      </motion.div>
    </div>
  );
};

export default RegisterForm;