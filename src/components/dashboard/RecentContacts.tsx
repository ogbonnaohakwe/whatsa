import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Contact } from '../../types';
import { formatDate } from '../../lib/utils';
import { User, MoreHorizontal } from 'lucide-react';

interface RecentContactsProps {
  contacts: Contact[];
}

const RecentContacts: React.FC<RecentContactsProps> = ({ contacts }) => {
  // Sort contacts by lastMessageAt, most recent first
  const sortedContacts = [...contacts]
    .filter(contact => contact.lastMessageAt)
    .sort((a, b) => {
      if (!a.lastMessageAt || !b.lastMessageAt) return 0;
      return new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime();
    })
    .slice(0, 5); // Show only the 5 most recent

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Contacts</CardTitle>
        <button className="text-sm text-primary-500 hover:text-primary-600 font-medium">
          View all
        </button>
      </CardHeader>
      <CardContent>
        <div className="divide-y divide-gray-200">
          {sortedContacts.length > 0 ? (
            sortedContacts.map((contact) => (
              <div key={contact.id} className="py-3 flex justify-between items-center">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <User size={20} className="text-gray-500" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{contact.name}</p>
                    <p className="text-xs text-gray-500">
                      {contact.lastMessageAt && formatDate(new Date(contact.lastMessageAt))}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="text-sm text-primary-500 font-medium">
                    Message
                  </button>
                  <button className="text-gray-400 hover:text-gray-500">
                    <MoreHorizontal size={16} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="py-6 text-center">
              <p className="text-gray-500 text-sm">No recent contacts found</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentContacts;