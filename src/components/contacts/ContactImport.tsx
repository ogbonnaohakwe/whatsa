import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import Button from '../ui/Button';
import { Upload, FileText, Check, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const ContactImport: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [importing, setImporting] = useState(false);
  const [preview, setPreview] = useState<string[][]>([]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type !== 'text/csv') {
        toast.error('Please select a CSV file');
        return;
      }
      setFile(selectedFile);
      parseCSV(selectedFile);
    }
  };

  const parseCSV = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const rows = text.split('\n').map(row => row.split(','));
      setPreview(rows.slice(0, 5)); // Show first 5 rows as preview
    };
    reader.readAsText(file);
  };

  const handleImport = async () => {
    if (!file) return;

    setImporting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success('Contacts imported successfully!');
      setFile(null);
      setPreview([]);
    } catch (error) {
      toast.error('Failed to import contacts');
    } finally {
      setImporting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Import Contacts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
            <input
              type="file"
              accept=".csv"
              onChange={handleFileSelect}
              className="hidden"
              id="csv-upload"
            />
            <label
              htmlFor="csv-upload"
              className="cursor-pointer flex flex-col items-center"
            >
              <Upload size={24} className="text-gray-400 mb-2" />
              <span className="text-sm text-gray-600">
                Click to upload CSV file
              </span>
              <span className="text-xs text-gray-500 mt-1">
                or drag and drop
              </span>
            </label>
          </div>

          {file && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="flex items-center space-x-2 text-sm">
                <FileText size={16} className="text-gray-500" />
                <span className="text-gray-900 font-medium">{file.name}</span>
                <span className="text-gray-500">
                  ({(file.size / 1024).toFixed(2)} KB)
                </span>
              </div>

              {preview.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Preview
                  </h4>
                  <div className="bg-gray-50 rounded-lg p-4 overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          {preview[0].map((header, i) => (
                            <th
                              key={i}
                              className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {preview.slice(1).map((row, i) => (
                          <tr key={i}>
                            {row.map((cell, j) => (
                              <td
                                key={j}
                                className="px-3 py-2 text-sm text-gray-500"
                              >
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    setFile(null);
                    setPreview([]);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={handleImport}
                  isLoading={importing}
                  leftIcon={<Check size={16} />}
                >
                  Import Contacts
                </Button>
              </div>
            </motion.div>
          )}

          <div className="text-sm text-gray-500">
            <h4 className="font-medium text-gray-700 mb-2">
              CSV Format Requirements
            </h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>First row must contain column headers</li>
              <li>Required columns: Name, Phone Number</li>
              <li>Optional columns: Email, Notes, Tags</li>
              <li>Phone numbers must include country code</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactImport;