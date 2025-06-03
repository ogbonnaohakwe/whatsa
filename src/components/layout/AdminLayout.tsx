import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  CreditCard,
  Settings,
  Shield,
  BarChart2,
  LogOut,
  Bell
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

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const { logout } = useAuthStore();

  const navigation = [
    { to: '/admin', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { to: '/admin/users', icon: <Users size={20} />, label: 'Users' },
    { to: '/admin/subscriptions', icon: <CreditCard size={20} />, label: 'Subscriptions' },
    { to: '/admin/analytics', icon: <BarChart2 size={20} />, label: 'Analytics' },
    { to: '/admin/settings', icon: <Settings size={20} />, label: 'Settings' },
    { to: '/admin/security', icon: <Shield size={20} />, label: 'Security' },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64 border-r border-gray-200 bg-white">
          <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
            <div className="flex-shrink-0 px-4">
              <Link to="/admin" className="flex items-center">
                <Shield size={24} className="text-primary-500" />
                <span className="ml-2 text-xl font-semibold text-gray-900">
                  Admin Panel
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
        <header className="bg-white shadow-sm">
          <div className="flex justify-between items-center px-4 py-4">
            <div className="flex-1 flex justify-between">
              <div className="flex-1 flex items-center">
                <button className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100">
                  <span className="sr-only">Open sidebar</span>
                  <LayoutDashboard size={20} />
                </button>
              </div>
              <div className="ml-4 flex items-center md:ml-6">
                <button className="p-1 rounded-full text-gray-400 hover:text-gray-500">
                  <Bell size={20} />
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;