import emailjs from '@emailjs/browser';
import type { ContactFormData } from '../components/ui/ContactForm';

/**
 * Email Service Configuration
 * 
 * To set up EmailJS:
 * 1. Create an account at https://www.emailjs.com/
 * 2. Create an email service (Gmail, Outlook, etc.)
 * 3. Create an email template with variables: {{from_name}}, {{from_email}}, {{message}}
 * 4. Get your Public Key from Account settings
 * 5. Create a .env file in the root directory with:
 *    VITE_EMAILJS_SERVICE_ID=your_service_id
 *    VITE_EMAILJS_TEMPLATE_ID=your_template_id
 *    VITE_EMAILJS_PUBLIC_KEY=your_public_key
 */

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';

/**
 * Check if EmailJS is properly configured
 */
export const isEmailServiceConfigured = (): boolean => {
  return !!(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY);
};

/**
 * Send contact form data via EmailJS
 * @param formData - The contact form data
 * @returns Promise that resolves when email is sent
 * @throws Error if EmailJS is not configured or sending fails
 */
export const sendContactEmail = async (formData: ContactFormData): Promise<void> => {
  if (!isEmailServiceConfigured()) {
    throw new Error('Email service is not configured. Please set up environment variables.');
  }

  try {
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
      to_name: 'Portfolio Owner', // You can customize this
    };

    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams,
      PUBLIC_KEY
    );

    if (response.status !== 200) {
      throw new Error('Failed to send email');
    }
  } catch (error) {
    console.error('EmailJS Error:', error);
    throw error;
  }
};

/**
 * Alternative: Mock email sending for development/testing
 * Use this when EmailJS is not configured
 */
export const mockSendEmail = async (formData: ContactFormData): Promise<void> => {
  console.log('Mock email sent:', formData);
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Simulate success
  return Promise.resolve();
};
