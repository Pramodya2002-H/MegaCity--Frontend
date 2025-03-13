import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormSubmitted(true);
    
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      setFormSubmitted(false);
    }, 3000);
  };
  
  return (
    <div className="bg-gray-900 min-h-screen text-gray-100">
      <Header />
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 py-24 border-b border-gray-700">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-[#fbbf24] mb-6 bg-gradient-to-r from-[#fbbf24]/20 to-transparent py-6 rounded-lg">
            Contact Us
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
            Have questions about our services? Need to book a ride? We're here to assist you!
          </p>
        </div>
      </div>
      
      {/* Contact Information Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl hover:border-[#fbbf24]/30 transition-all duration-300 transform hover:-translate-y-2 flex flex-col items-center text-center">
            <div className="bg-gray-700 p-4 rounded-full mb-6">
              <MapPin className="w-10 h-10 text-[#fbbf24]" />
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-[#fbbf24]">Our Location</h3>
            <p className="text-gray-400 text-base leading-relaxed">
              123 MegaCity Plaza<br />
              Downtown District<br />
              MegaCity, MC 12345
            </p>
          </div>
          
          <div className="bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl hover:border-[#fbbf24]/30 transition-all duration-300 transform hover:-translate-y-2 flex flex-col items-center text-center">
            <div className="bg-gray-700 p-4 rounded-full mb-6">
              <Phone className="w-10 h-10 text-[#fbbf24]" />
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-[#fbbf24]">Call Us</h3>
            <p className="text-gray-400 text-base leading-relaxed">
              Bookings: (555) 123-4567<br />
              Customer Support: (555) 765-4321<br />
              Emergency: (555) 911-0000
            </p>
          </div>
          
          <div className="bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl hover:border-[#fbbf24]/30 transition-all duration-300 transform hover:-translate-y-2 flex flex-col items-center text-center">
            <div className="bg-gray-700 p-4 rounded-full mb-6">
              <Mail className="w-10 h-10 text-[#fbbf24]" />
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-[#fbbf24]">Email Us</h3>
            <p className="text-gray-400 text-base leading-relaxed">
              Bookings: bookings@megacitycab.com<br />
              Support: support@megacitycab.com<br />
              Business: partners@megacitycab.com
            </p>
          </div>
          
          <div className="bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl hover:border-[#fbbf24]/30 transition-all duration-300 transform hover:-translate-y-2 flex flex-col items-center text-center">
            <div className="bg-gray-700 p-4 rounded-full mb-6">
              <Clock className="w-10 h-10 text-[#fbbf24]" />
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-[#fbbf24]">Working Hours</h3>
            <p className="text-gray-400 text-base leading-relaxed">
              Cab Service: 24/7<br />
              Office Hours: Mon-Fri, 9AM-6PM<br />
              Customer Support: 24/7
            </p>
          </div>
        </div>
      </div>
      
      {/* Contact Form and Map Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-gray-800 p-10 rounded-2xl shadow-lg">
            <h2 className="text-4xl font-extrabold mb-8 text-[#fbbf24] border-b-2 border-[#fbbf24]/20 pb-4">
              Send Us a Message
            </h2>
            <p className="text-gray-400 mb-10 text-lg">
              Have a question or comment? Fill out the form below, and our team will respond promptly.
            </p>
            
            {formSubmitted ? (
              <div className="bg-[#fbbf24]/20 text-[#fbbf24] p-6 rounded-xl mb-8 border border-[#fbbf24]/40 text-center">
                Thank you for your message! We'll get back to you soon.
              </div>
            ) : null}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-gray-400 font-medium mb-3">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-5 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#fbbf24] focus:border-transparent placeholder-gray-500"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-400 font-medium mb-3">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-5 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#fbbf24] focus:border-transparent placeholder-gray-500"
                    placeholder="johndoe@example.com"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-gray-400 font-medium mb-3">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-5 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#fbbf24] focus:border-transparent placeholder-gray-500"
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-gray-400 font-medium mb-3">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-5 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#fbbf24] focus:border-transparent placeholder-gray-500"
                    placeholder="Booking Inquiry"
                    required
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-gray-400 font-medium mb-3">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="6"
                  className="w-full px-5 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#fbbf24] focus:border-transparent placeholder-gray-500"
                  placeholder="Write your message here..."
                  required
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className="group bg-[#fbbf24] text-gray-900 px-8 py-4 rounded-xl font-semibold flex items-center gap-3 transition-all duration-300 hover:bg-[#f59e0b] hover:shadow-lg hover:shadow-[#fbbf24]/40"
              >
                Send Message
                <Send className="w-6 h-6 transition-transform group-hover:translate-x-1" />
              </button>
            </form>
          </div>
          
          {/* Map Section */}
          <div className="bg-gray-800 p-10 rounded-2xl shadow-lg">
            <h2 className="text-4xl font-extrabold mb-8 text-[#fbbf24] border-b-2 border-[#fbbf24]/20 pb-4">
              Find Us
            </h2>
            <p className="text-gray-400 mb-10 text-lg">
              Located in the heart of Colombo, MegaCity Cab is easily accessible by public transport or personal vehicle.
            </p>

            {/* Google Maps Embed for Colombo */}
            <div
              className="h-50 bg-[url('/src/assets/contactUs.webp')] bg-gray-700 rounded-2xl mb-10 border border-gray-600 overflow-hidden"
              style={{ backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}
            />

            <div className="bg-gray-800 p-10 rounded-2xl border border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-3xl font-bold mb-8 text-[#fbbf24] border-b-2 border-[#fbbf24]/30 pb-4">
                Getting Here
              </h3>
              <div className="space-y-8">
                <div className="group">
                  <h4 className="text-xl font-semibold text-[#fbbf24] mb-4 group-hover:text-[#f59e0b] transition-colors duration-200">
                    By Public Transport:
                  </h4>
                  <p className="text-gray-400 leading-relaxed text-base">
                  Start your journey at Colombo Central Bus Stand or Fort Railway Station, then walk to MegaCity Plaza office. Use local tuk-tuk for a quick ride.
                  </p>
                </div>
                <div className="group">
                  <h4 className="text-xl font-semibold text-[#fbbf24] mb-4 group-hover:text-[#f59e0b] transition-colors duration-200">
                    By Car:
                  </h4>
                  <p className="text-gray-400 leading-relaxed text-base">
                  Our office, conveniently located in central Colombo, provides easy access for drivers, secure parking at the Colombo City Center Garage, and dedicated drop-off zones for efficient stops.
                  </p>
                </div>
                <div className="group">
                  <h4 className="text-xl font-semibold text-[#fbbf24] mb-4 group-hover:text-[#f59e0b] transition-colors duration-200">
                    From the Airport:
                  </h4>
                  <p className="text-gray-400 leading-relaxed text-base">
                  To reach MegaCity Plaza from Bandaranaike International Airport, it takes about 35 minutes via the Colombo-Katunayake Expressway for LKR 300 or by Airport Express shuttle every 30 minutes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* FAQ Section */}
      <div className="container mx-auto px-4 py-20 bg-gray-900">
        <h2 className="text-4xl font-extrabold text-center mb-12 text-[#fbbf24] bg-gradient-to-r from-[#fbbf24]/20 to-transparent py-6 rounded-lg">
          Frequently Asked Questions
        </h2>
        
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          <div className="bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-700 hover:shadow-xl hover:border-[#fbbf24]/30 transition-all duration-300 transform hover:-translate-y-2">
            <h3 className="text-2xl font-semibold mb-4 text-[#fbbf24] border-b-2 border-[#fbbf24]/20 pb-2">
              How do I book a cab?
            </h3>
            <p className="text-gray-400 leading-relaxed text-base">
              Easily book your ride through our intuitive mobile app, user-friendly website, or by contacting our 24/7 booking line at (076) 123-4567.
            </p>
          </div>
          
          <div className="bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-700 hover:shadow-xl hover:border-[#fbbf24]/30 transition-all duration-300 transform hover:-translate-y-2">
            <h3 className="text-2xl font-semibold mb-4 text-[#fbbf24] border-b-2 border-[#fbbf24]/20 pb-2">
              What payment methods do you accept?
            </h3>
            <p className="text-gray-400 leading-relaxed text-base">
              We offer flexible payment options including all major credit cards, cash, popular digital wallets, and dedicated corporate accounts.
            </p>
          </div>
          
          <div className="bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-700 hover:shadow-xl hover:border-[#fbbf24]/30 transition-all duration-300 transform hover:-translate-y-2">
            <h3 className="text-2xl font-semibold mb-4 text-[#fbbf24] border-b-2 border-[#fbbf24]/20 pb-2">
              Can I book a cab in advance?
            </h3>
            <p className="text-gray-400 leading-relaxed text-base">
              Yes, plan ahead with confidence! Schedule your pickup up to 7 days in advance via our app or by calling our dedicated booking line.
            </p>
          </div>
          
          <div className="bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-700 hover:shadow-xl hover:border-[#fbbf24]/30 transition-all duration-300 transform hover:-translate-y-2">
            <h3 className="text-2xl font-semibold mb-4 text-[#fbbf24] border-b-2 border-[#fbbf24]/20 pb-2">
              Do you offer airport transfers?
            </h3>
            <p className="text-gray-400 leading-relaxed text-base">
              Absolutely! We provide specialized airport transfers with competitive fixed rates and real-time flight tracking to accommodate delayed arrivals.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUs;