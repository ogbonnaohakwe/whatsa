import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../ui/Card';
import Input from '../ui/Input';
import { ChevronLeft, ChevronRight, QrCode, Smartphone } from 'lucide-react';
import { motion } from 'framer-motion';

const OnboardingSteps = () => {
  const [step, setStep] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [connectMethod, setConnectMethod] = useState<'qr' | 'phone' | null>(null);
  const navigate = useNavigate();

  const steps = [
    {
      title: 'Welcome to WhatsApp Autoresponder',
      description: "We'll help you set up your account in just a few steps.",
      content: (
        <div className="text-center py-8">
          <img 
            src="https://images.pexels.com/photos/6893333/pexels-photo-6893333.jpeg?auto=compress&cs=tinysrgb&w=600" 
            alt="Welcome" 
            className="w-64 h-64 object-cover rounded-full mx-auto mb-6"
          />
          <p className="text-lg text-gray-700 mb-6">
            Automate your WhatsApp messaging and grow your business with our powerful platform.
          </p>
          <Button onClick={() => setStep(1)}>Get Started</Button>
        </div>
      ),
    },
    {
      title: 'Connect Your WhatsApp Account',
      description: 'Choose how you want to connect your WhatsApp account.',
      content: (
        <div className="py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card 
              className={`cursor-pointer transition-all ${
                connectMethod === 'qr' ? 'ring-2 ring-primary-500' : 'hover:shadow-elevation-2'
              }`}
              onClick={() => setConnectMethod('qr')}
            >
              <CardContent className="flex flex-col items-center justify-center p-6">
                <QrCode size={64} className="text-secondary-900 mb-4" />
                <h3 className="text-lg font-medium mb-2">Scan QR Code</h3>
                <p className="text-sm text-center text-gray-500">
                  Use your phone to scan a QR code to connect your WhatsApp account
                </p>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all ${
                connectMethod === 'phone' ? 'ring-2 ring-primary-500' : 'hover:shadow-elevation-2'
              }`}
              onClick={() => setConnectMethod('phone')}
            >
              <CardContent className="flex flex-col items-center justify-center p-6">
                <Smartphone size={64} className="text-secondary-900 mb-4" />
                <h3 className="text-lg font-medium mb-2">Enter Phone Number</h3>
                <p className="text-sm text-center text-gray-500">
                  Connect using your WhatsApp Business phone number
                </p>
              </CardContent>
            </Card>
          </div>
          
          {connectMethod === 'phone' && (
            <div className="mt-6">
              <Input
                label="WhatsApp Business Phone Number"
                placeholder="+1234567890"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                helperText="Enter your full phone number including country code"
              />
            </div>
          )}
          
          {connectMethod === 'qr' && (
            <div className="mt-6 flex flex-col items-center">
              <div className="bg-white p-4 rounded-lg shadow-elevation-1 inline-block">
                <img 
                  src="https://images.pexels.com/photos/8919570/pexels-photo-8919570.jpeg?auto=compress&cs=tinysrgb&w=600" 
                  alt="QR Code Example" 
                  className="w-48 h-48 object-cover"
                />
              </div>
              <p className="text-sm text-gray-500 mt-4 text-center">
                Open WhatsApp on your phone, go to Settings &gt; Linked Devices &gt; Link a Device and scan this code
              </p>
            </div>
          )}
        </div>
      ),
    },
    {
      title: 'Set Up Your First Auto-Response',
      description: 'Create an automatic response for incoming messages.',
      content: (
        <div className="py-6">
          <div className="space-y-4">
            <Input
              label="Response Name"
              placeholder="Welcome Message"
              defaultValue="Welcome Message"
            />
            
            <Input
              label="Trigger Words or Phrases"
              placeholder="hello, hi, hey"
              defaultValue="hello, hi, hey"
              helperText="Separate multiple triggers with commas"
            />
            
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Auto Response Message
              </label>
              <textarea
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                rows={4}
                placeholder="Type your automated response here..."
                defaultValue="👋 Hello! Thanks for reaching out. I'll respond to your message as soon as possible. How can I help you today?"
              />
              <p className="text-sm text-gray-500">
                This message will be sent automatically when someone messages with your trigger words
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'All Set!',
      description: "You're ready to start automating your WhatsApp messages.",
      content: (
        <div className="text-center py-8">
          <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Setup Complete!</h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Your WhatsApp Autoresponder is now ready to use. Explore your dashboard to set up more automations and start engaging with your contacts.
          </p>
          <Button onClick={() => navigate('/dashboard')}>Go to Dashboard</Button>
        </div>
      ),
    },
  ];

  const nextStep = () => {
    if (step === 1 && !connectMethod) {
      // Require selection before proceeding
      return;
    }
    if (step < steps.length - 1) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const currentStep = steps[step];

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{currentStep.title}</CardTitle>
          <p className="text-sm text-gray-500">{currentStep.description}</p>
        </CardHeader>
        
        <CardContent>
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {currentStep.content}
          </motion.div>
        </CardContent>
        
        <CardFooter className="flex justify-between border-t border-gray-200 pt-4">
          {step > 0 ? (
            <Button variant="outline" onClick={prevStep} leftIcon={<ChevronLeft size={16} />}>
              Back
            </Button>
          ) : (
            <div></div>
          )}
          
          {step < steps.length - 1 && (
            <Button 
              variant="primary" 
              onClick={nextStep} 
              rightIcon={<ChevronRight size={16} />}
              disabled={step === 1 && !connectMethod}
            >
              {step === 0 ? 'Get Started' : 'Next'}
            </Button>
          )}
        </CardFooter>
      </Card>
      
      <div className="mt-6">
        <div className="flex items-center justify-between">
          {steps.map((_, index) => (
            <div key={index} className="flex items-center">
              <div
                className={`w-2.5 h-2.5 rounded-full ${
                  step >= index ? 'bg-primary-500' : 'bg-gray-300'
                }`}
              />
              {index < steps.length - 1 && (
                <div 
                  className={`w-12 h-0.5 ${
                    step > index ? 'bg-primary-500' : 'bg-gray-300'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OnboardingSteps;