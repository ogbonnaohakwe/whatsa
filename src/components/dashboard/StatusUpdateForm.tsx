import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { Image, Send, Clock, X, Upload, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const StatusUpdateForm: React.FC = () => {
  const [content, setContent] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');
  const [scheduledFor, setScheduledFor] = useState('');
  const [isPreview, setIsPreview] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim()) {
      toast.error('Please enter a status message');
      return;
    }

    try {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success('Status updated successfully!');
      setContent('');
      setMediaUrl('');
      setScheduledFor('');
    } catch (error) {
      toast.error('Failed to update status');
    } finally {
      setIsLoading(false);
    }
  };

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, upload to storage and get URL
      const fakeUrl = URL.createObjectURL(file);
      setMediaUrl(fakeUrl);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Update WhatsApp Status</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status Message
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
              rows={4}
              placeholder="What's on your mind?"
            />
            <p className="text-sm text-gray-500 mt-1">
              {content.length}/700 characters
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Media
            </label>
            {mediaUrl ? (
              <div className="relative">
                <img
                  src={mediaUrl}
                  alt="Status preview"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => setMediaUrl('')}
                  className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleMediaUpload}
                  className="hidden"
                  id="media-upload"
                />
                <label
                  htmlFor="media-upload"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <Upload size={24} className="text-gray-400 mb-2" />
                  <span className="text-sm text-gray-600">
                    Click to upload image or video
                  </span>
                </label>
              </div>
            )}
          </div>

          <div>
            <Input
              type="datetime-local"
              label="Schedule for (optional)"
              value={scheduledFor}
              onChange={(e) => setScheduledFor(e.target.value)}
              min={new Date().toISOString().slice(0, 16)}
              leftIcon={<Clock size={16} />}
            />
          </div>

          <div className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsPreview(!isPreview)}
              leftIcon={<Eye size={16} />}
            >
              Preview
            </Button>
            <div className="space-x-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setContent('');
                  setMediaUrl('');
                  setScheduledFor('');
                }}
              >
                Clear
              </Button>
              <Button
                type="submit"
                variant="primary"
                leftIcon={<Send size={16} />}
                isLoading={isLoading}
              >
                {scheduledFor ? 'Schedule Status' : 'Post Status'}
              </Button>
            </div>
          </div>

          {isPreview && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 border rounded-lg p-4"
            >
              <h3 className="text-sm font-medium text-gray-700 mb-2">Preview</h3>
              <div className="bg-whatsapp-light rounded-lg p-4">
                <p className="text-gray-800 whitespace-pre-wrap">{content}</p>
                {mediaUrl && (
                  <img
                    src={mediaUrl}
                    alt="Status preview"
                    className="mt-2 rounded-lg max-h-48 object-cover"
                  />
                )}
                {scheduledFor && (
                  <p className="text-sm text-gray-500 mt-2">
                    Scheduled for: {new Date(scheduledFor).toLocaleString()}
                  </p>
                )}
              </div>
            </motion.div>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default StatusUpdateForm;