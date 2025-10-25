import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ContactForm, ContactFormData, SocialLinks } from '../ui';
import { personalInfo } from '../../data/personal';
import { sendContactEmail, mockSendEmail, isEmailServiceConfigured } from '../../utils';
import { FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      // Use EmailJS if configured, otherwise use mock for development
      if (isEmailServiceConfigured()) {
        await sendContactEmail(data);
      } else {
        console.warn('EmailJS not configured. Using mock email service.');
        await mockSendEmail(data);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Convert personal info social links to SocialLinks component format
  const socialLinks = personalInfo.social.map(link => ({
    platform: link.platform,
    url: link.url,
    label: `Visit ${link.platform}`,
  }));

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-100px' },
    transition: { duration: 0.6, ease: 'easeOut' },
  };

  return (
    <section 
      id="contact" 
      className="section py-20"
      style={{ 
        minHeight: '100vh',
        backgroundColor: 'var(--color-surface)',
      }}
    >
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          {...fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="section-heading">Get In Touch</h2>
          <p 
            className="section-subheading max-w-2xl mx-auto"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            Have a project in mind or want to collaborate? Feel free to reach out!
          </p>
        </motion.div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="card p-8"
          >
            <h3 
              className="text-2xl font-semibold mb-6"
              style={{ color: 'var(--color-text-primary)' }}
            >
              Send a Message
            </h3>
            <ContactForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
            
            {/* EmailJS Configuration Notice */}
            {!isEmailServiceConfigured() && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-4 p-3 rounded-lg"
                style={{ 
                  backgroundColor: 'var(--color-warning)22',
                  border: '1px solid var(--color-warning)',
                }}
              >
                <p 
                  className="text-xs"
                  style={{ color: 'var(--color-warning)' }}
                >
                  ⚠️ Email service not configured. Messages will be logged to console. 
                  See .env.example for setup instructions.
                </p>
              </motion.div>
            )}
          </motion.div>

          {/* Contact Information */}
          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="space-y-8"
          >
            {/* Contact Details Card */}
            <div className="card p-8">
              <h3 
                className="text-2xl font-semibold mb-6"
                style={{ color: 'var(--color-text-primary)' }}
              >
                Contact Information
              </h3>

              <div className="space-y-6">
                {/* Email */}
                <div className="flex items-start gap-4">
                  <div 
                    className="p-3 rounded-lg"
                    style={{ backgroundColor: 'var(--color-primary)22' }}
                  >
                    <FaEnvelope 
                      size={24} 
                      style={{ color: 'var(--color-primary)' }}
                    />
                  </div>
                  <div>
                    <p 
                      className="text-sm font-medium mb-1"
                      style={{ color: 'var(--color-text-secondary)' }}
                    >
                      Email
                    </p>
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className="hover:underline transition-all duration-300"
                      style={{ color: 'var(--color-primary)' }}
                    >
                      {personalInfo.email}
                    </a>
                  </div>
                </div>

                {/* Location (if provided) */}
                {personalInfo.location && (
                  <div className="flex items-start gap-4">
                    <div 
                      className="p-3 rounded-lg"
                      style={{ backgroundColor: 'var(--color-primary)22' }}
                    >
                      <FaMapMarkerAlt 
                        size={24} 
                        style={{ color: 'var(--color-primary)' }}
                      />
                    </div>
                    <div>
                      <p 
                        className="text-sm font-medium mb-1"
                        style={{ color: 'var(--color-text-secondary)' }}
                      >
                        Location
                      </p>
                      <p style={{ color: 'var(--color-text-primary)' }}>
                        {personalInfo.location}
                      </p>
                    </div>
                  </div>
                )}

                {/* Social Links */}
                <div>
                  <p 
                    className="text-sm font-medium mb-4"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    Connect with me
                  </p>
                  <SocialLinks links={socialLinks} iconSize={28} />
                </div>
              </div>
            </div>

            {/* Additional Info Card */}
            <div 
              className="card p-8"
              style={{ 
                background: 'linear-gradient(135deg, var(--color-primary)11, var(--color-accent)11)',
                border: '1px solid var(--color-primary)33',
              }}
            >
              <h4 
                className="text-lg font-semibold mb-3"
                style={{ color: 'var(--color-text-primary)' }}
              >
                Let's Build Something Amazing
              </h4>
              <p 
                className="text-sm leading-relaxed"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                I'm always interested in hearing about new projects and opportunities. 
                Whether you have a question or just want to say hi, I'll try my best to get back to you!
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
