import React from 'react';
import Button from './Button';
import { Database, CheckCircle } from 'lucide-react';

interface ConnectSupabaseButtonProps {
  onConnect: (url: string, key: string) => Promise<boolean>;
  isConnected: boolean;
}

const ConnectSupabaseButton: React.FC<ConnectSupabaseButtonProps> = ({ 
  isConnected 
}) => {
  if (isConnected) {
    return (
      <div className="flex items-center text-success-600">
        <CheckCircle size={16} className="mr-2" />
        <span className="text-sm font-medium">Connected to Database</span>
      </div>
    );
  }

  return (
    <div>
      <Button
        variant="outline"
        leftIcon={<Database size={16} />}
      >
        Connect to Database
      </Button>
    </div>
  );
};

export default ConnectSupabaseButton;