import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { mockStatusUpdates } from '../../mock/mockData';
import { Image, Send, Clock, Trash, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { StatusUpdate } from '../../types';

const StatusUpdates: React.FC = () => {
  const [updates, setUpdates] = useState<StatusUpdate[]>(mockStatusUpdates);
  const [newStatus, setNewStatus] = useState('');

  const handlePost = () => {
    if (!newStatus.trim()) return;

    const newUpdate: StatusUpdate = {
      id: Date.now().toString(),
      content: newStatus,
      status: 'posted',
      createdAt: new Date(),
    };

    setUpdates([newUpdate, ...updates]);
    setNewStatus('');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>WhatsApp Status Updates</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-4">
            <Input
              placeholder="What's on your mind?"
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
            />
            <div className="flex gap-2">
              <Button variant="outline" leftIcon={<Image size={16} />}>
                Add Media
              </Button>
              <Button
                variant="primary"
                onClick={handlePost}
                disabled={!newStatus.trim()}
                leftIcon={<Send size={16} />}
              >
                Post Status
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {updates.map((update, index) => (
              <motion.div
                key={update.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="border rounded-lg p-4"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-sm font-medium">{update.content}</p>
                    {update.mediaUrl && (
                      <img
                        src={update.mediaUrl}
                        alt="Status"
                        className="mt-2 rounded-lg w-32 h-32 object-cover"
                      />
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-error-500"
                    leftIcon={<Trash size={16} />}
                  />
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock size={14} className="mr-1" />
                  {new Date(update.createdAt).toLocaleString()}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatusUpdates;