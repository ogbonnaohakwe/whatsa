import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { MessageSquare, Home } from 'lucide-react';
import { motion } from 'framer-motion';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6 flex justify-center"
        >
          <MessageSquare size={80} className="text-primary-300" />
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl font-bold text-gray-900 mb-2"
        >
          404
        </motion.h1>
        
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-2xl font-semibold text-gray-800 mb-4"
        >
          Page Not Found
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-gray-600 mb-8"
        >
          Sorry, we couldn't find the page you're looking for. The page might have been moved or deleted.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            as={Link}
            to="/"
            variant="primary"
            leftIcon={<Home size={18} />}
          >
            Back to Home
          </Button>
          <Button
            as={Link}
            to="/dashboard"
            variant="outline"
          >
            Go to Dashboard
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFoundPage;