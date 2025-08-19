import { FileText, Users, AlertTriangle, Scale } from 'lucide-react';

const TermsConditions = () => {
  return (
    <div className="min-h-screen bg-amber-50 font-sans">
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-500 text-white">
            <FileText className="h-8 w-8" />
          </div>
          <h1 className="mb-2 font-serif text-3xl text-amber-900">Terms and Conditions</h1>
          <p className="text-gray-600">Please read these terms carefully before using Aaraadhya</p>
          <p className="text-sm text-gray-500">Last updated: August 20, 2025</p>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-4xl">
          <div className="rounded-lg border border-amber-100 bg-white p-6 shadow-sm md:p-8">
            
            {/* Agreement */}
            <section className="mb-8">
              <div className="mb-4 flex items-center">
                <Scale className="mr-3 h-6 w-6 text-orange-500" />
                <h2 className="font-serif text-xl text-amber-900">Agreement</h2>
              </div>
              <p className="mb-4 text-gray-700 leading-relaxed">
                By accessing and using Aaraadhya's platform, website, mobile applications, and related services 
                (collectively, the "Services"), you agree to be bound by these Terms and Conditions ("Terms").
              </p>
              <div className="rounded-lg bg-orange-50 border border-orange-200 p-4">
                <p className="text-sm text-orange-800">
                  <strong>Important:</strong> If you do not agree with any of these terms, please do not use our Services.
                </p>
              </div>
            </section>

            {/* Service Description */}
            <section className="mb-8">
              <div className="mb-4 flex items-center">
                <Users className="mr-3 h-6 w-6 text-orange-500" />
                <h2 className="font-serif text-xl text-amber-900">Our Services</h2>
              </div>
              <p className="mb-4 text-gray-700 leading-relaxed">
                Aaraadhya is a digital platform that provides:
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg bg-amber-50 p-4">
                  <h3 className="mb-2 font-medium text-amber-900">Temple Discovery</h3>
                  <p className="text-sm text-gray-600">
                    Information about temples, their timings, festivals, and spiritual significance.
                  </p>
                </div>
                <div className="rounded-lg bg-amber-50 p-4">
                  <h3 className="mb-2 font-medium text-amber-900">Devotee Store</h3>
                  <p className="text-sm text-gray-600">
                    Religious items, books, and devotional materials for purchase.
                  </p>
                </div>
                <div className="rounded-lg bg-amber-50 p-4">
                  <h3 className="mb-2 font-medium text-amber-900">Community Features</h3>
                  <p className="text-sm text-gray-600">
                    Connect with other devotees and share spiritual experiences.
                  </p>
                </div>
                <div className="rounded-lg bg-amber-50 p-4">
                  <h3 className="mb-2 font-medium text-amber-900">Educational Content</h3>
                  <p className="text-sm text-gray-600">
                    Articles, guides, and resources about Hindu traditions and practices.
                  </p>
                </div>
              </div>
            </section>

            {/* User Responsibilities */}
            <section className="mb-8">
              <div className="mb-4 flex items-center">
                <AlertTriangle className="mr-3 h-6 w-6 text-orange-500" />
                <h2 className="font-serif text-xl text-amber-900">User Responsibilities</h2>
              </div>
              
              <div className="space-y-4">
                <div className="rounded-lg border border-amber-200 bg-white p-4">
                  <h3 className="mb-2 font-medium text-amber-900">Account Security</h3>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• Maintain the confidentiality of your account credentials</li>
                    <li>• Notify us immediately of any unauthorized access</li>
                    <li>• Provide accurate and up-to-date information</li>
                    <li>• Use the service only for lawful purposes</li>
                  </ul>
                </div>
                
                <div className="rounded-lg border border-amber-200 bg-white p-4">
                  <h3 className="mb-2 font-medium text-amber-900">Prohibited Activities</h3>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• Posting offensive, inappropriate, or harmful content</li>
                    <li>• Attempting to hack, disrupt, or damage our systems</li>
                    <li>• Impersonating others or providing false information</li>
                    <li>• Using the service for commercial purposes without permission</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Payments and Refunds */}
            <section className="mb-8">
              <h2 className="mb-4 font-serif text-xl text-amber-900">Payments and Refunds</h2>
              <div className="space-y-4">
                <div className="rounded-lg bg-green-50 border border-green-200 p-4">
                  <h3 className="mb-2 font-medium text-green-900">Payment Terms</h3>
                  <p className="text-sm text-green-800">
                    All purchases through our Devotee Store are processed securely. Prices are subject 
                    to change without notice. We accept major credit cards, debit cards, and UPI payments.
                  </p>
                </div>
                
                <div className="rounded-lg bg-blue-50 border border-blue-200 p-4">
                  <h3 className="mb-2 font-medium text-blue-900">Refund Policy</h3>
                  <p className="text-sm text-blue-800">
                    Refunds are processed according to our separate Cancellation and Refund Policy. 
                    Digital products may have different refund terms than physical items.
                  </p>
                </div>
              </div>
            </section>

            {/* Intellectual Property */}
            <section className="mb-8">
              <h2 className="mb-4 font-serif text-xl text-amber-900">Intellectual Property</h2>
              <div className="rounded-lg bg-purple-50 border border-purple-200 p-4">
                <p className="mb-2 text-purple-800">
                  All content on Aaraadhya, including text, images, videos, logos, and software, 
                  is protected by intellectual property laws and belongs to Aaraadhya or its licensors.
                </p>
                <p className="text-sm text-purple-700">
                  You may not copy, modify, distribute, or reproduce any content without our express written permission.
                </p>
              </div>
            </section>

            {/* Disclaimers */}
            <section className="mb-8">
              <h2 className="mb-4 font-serif text-xl text-amber-900">Disclaimers</h2>
              <div className="space-y-3">
                <div className="rounded-lg bg-yellow-50 border border-yellow-200 p-4">
                  <h3 className="mb-2 font-medium text-yellow-900">Religious Information</h3>
                  <p className="text-sm text-yellow-800">
                    While we strive for accuracy, temple timings, festivals, and other information 
                    may change. Please verify details directly with temples before visiting.
                  </p>
                </div>
                
                <div className="rounded-lg bg-red-50 border border-red-200 p-4">
                  <h3 className="mb-2 font-medium text-red-900">Service Availability</h3>
                  <p className="text-sm text-red-800">
                    Our services are provided "as is" without warranties. We do not guarantee 
                    uninterrupted access or error-free operation.
                  </p>
                </div>
              </div>
            </section>

            {/* Limitation of Liability */}
            <section className="mb-8">
              <h2 className="mb-4 font-serif text-xl text-amber-900">Limitation of Liability</h2>
              <div className="rounded-lg bg-gray-50 border border-gray-200 p-4">
                <p className="text-sm text-gray-700">
                  Aaraadhya shall not be liable for any indirect, incidental, special, or consequential 
                  damages resulting from your use of our services. Our total liability is limited to 
                  the amount you paid for our services in the 12 months preceding any claim.
                </p>
              </div>
            </section>

            {/* Changes to Terms */}
            <section className="mb-8">
              <h2 className="mb-4 font-serif text-xl text-amber-900">Changes to Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to modify these Terms at any time. We will notify users of 
                significant changes via email or through our platform. Continued use after changes 
                constitutes acceptance of the new Terms.
              </p>
            </section>

            {/* Contact */}
            <section className="mb-6">
              <h2 className="mb-4 font-serif text-xl text-amber-900">Contact Us</h2>
              <div className="rounded-lg bg-orange-50 p-4">
                <p className="mb-2 text-gray-700">
                  For questions about these Terms and Conditions, please contact us:
                </p>
                <div className="text-sm text-gray-600">
                  <p>Email: legal@aaraadhya.in</p>
                  <p>Phone: +91 9400446095</p>
                  <p>Address: Krishnamana Illam, Cheravally,</p>
                  <p>Kayamkulam P.O., Alappuzha, Kerala - 690502</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TermsConditions;