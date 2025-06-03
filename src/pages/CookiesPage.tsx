import React from 'react';
import { motion } from 'framer-motion';

const CookiesPage: React.FC = () => {
  return (
    <div className="bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-8">Cookie Policy</h1>
          
          <div className="prose prose-lg">
            <p className="text-gray-600 mb-6">
              Last updated: March 1, 2025
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. What Are Cookies?</h2>
              <p className="text-gray-600 mb-4">
                Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and understanding how you use our service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. Types of Cookies We Use</h2>
              
              <h3 className="text-xl font-semibold mb-2">2.1 Essential Cookies</h3>
              <p className="text-gray-600 mb-4">
                These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and accessibility.
              </p>

              <h3 className="text-xl font-semibold mb-2">2.2 Performance Cookies</h3>
              <p className="text-gray-600 mb-4">
                These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.
              </p>

              <h3 className="text-xl font-semibold mb-2">2.3 Functionality Cookies</h3>
              <p className="text-gray-600 mb-4">
                These cookies enable the website to remember choices you make (such as your language preference) to provide enhanced features.
              </p>

              <h3 className="text-xl font-semibold mb-2">2.4 Targeting Cookies</h3>
              <p className="text-gray-600 mb-4">
                These cookies may be set through our site by our advertising partners to build a profile of your interests and show you relevant ads on other sites.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. How We Use Cookies</h2>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>To remember your preferences and settings</li>
                <li>To improve website performance and speed</li>
                <li>To analyze how our website is used</li>
                <li>To personalize your experience</li>
                <li>To provide social media features</li>
                <li>To display relevant advertising</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Managing Cookies</h2>
              <p className="text-gray-600 mb-4">
                You can control and manage cookies in various ways:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Browser settings to refuse all or some cookies</li>
                <li>Delete cookies after each session</li>
                <li>Private browsing mode</li>
                <li>Third-party opt-out tools</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. Impact of Disabling Cookies</h2>
              <p className="text-gray-600 mb-4">
                Please note that if you disable or refuse cookies, some parts of the website may become inaccessible or not function properly.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. Third-Party Cookies</h2>
              <p className="text-gray-600 mb-4">
                We use services from these third parties that may set cookies:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Google Analytics</li>
                <li>Facebook Pixel</li>
                <li>LinkedIn Insight Tag</li>
                <li>Payment processors</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">7. Updates to Cookie Policy</h2>
              <p className="text-gray-600 mb-4">
                We may update this Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy on this page.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">8. Contact Us</h2>
              <p className="text-gray-600 mb-4">
                If you have questions about our use of cookies, please contact us at:
              </p>
              <p className="text-gray-600">
                Email: privacy@whatsapp-autoresponder.com<br />
                Address: 123 Business Street, Suite 100<br />
                San Francisco, CA 94105
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CookiesPage;