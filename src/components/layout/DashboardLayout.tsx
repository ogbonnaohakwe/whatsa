import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Bot, 
  Send, 
  FileText,
  Settings,
  LogOut,
  Puzzle
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { cn } from '../../lib/utils';

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ to, icon, label, isActive }) => (
  <Link
    to={to}
    className={cn(
      "flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors",
      isActive 
        ? "bg-primary-50 text-primary-700" 
        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
    )}
  >
    <span className="mr-3">{icon}</span>
    {label}
  </Link>
);

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const { logout } = useAuthStore();

  const navigation = [
    { to: '/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { to: '/contacts', icon: <Users size={20} />, label: 'Contacts' },
    { to: '/automations', icon: <Bot size={20} />, label: 'Automations' },
    { to: '/campaigns', icon: <Send size={20} />, label: 'Campaigns' },
    { to: '/lead-pages', icon: <FileText size={20} />, label: 'Lead Pages' },
    { to: '/integrations', icon: <Puzzle size={20} />, label: 'Integrations' },
    { to: '/settings', icon: <Settings size={20} />, label: 'Settings' },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64 border-r border-gray-200 bg-white">
          <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
            <div className="flex-shrink-0 px-4">
              <Link to="/dashboard" className="flex items-center">
                <Bot size={24} className="text-primary-500" />
                <span className="ml-2 text-xl font-semibold text-gray-900">
                  Autoresponder
                </span>
              </Link>
            </div>
            <nav className="mt-8 flex-1 px-2 space-y-1">
              {navigation.map((item) => (
                <SidebarLink
                  key={item.to}
                  {...item}
                  isActive={location.pathname === item.to}
                />
              ))}
            </nav>
            <div className="px-2 mt-auto">
              <button
                onClick={logout}
                className="flex items-center w-full px-4 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900"
              >
                <LogOut size={20} className="mr-3" />
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;