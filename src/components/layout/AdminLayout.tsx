import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  CreditCard,
  Settings,
  Shield,
  BarChart2,
  LogOut,
  Bell,
  Menu,
  X,
  Database,
  Mail,
  Puzzle,
  Globe,
  MessageSquare,
  Bot,
  FileText,
  Activity,
  Zap,
  Server,
  Key,
  Webhook,
  UserCheck,
  AlertTriangle,
  HelpCircle
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  badge?: string;
  onClick?: () => void;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ to, icon, label, isActive, badge, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className={cn(
      "flex items-center justify-between px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 group",
      isActive 
        ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg" 
        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
    )}
  >
    <div className="flex items-center">
      <span className={cn(
        "mr-3 transition-transform duration-200",
        isActive ? "text-white" : "text-gray-400 group-hover:text-gray-600",
        "group-hover:scale-110"
      )}>
        {icon}
      </span>
      {label}
    </div>
    {badge && (
      <span className={cn(
        "px-2 py-1 text-xs rounded-full font-medium",
        isActive 
          ? "bg-white/20 text-white" 
          : "bg-red-100 text-red-600"
      )}>
        {badge}
      </span>
    )}
  </Link>
);

interface SidebarSectionProps {
  title: string;
  children: React.ReactNode;
}

const SidebarSection: React.FC<SidebarSectionProps> = ({ title, children }) => (
  <div className="mb-6">
    <h3 className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
      {title}
    </h3>
    <div className="space-y-1">
      {children}
    </div>
  </div>
);

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navigation = [
    // Overview
    {
      section: 'Overview',
      items: [
        { to: '/admin', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
        { to: '/admin/analytics', icon: <BarChart2 size={20} />, label: 'Analytics' },
        { to: '/admin/activity', icon: <Activity size={20} />, label: 'Activity Logs' },
      ]
    },
    // User Management
    {
      section: 'User Management',
      items: [
        { to: '/admin/users', icon: <Users size={20} />, label: 'Users', badge: '1,234' },
        { to: '/admin/subscriptions', icon: <CreditCard size={20} />, label: 'Subscriptions' },
        { to: '/admin/permissions', icon: <UserCheck size={20} />, label: 'Permissions' },
      ]
    },
    // Platform Management
    {
      section: 'Platform',
      items: [
        { to: '/admin/automations', icon: <Bot size={20} />, label: 'Automations' },
        { to: '/admin/messages', icon: <MessageSquare size={20} />, label: 'Messages' },
        { to: '/admin/campaigns', icon: <FileText size={20} />, label: 'Campaigns' },
        { to: '/admin/lead-pages', icon: <Globe size={20} />, label: 'Lead Pages' },
      ]
    },
    // System Settings
    {
      section: 'System',
      items: [
        { to: '/admin/integrations', icon: <Puzzle size={20} />, label: 'Integrations' },
        { to: '/admin/email-settings', icon: <Mail size={20} />, label: 'Email Settings' },
        { to: '/admin/webhooks', icon: <Webhook size={20} />, label: 'Webhooks' },
        { to: '/admin/api-keys', icon: <Key size={20} />, label: 'API Keys' },
        { to: '/admin/database', icon: <Database size={20} />, label: 'Database' },
        { to: '/admin/server', icon: <Server size={20} />, label: 'Server Status' },
      ]
    },
    // Security & Support
    {
      section: 'Security & Support',
      items: [
        { to: '/admin/security', icon: <Shield size={20} />, label: 'Security' },
        { to: '/admin/alerts', icon: <AlertTriangle size={20} />, label: 'Alerts', badge: '3' },
        { to: '/admin/support', icon: <HelpCircle size={20} />, label: 'Support' },
        { to: '/admin/settings', icon: <Settings size={20} />, label: 'Settings' },
      ]
    }
  ];

  const sidebarVariants = {
    open: { x: 0 },
    closed: { x: '-100%' }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        variants={sidebarVariants}
        animate={sidebarOpen ? 'open' : 'closed'}
        className="fixed inset-y-0 left-0 z-50 w-80 bg-white shadow-xl lg:static lg:translate-x-0 lg:shadow-none"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <Link to="/admin" className="flex items-center">
              <div className="p-2 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg">
                <Shield size={24} className="text-white" />
              </div>
              <div className="ml-3">
                <span className="text-xl font-bold text-gray-900">Admin Panel</span>
                <p className="text-sm text-gray-500">WhatsApp Autoresponder</p>
              </div>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              <X size={20} />
            </button>
          </div>

          {/* Admin User Info */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                {user?.profilePicture ? (
                  <img 
                    className="h-10 w-10 rounded-full object-cover" 
                    src={user.profilePicture} 
                    alt={user.name} 
                  />
                ) : (
                  <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold">
                    {user?.name.charAt(0)}
                  </div>
                )}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800 mt-1">
                  Super Admin
                </span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 overflow-y-auto">
            {navigation.map((section) => (
              <SidebarSection key={section.section} title={section.section}>
                {section.items.map((item) => (
                  <SidebarLink
                    key={item.to}
                    {...item}
                    isActive={location.pathname === item.to}
                    onClick={() => setSidebarOpen(false)}
                  />
                ))}
              </SidebarSection>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-3 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors"
            >
              <LogOut size={20} className="mr-3" />
              Sign out
            </button>
          </div>
        </div>
      </motion.div>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex justify-between items-center px-6 py-4">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              >
                <Menu size={20} />
              </button>
              <div className="ml-4 lg:ml-0">
                <h1 className="text-2xl font-semibold text-gray-900">
                  {navigation
                    .flatMap(section => section.items)
                    .find(item => item.to === location.pathname)?.label || 'Admin Dashboard'}
                </h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Quick Actions */}
              <button className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">
                <Zap size={20} />
              </button>
              
              {/* Notifications */}
              <div className="relative">
                <button className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">
                  <Bell size={20} />
                  <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-400"></span>
                </button>
              </div>

              {/* User Menu */}
              <div className="flex items-center">
                <div className="hidden md:block text-right mr-3">
                  <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-500">Administrator</p>
                </div>
                {user?.profilePicture ? (
                  <img 
                    className="h-8 w-8 rounded-full object-cover" 
                    src={user.profilePicture} 
                    alt={user.name} 
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-semibold">
                    {user?.name.charAt(0)}
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;