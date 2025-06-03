import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { Star } from 'lucide-react';

interface TestimonialProps {
  quote: string;
  name: string;
  title: string;
  company: string;
  image: string;
  rating: number;
  delay: number;
}

const Testimonial: React.FC<TestimonialProps> = ({
  quote,
  name,
  title,
  company,
  image,
  rating,
  delay
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
  >
    <Card className="h-full">
      <div className="p-6">
        <div className="flex mb-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={18}
              className={i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
            />
          ))}
        </div>
        <blockquote className="text-lg text-gray-700 mb-6 italic">
          "{quote}"
        </blockquote>
        <div className="flex items-center">
          <img
            src={image}
            alt={name}
            className="w-12 h-12 rounded-full object-cover mr-4"
          />
          <div>
            <p className="font-medium text-gray-900">{name}</p>
            <p className="text-sm text-gray-500">
              {title}, {company}
            </p>
          </div>
        </div>
      </div>
    </Card>
  </motion.div>
);

const TestimonialSection: React.FC = () => {
  const testimonials = [
    {
      quote: "WhatsApp Autoresponder has transformed our customer service. We're now able to respond instantly to customer inquiries, even outside business hours.",
      name: "Sarah Johnson",
      title: "Customer Service Manager",
      company: "Retail Solutions Inc.",
      image: "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=100",
      rating: 5,
    },
    {
      quote: "The lead generation capabilities are impressive. We've increased our contact list by 40% in just two months using the custom optin pages.",
      name: "Michael Chen",
      title: "Marketing Director",
      company: "Growth Technologies",
      image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100",
      rating: 5,
    },
    {
      quote: "This tool has saved our team countless hours every week. The bulk messaging and automation features are worth every penny.",
      name: "Jessica Rodriguez",
      title: "Operations Lead",
      company: "Service Pro",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100",
      rating: 4,
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-gray-900 mb-4"
          >
            Loved by Businesses Worldwide
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600"
          >
            See how businesses are transforming their WhatsApp communications
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Testimonial
              key={index}
              quote={testimonial.quote}
              name={testimonial.name}
              title={testimonial.title}
              company={testimonial.company}
              image={testimonial.image}
              rating={testimonial.rating}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;