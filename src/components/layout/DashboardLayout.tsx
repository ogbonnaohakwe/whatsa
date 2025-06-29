import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Bot, 
  Send, 
  FileText,
  Settings,
  LogOut,
  Puzzle,
  Menu,
  X,
  Bell,
  Zap,
  MessageSquare,
  Key
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
  const navigate = useNavigate();
  const { logout, user } = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    { to: '/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { to: '/contacts', icon: <Users size={20} />, label: 'Contacts' },
    { to: '/automations', icon: <Bot size={20} />, label: 'Automations' },
    { to: '/campaigns', icon: <Send size={20} />, label: 'Campaigns' },
    { to: '/lead-pages', icon: <FileText size={20} />, label: 'Lead Pages' },
    { to: '/workflow', icon: <Zap size={20} />, label: 'Workflow Builder' },
    { to: '/integrations', icon: <Puzzle size={20} />, label: 'Integrations' },
    { to: '/api-gateway', icon: <Key size={20} />, label: 'API Gateway' },
    { to: '/settings', icon: <Settings size={20} />, label: 'Settings' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static lg:z-auto transition-transform duration-300 ease-in-out`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar header */}
          <div className="flex items-center justify-between px-4 py-5 border-b border-gray-200">
            <Link to="/dashboard" className="flex items-center">
              <MessageSquare size={24} className="text-primary-500" />
              <span className="ml-2 text-xl font-semibold text-gray-900">
                Autoresponder
              </span>
            </Link>
            <button
              className="lg:hidden text-gray-500 hover:text-gray-700"
              onClick={() => setSidebarOpen(false)}
            >
              <X size={20} />
            </button>
          </div>

          {/* User info */}
          <div className="px-4 py-4 border-b border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                {user?.profilePicture ? (
                  <img 
                    className="h-10 w-10 rounded-full object-cover" 
                    src={user.profilePicture} 
                    alt={user.name} 
                  />
                ) : (
                  <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-semibold">
                    {user?.name.charAt(0)}
                  </div>
                )}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 overflow-y-auto">
            <div className="space-y-1">
              {navigation.map((item) => (
                <SidebarLink
                  key={item.to}
                  {...item}
                  isActive={location.pathname === item.to}
                />
              ))}
            </div>
          </nav>

          {/* Sidebar footer */}
          <div className="px-4 py-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900"
            >
              <LogOut size={20} className="mr-3" />
              Sign out
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top header */}
        <header className="bg-white shadow-sm border-b border-gray-200 lg:hidden">
          <div className="flex justify-between items-center px-4 py-4">
            <button
              className="text-gray-500 hover:text-gray-700"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            <Link to="/dashboard" className="flex items-center">
              <MessageSquare size={24} className="text-primary-500" />
              <span className="ml-2 text-xl font-semibold text-gray-900">
                Autoresponder
              </span>
            </Link>
            <div className="flex items-center space-x-4">
              <button className="text-gray-500 hover:text-gray-700">
                <Bell size={20} />
              </button>
              <div>
                {user?.profilePicture ? (
                  <img 
                    className="h-8 w-8 rounded-full object-cover" 
                    src={user.profilePicture} 
                    alt={user.name} 
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-semibold">
                    {user?.name.charAt(0)}
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;