import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import {
  FileText,
  Target,
  BarChart2,
  Rocket,
  Calendar,
  TrendingUp,
  Pause,
  Play,
  Edit3,
} from 'lucide-react';

const activeCampaigns = [
  {
    name: 'Spring Product Launch',
    owner: 'Marketing Squad',
    status: 'Running',
    reach: '84,230',
    conversion: '6.4%',
    nextEvent: 'Segment sync · 2 hours',
  },
  {
    name: 'Upsell Nurture Stream',
    owner: 'Lifecycle Team',
    status: 'Paused',
    reach: '12,980',
    conversion: '9.1%',
    nextEvent: 'Awaiting creative approval',
  },
];

const performanceHighlights = [
  { title: 'Average CTR', value: '12.7%', trend: '+2.4%' },
  { title: 'Message Open Rate', value: '68.1%', trend: '+5.1%' },
  { title: 'Revenue Influenced', value: '$182K', trend: '+11%' },
];

const AdminCampaignsPage: React.FC = () => {
  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
        <motion.h1
          className="text-2xl font-bold text-gray-900"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          Campaign Oversight
        </motion.h1>
        <motion.div
          className="flex gap-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button variant="outline" leftIcon={<Calendar size={16} />}>
            Schedule review
          </Button>
          <Button variant="primary" leftIcon={<Rocket size={16} />}>
            Launch campaign
          </Button>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {performanceHighlights.map((highlight) => (
          <Card key={highlight.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-full bg-primary-50 text-primary-600">
                  <Target size={20} />
                </div>
                <span className="text-sm font-medium text-success-600 flex items-center gap-1">
                  <TrendingUp size={16} />
                  {highlight.trend}
                </span>
              </div>
              <h3 className="text-3xl font-bold mt-4">{highlight.value}</h3>
              <p className="text-gray-600">{highlight.title}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <CardTitle>Active Campaigns</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" leftIcon={<BarChart2 size={16} />}>
                  Performance trends
                </Button>
                <Button variant="outline" leftIcon={<FileText size={16} />}>
                  Compliance report
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {activeCampaigns.map((campaign) => (
              <div key={campaign.name} className="border border-gray-200 rounded-xl p-5 hover:border-primary-200 transition-colors">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{campaign.name}</h3>
                    <p className="text-sm text-gray-500">
                      Owner: <span className="font-medium text-gray-700">{campaign.owner}</span>
                    </p>
                    <p className="text-xs text-gray-400">Next milestone: {campaign.nextEvent}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        campaign.status === 'Running'
                          ? 'bg-success-50 text-success-700'
                          : 'bg-warning-50 text-warning-700'
                      }`}
                    >
                      {campaign.status}
                    </span>
                    <div className="text-sm text-gray-600">
                      <p>Reach: {campaign.reach}</p>
                      <p>Conversion: {campaign.conversion}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" leftIcon={<Edit3 size={14} />}>
                      Edit
                    </Button>
                    {campaign.status === 'Running' ? (
                      <Button variant="outline" size="sm" leftIcon={<Pause size={14} />}>
                        Pause
                      </Button>
                    ) : (
                      <Button variant="primary" size="sm" leftIcon={<Play size={14} />}>
                        Resume
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Creative Approvals</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border border-gray-100 rounded-lg p-4">
              <p className="text-sm font-semibold text-gray-900">Promo Broadcast</p>
              <p className="text-xs text-gray-500">Awaiting legal review · 3 days remaining</p>
              <Button variant="outline" size="sm" className="mt-3" fullWidth>
                View creative
              </Button>
            </div>
            <div className="border border-gray-100 rounded-lg p-4">
              <p className="text-sm font-semibold text-gray-900">VIP Re-engagement</p>
              <p className="text-xs text-gray-500">Copy revision requested · due tomorrow</p>
              <Button variant="outline" size="sm" className="mt-3" fullWidth>
                Assign owner
              </Button>
            </div>
            <Button variant="outline" fullWidth>
              View approval queue
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminCampaignsPage;

