import React, { useState } from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { Copy, Check } from 'lucide-react';
import toast from 'react-hot-toast';

interface EmbedCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  pageId: string;
}

const EmbedCodeModal: React.FC<EmbedCodeModalProps> = ({ isOpen, onClose, pageId }) => {
  const [copied, setCopied] = useState(false);
  const [embedType, setEmbedType] = useState<'inline' | 'popup' | 'floating'>('inline');

  const generateEmbedCode = () => {
    const baseCode = `<!-- WhatsApp Lead Form Widget -->
<div id="whatsapp-lead-form-${pageId}"></div>
<script src="https://whatsapp-autoresponder.com/widgets/lead-form.js"></script>
<script>
  WhatsAppLeadForm.init({
    formId: "${pageId}",
    containerId: "whatsapp-lead-form-${pageId}",
    type: "${embedType}",
    ${embedType === 'popup' ? 'trigger: "button",' : ''}
    ${embedType === 'floating' ? 'position: "bottom-right",' : ''}
    onSuccess: function(data) {
      console.log('Form submitted:', data);
      // Redirect to thank you page or show success message
    }
  });
</script>`;

    return baseCode;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generateEmbedCode());
      setCopied(true);
      toast.success('Embed code copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('Failed to copy embed code');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Embed Code" size="lg">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Embed Type
          </label>
          <div className="flex space-x-4">
            {[
              { value: 'inline', label: 'Inline Form' },
              { value: 'popup', label: 'Popup Modal' },
              { value: 'floating', label: 'Floating Widget' }
            ].map((type) => (
              <button
                key={type.value}
                onClick={() => setEmbedType(type.value as any)}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  embedType === type.value
                    ? 'bg-primary-50 text-primary-700 border-2 border-primary-500'
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Embed Code
          </label>
          <div className="relative">
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto max-h-64">
              <code>{generateEmbedCode()}</code>
            </pre>
            <Button
              onClick={handleCopy}
              className="absolute top-2 right-2"
              size="sm"
              variant="outline"
              leftIcon={copied ? <Check size={16} /> : <Copy size={16} />}
            >
              {copied ? 'Copied!' : 'Copy'}
            </Button>
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">Integration Instructions:</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Copy the embed code above</li>
            <li>• Paste it into your website's HTML where you want the form to appear</li>
            <li>• The form will automatically load and handle submissions</li>
            <li>• Customize the styling using CSS if needed</li>
          </ul>
        </div>
      </div>
    </Modal>
  );
};

export default EmbedCodeModal;