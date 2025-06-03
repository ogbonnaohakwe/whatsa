import React from 'react';
import { Card, CardContent } from '../ui/Card';
import { Users, MessageSquare, Bot, LineChart, Phone } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  subtext?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon, trend, subtext }) => {
  return (
    <Card className="hover:shadow-elevation-2 transition-shadow duration-200">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
            
            {trend && (
              <p className={`text-sm mt-1 flex items-center ${
                trend.isPositive ? 'text-success-600' : 'text-error-600'
              }`}>
                <span className="inline-block mr-1">
                  {trend.isPositive ? '↑' : '↓'}
                </span>
                {trend.value}%
              </p>
            )}
            
            {subtext && <p className="text-sm text-gray-500 mt-1">{subtext}</p>}
          </div>
          <div className="p-3 rounded-full bg-primary-50">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface DashboardStatsProps {
  stats: {
    totalContacts: number;
    activeAutomations: number;
    messagesSent: {
      today: number;
      thisWeek: number;
      thisMonth: number;
    };
    responseRate: number;
    leadsCaptured: {
      today: number;
      thisWeek: number;
      thisMonth: number;
    };
  };
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatsCard
        title="Total Contacts"
        value={stats.totalContacts.toLocaleString()}
        icon={<Users size={24} className="text-primary-500" />}
        subtext="In your database"
      />
      
      <StatsCard
        title="Messages Sent Today"
        value={stats.messagesSent.today.toLocaleString()}
        icon={<MessageSquare size={24} className="text-primary-500" />}
        trend={{ value: 12, isPositive: true }}
        subtext={`${stats.messagesSent.thisWeek.toLocaleString()} this week`}
      />
      
      <StatsCard
        title="Active Automations"
        value={stats.activeAutomations}
        icon={<Bot size={24} className="text-primary-500" />}
      />
      
      <StatsCard
        title="Response Rate"
        value={`${stats.responseRate}%`}
        icon={<LineChart size={24} className="text-primary-500" />}
        trend={{ value: 3, isPositive: true }}
        subtext="Based on last 100 messages"
      />
      
      <StatsCard
        title="Leads Captured Today"
        value={stats.leadsCaptured.today.toLocaleString()}
        icon={<Phone size={24} className="text-primary-500" />}
        trend={{ value: 8, isPositive: true }}
        subtext={`${stats.leadsCaptured.thisWeek.toLocaleString()} this week`}
      />
    </div>
  );
};

export default DashboardStats;