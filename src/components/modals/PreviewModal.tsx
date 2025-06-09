import React from 'react';
import Modal from '../ui/Modal';
import { OptinPage } from '../../types';

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  page: OptinPage;
}

const PreviewModal: React.FC<PreviewModalProps> = ({ isOpen, onClose, page }) => {
  const getThemeStyles = () => {
    if (page.theme === 'dark') {
      return 'bg-gray-900 text-white';
    } else if (page.theme === 'custom' && page.customColors) {
      return '';
    }
    return 'bg-white text-gray-900';
  };

  const getCustomStyles = () => {
    if (page.theme === 'custom' && page.customColors) {
      return {
        backgroundColor: page.customColors.background,
        color: page.customColors.text,
      };
    }
    return {};
  };

  const getButtonStyles = () => {
    if (page.theme === 'custom' && page.customColors) {
      return {
        backgroundColor: page.customColors.primary,
        color: page.customColors.background,
      };
    }
    return page.theme === 'dark' ? 'bg-white text-gray-900' : 'bg-primary-500 text-white';
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Lead Page Preview" size="lg">
      <div className="space-y-4">
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="text-sm text-gray-600 mb-2">Preview URL:</p>
          <code className="text-sm bg-white p-2 rounded border">
            https://whatsapp-responder.com/l/{page.id}
          </code>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div 
            className={`p-8 ${getThemeStyles()}`}
            style={getCustomStyles()}
          >
            <div className="max-w-md mx-auto">
              <h2 className="text-2xl font-bold mb-2">{page.name}</h2>
              {page.description && (
                <p className="mb-6 opacity-80">{page.description}</p>
              )}
              
              <form className="space-y-4">
                {page.fields.map((field) => (
                  <div key={field.id}>
                    <label className="block text-sm font-medium mb-1">
                      {field.label}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    {field.type === 'select' ? (
                      <select 
                        className="w-full p-2 border rounded-md"
                        disabled
                      >
                        <option>{field.placeholder}</option>
                        {field.options?.map((option, i) => (
                          <option key={i} value={option}>{option}</option>
                        ))}
                      </select>
                    ) : field.type === 'checkbox' ? (
                      <div className="flex items-center">
                        <input 
                          type="checkbox" 
                          className="mr-2"
                          disabled
                        />
                        <span className="text-sm">{field.label}</span>
                      </div>
                    ) : (
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        className="w-full p-2 border rounded-md"
                        disabled
                      />
                    )}
                  </div>
                ))}
                
                <button
                  type="button"
                  className={`w-full py-2 px-4 rounded-md font-medium ${getButtonStyles()}`}
                  disabled
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PreviewModal;