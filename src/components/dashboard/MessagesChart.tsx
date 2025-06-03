import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface MessagesChartProps {
  data: Array<{
    name: string;
    sent: number;
    delivered: number;
    read: number;
  }>;
}

const MessagesChart: React.FC<MessagesChartProps> = ({ data }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Message Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sent" name="Sent" fill="#075E54" />
              <Bar dataKey="delivered" name="Delivered" fill="#25D366" />
              <Bar dataKey="read" name="Read" fill="#4ade80" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default MessagesChart;