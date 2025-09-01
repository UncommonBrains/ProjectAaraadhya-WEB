import { useState } from 'react';
import { MapPin, Mail, Phone, Clock, Send, MessageCircle, HelpCircle } from 'lucide-react';
import FloatingActionButton from '../../../components/common/Button/FloatingActionButton';
import {companyInfo} from '../../../components/companyInfo'

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    category: 'general'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      category: 'general'
    });
    
    setIsSubmitting(false);
    alert('Message sent successfully! We will get back to you soon.');
  };

  return (
    <div className="min-h-screen bg-amber-50 font-sans">
      <main className="container mx-auto p-4">
        {/* Page Header */}
        <div className="mb-6 text-center">
          <h1 className="mb-2 font-serif text-3xl text-amber-900">Contact Us</h1>
          <p className="text-gray-600">We're here to help with your spiritual journey</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Contact Information */}
          <div className="space-y-6">
            {/* Contact Cards */}
            <div className="rounded-lg border border-amber-100 bg-white p-6 shadow-sm">
              <h2 className="mb-4 font-serif text-xl text-amber-900">Get In Touch</h2>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100">
                    <MapPin className="h-5 w-5 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="font-medium text-amber-900">Visit Us</h3>
                    <p className="text-sm text-gray-600">
                      {companyInfo.name} <br />
                      {companyInfo.address.address} <br />
                      {companyInfo.address.locality} <br />
                      {companyInfo.address.city} <br />
                      {companyInfo.address.state}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100">
                    <Mail className="h-5 w-5 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="font-medium text-amber-900">Email Us</h3>
                    <p className="text-sm text-gray-600">
                      General: {companyInfo.emails.general} <br />
                      Support: {companyInfo.emails.support} <br />
                      Partnerships: {companyInfo.emails.partnerships}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100">
                    <Phone className="h-5 w-5 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="font-medium text-amber-900">Call Us</h3>
                    <p className="text-sm text-gray-600">
                      Main: {companyInfo.numbers.primary} <br />
                      Support: {companyInfo.numbers.secondary} <br />
                      WhatsApp: {companyInfo.numbers.whatsapp}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100">
                    <Clock className="h-5 w-5 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="font-medium text-amber-900">Business Hours</h3>
                    <p className="text-sm text-gray-600">
                      Monday - Friday: 9:00 AM - 6:00 PM<br />
                      Saturday: 9:00 AM - 4:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Help */}
            <div className="rounded-lg border border-amber-100 bg-white p-6 shadow-sm">
              <h2 className="mb-4 font-serif text-xl text-amber-900">Quick Help</h2>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3 rounded-lg bg-amber-50 p-3">
                  <MessageCircle className="h-5 w-5 text-orange-500" />
                  <div>
                    <h3 className="font-medium text-amber-900">Live Chat</h3>
                    <p className="text-xs text-gray-600">Available 9 AM - 6 PM IST</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 rounded-lg bg-amber-50 p-3">
                  <HelpCircle className="h-5 w-5 text-orange-500" />
                  <div>
                    <h3 className="font-medium text-amber-900">FAQ Section</h3>
                    <p className="text-xs text-gray-600">Find answers to common questions</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 rounded-lg bg-amber-50 p-3">
                  <Phone className="h-5 w-5 text-orange-500" />
                  <div>
                    <h3 className="font-medium text-amber-900">Emergency Support</h3>
                    <p className="text-xs text-gray-600">24/7 for urgent temple matters</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-lg border border-amber-100 bg-white p-6 shadow-sm">
            <h2 className="mb-4 font-serif text-xl text-amber-900">Send us a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-1 block text-sm font-medium text-gray-700">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-amber-200 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-amber-200 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="phone" className="mb-1 block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-amber-200 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>

                <div>
                  <label htmlFor="category" className="mb-1 block text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-amber-200 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="temple">Temple Information</option>
                    <option value="store">Devotee Store</option>
                    <option value="technical">Technical Support</option>
                    <option value="partnership">Partnership</option>
                    <option value="feedback">Feedback</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="mb-1 block text-sm font-medium text-gray-700">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-amber-200 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  placeholder="Brief subject of your message"
                />
              </div>

              <div>
                <label htmlFor="message" className="mb-1 block text-sm font-medium text-gray-700">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-amber-200 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  placeholder="Please describe your inquiry in detail..."
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="privacy"
                  required
                  className="h-4 w-4 accent-orange-500"
                />
                <label htmlFor="privacy" className="text-sm text-gray-600">
                  I agree to the Privacy Policy and Terms of Service *
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex w-full items-center justify-center space-x-2 rounded-lg py-3 text-sm font-medium text-white transition-colors ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-orange-500 hover:bg-orange-600'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>

            <div className="mt-4 rounded-lg bg-amber-50 p-3">
              <p className="text-xs text-gray-600">
                <strong>Response Time:</strong> We typically respond within 24-48 hours during business days. 
                For urgent temple-related matters, please call our emergency support line.
              </p>
            </div>
          </div>
        </div>

        {/* Map Section (Placeholder) */}
        <div className="mt-8 rounded-lg border border-amber-100 bg-white p-6 shadow-sm">
          <h2 className="mb-4 font-serif text-xl text-amber-900">Find Us</h2>
          <div className="flex h-64 items-center justify-center rounded-lg bg-amber-50">
            <div className="text-center">
              <MapPin className="mx-auto mb-2 h-8 w-8 text-orange-500" />
              <p className="text-sm text-gray-600">Interactive map will be loaded here</p>
              <p className="text-xs text-gray-500">Aaraadhya ,Krishnamana Illam, Cheravally, Kayamkulam PO, Alappuzha, Kerala - 690502, India</p>
            </div>
          </div>
        </div>
      </main>

      {/* Floating Action Button */}
      <FloatingActionButton />
    </div>
  );
};

export default ContactUs; 