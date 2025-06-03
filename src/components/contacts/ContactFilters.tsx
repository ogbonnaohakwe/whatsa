import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { Filter, X, Save, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FilterOption {
  field: string;
  operator: string;
  value: string;
}

const ContactFilters: React.FC = () => {
  const [filters, setFilters] = useState<FilterOption[]>([
    { field: 'name', operator: 'contains', value: '' }
  ]);

  const [savedFilters, setSavedFilters] = useState([
    { name: 'Active Customers', count: 156 },
    { name: 'Recent Leads', count: 43 },
    { name: 'Newsletter Subscribers', count: 289 }
  ]);

  const addFilter = () => {
    setFilters([...filters, { field: 'name', operator: 'contains', value: '' }]);
  };

  const removeFilter = (index: number) => {
    setFilters(filters.filter((_, i) => i !== index));
  };

  const updateFilter = (index: number, field: keyof FilterOption, value: string) => {
    setFilters(
      filters.map((filter, i) =>
        i === index ? { ...filter, [field]: value } : filter
      )
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filter Contacts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-4">
            {filters.map((filter, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex gap-3"
              >
                <select
                  value={filter.field}
                  onChange={(e) => updateFilter(index, 'field', e.target.value)}
                  className="rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                >
                  <option value="name">Name</option>
                  <option value="email">Email</option>
                  <option value="phone">Phone</option>
                  <option value="group">Group</option>
                  <option value="tag">Tag</option>
                </select>

                <select
                  value={filter.operator}
                  onChange={(e) => updateFilter(index, 'operator', e.target.value)}
                  className="rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                >
                  <option value="contains">Contains</option>
                  <option value="equals">Equals</option>
                  <option value="starts_with">Starts with</option>
                  <option value="ends_with">Ends with</option>
                </select>

                <Input
                  value={filter.value}
                  onChange={(e) => updateFilter(index, 'value', e.target.value)}
                  placeholder="Enter value"
                  className="flex-1"
                />

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFilter(index)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X size={16} />
                </Button>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={addFilter}
              leftIcon={<Plus size={16} />}
            >
              Add Filter
            </Button>

            <Button
              variant="primary"
              size="sm"
              leftIcon={<Save size={16} />}
            >
              Save Filter
            </Button>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h4 className="text-sm font-medium text-gray-700 mb-4">
              Saved Filters
            </h4>
            <div className="space-y-2">
              {savedFilters.map((filter, index) => (
                <button
                  key={index}
                  className="w-full flex items-center justify-between p-2 rounded-md hover:bg-gray-50 text-left"
                >
                  <span className="font-medium text-gray-900">{filter.name}</span>
                  <span className="text-sm text-gray-500">{filter.count} contacts</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactFilters;