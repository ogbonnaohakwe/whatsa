import React from 'react';
import OnboardingSteps from '../components/auth/OnboardingSteps';

const OnboardingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <OnboardingSteps />
      </div>
    </div>
  );
};

export default OnboardingPage;