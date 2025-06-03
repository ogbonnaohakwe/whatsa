import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Calendar, User, ArrowRight } from 'lucide-react';

const BlogPage: React.FC = () => {
  const blogPosts = [
    {
      title: 'How to Automate Your WhatsApp Business Messages',
      excerpt: 'Learn the best practices for setting up automated responses and managing customer interactions at scale.',
      image: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg',
      author: 'John Smith',
      date: 'March 15, 2025',
      category: 'Automation'
    },
    {
      title: 'The Future of Business Communication',
      excerpt: 'Discover how AI and automation are transforming the way businesses communicate with their customers.',
      image: 'https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg',
      author: 'Sarah Johnson',
      date: 'March 12, 2025',
      category: 'Industry Trends'
    },
    {
      title: 'Maximizing Customer Engagement on WhatsApp',
      excerpt: 'Tips and strategies for improving your customer engagement rates through WhatsApp Business.',
      image: 'https://images.pexels.com/photos/3182744/pexels-photo-3182744.jpeg',
      author: 'Mike Wilson',
      date: 'March 10, 2025',
      category: 'Marketing'
    }
    // Add more blog posts as needed
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-6">
              Latest Updates & Insights
            </h1>
            <p className="text-xl text-gray-600">
              Stay up to date with the latest news, tips, and best practices for WhatsApp business automation.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Featured Post */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative h-64 lg:h-auto">
                <img
                  src="https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg"
                  alt="Featured post"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="p-8">
                <div className="text-sm text-primary-600 font-semibold mb-2">Featured</div>
                <h2 className="text-2xl font-bold mb-4">
                  10 Ways to Improve Your WhatsApp Business Strategy
                </h2>
                <p className="text-gray-600 mb-6">
                  Discover the most effective strategies for growing your business using WhatsApp's powerful features and automation capabilities.
                </p>
                <div className="flex items-center text-sm text-gray-500 mb-6">
                  <User size={16} className="mr-2" />
                  <span className="mr-4">John Doe</span>
                  <Calendar size={16} className="mr-2" />
                  <span>March 20, 2025</span>
                </div>
                <Button variant="primary">Read More</Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Blog Posts Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-elevation-2 transition-shadow">
                <CardContent className="p-0">
                  <div className="relative h-48">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="text-sm text-primary-600 font-semibold mb-2">{post.category}</div>
                    <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <User size={16} className="mr-2" />
                      <span className="mr-4">{post.author}</span>
                      <Calendar size={16} className="mr-2" />
                      <span>{post.date}</span>
                    </div>
                    <Button
                      variant="ghost"
                      className="text-primary-600 hover:text-primary-700"
                      rightIcon={<ArrowRight size={16} />}
                    >
                      Read More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-gray-600 mb-8">
              Get the latest updates, tips, and best practices delivered straight to your inbox.
            </p>
            <form className="flex gap-4">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1"
              />
              <Button variant="primary">Subscribe</Button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;