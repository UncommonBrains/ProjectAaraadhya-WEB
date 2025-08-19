import { ArrowLeft, RefreshCw, Shield, Clock, AlertCircle } from 'lucide-react';

const CancellationAndRefund = () => {
  return (
    <div className="min-h-screen bg-amber-50 font-sans">
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <button className="mb-4 inline-flex items-center text-amber-700 hover:text-amber-900">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </button>
          <h1 className="font-serif text-3xl text-amber-900 mb-2">Cancellation & Refund Policy</h1>
          <p className="text-gray-600">Last updated: January 2025</p>
        </div>

        {/* Main Content */}
        <div className="grid gap-8 md:grid-cols-3">
          {/* Content Area */}
          <div className="md:col-span-2 space-y-8">
            {/* Overview Section */}
            <div className="rounded-lg border border-amber-100 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center">
                <Shield className="mr-3 h-6 w-6 text-orange-500" />
                <h2 className="font-serif text-xl text-amber-900">Policy Overview</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                At Aaraadhya, we understand that plans can change. This policy outlines our 
                cancellation and refund procedures for various services including temple bookings, 
                puja services, and devotee store purchases.
              </p>
            </div>

            {/* Temple Services Section */}
            <div className="rounded-lg border border-amber-100 bg-white p-6 shadow-sm">
              <h3 className="font-serif text-lg text-amber-900 mb-4">Temple Services & Bookings</h3>
              
              <div className="space-y-4">
                <div className="border-l-4 border-orange-200 bg-orange-50 p-4">
                  <h4 className="font-medium text-amber-900 mb-2">Puja & Ritual Bookings</h4>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• Cancellation allowed up to 24 hours before scheduled time</li>
                    <li>• Full refund for cancellations made 48+ hours in advance</li>
                    <li>• 50% refund for cancellations made 24-48 hours in advance</li>
                    <li>• No refund for cancellations made less than 24 hours</li>
                  </ul>
                </div>

                <div className="border-l-4 border-blue-200 bg-blue-50 p-4">
                  <h4 className="font-medium text-amber-900 mb-2">Special Events & Festivals</h4>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• Cancellation allowed up to 7 days before event</li>
                    <li>• 80% refund for cancellations made 7+ days in advance</li>
                    <li>• 40% refund for cancellations made 3-7 days in advance</li>
                    <li>• No refund for cancellations made less than 3 days</li>
                  </ul>
                </div>

                <div className="border-l-4 border-green-200 bg-green-50 p-4">
                  <h4 className="font-medium text-amber-900 mb-2">Temple Visits & Tours</h4>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• Free cancellation up to 2 hours before visit</li>
                    <li>• Full refund for weather-related cancellations</li>
                    <li>• Rescheduling available at no additional cost</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Store Items Section */}
            <div className="rounded-lg border border-amber-100 bg-white p-6 shadow-sm">
              <h3 className="font-serif text-lg text-amber-900 mb-4">Devotee Store Items</h3>
              
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="border border-amber-100 rounded p-4">
                    <h4 className="font-medium text-amber-900 mb-2">Physical Items</h4>
                    <ul className="text-gray-600 text-sm space-y-1">
                      <li>• 30-day return policy</li>
                      <li>• Items must be unused and in original packaging</li>
                      <li>• Free returns for defective items</li>
                      <li>• Customer pays return shipping for exchanges</li>
                    </ul>
                  </div>

                  <div className="border border-amber-100 rounded p-4">
                    <h4 className="font-medium text-amber-900 mb-2">Digital Content</h4>
                    <ul className="text-gray-600 text-sm space-y-1">
                      <li>• 14-day refund policy</li>
                      <li>• Must not have been downloaded/accessed</li>
                      <li>• No refund after content is consumed</li>
                      <li>• Technical issues eligible for full refund</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Refund Process Section */}
            <div className="rounded-lg border border-amber-100 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center">
                <RefreshCw className="mr-3 h-6 w-6 text-orange-500" />
                <h3 className="font-serif text-lg text-amber-900">Refund Process</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 text-orange-500 font-medium text-sm">1</div>
                  <div className="ml-4">
                    <h4 className="font-medium text-amber-900">Submit Request</h4>
                    <p className="text-gray-600 text-sm">Contact our support team or use the cancellation option in your account</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 text-orange-500 font-medium text-sm">2</div>
                  <div className="ml-4">
                    <h4 className="font-medium text-amber-900">Review Process</h4>
                    <p className="text-gray-600 text-sm">Our team reviews your request within 24-48 hours</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 text-orange-500 font-medium text-sm">3</div>
                  <div className="ml-4">
                    <h4 className="font-medium text-amber-900">Refund Processing</h4>
                    <p className="text-gray-600 text-sm">Approved refunds are processed within 5-7 business days</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Special Circumstances */}
            <div className="rounded-lg border border-amber-100 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center">
                <AlertCircle className="mr-3 h-6 w-6 text-orange-500" />
                <h3 className="font-serif text-lg text-amber-900">Special Circumstances</h3>
              </div>
              
              <div className="space-y-3">
                <div className="bg-amber-50 rounded p-3">
                  <h4 className="font-medium text-amber-900 mb-1">Medical Emergencies</h4>
                  <p className="text-gray-600 text-sm">Full refunds available with valid medical documentation</p>
                </div>

                <div className="bg-amber-50 rounded p-3">
                  <h4 className="font-medium text-amber-900 mb-1">Natural Disasters</h4>
                  <p className="text-gray-600 text-sm">Full refunds or free rescheduling for weather/disaster-related cancellations</p>
                </div>

                <div className="bg-amber-50 rounded p-3">
                  <h4 className="font-medium text-amber-900 mb-1">Temple Closures</h4>
                  <p className="text-gray-600 text-sm">Full refunds if temple is unexpectedly closed due to circumstances beyond control</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Contact */}
            <div className="rounded-lg border border-amber-100 bg-white p-4 shadow-sm">
              <h3 className="font-serif text-amber-900 mb-3">Need Help?</h3>
              <div className="space-y-3">
                <button className="block w-full rounded-lg bg-orange-500 py-2 px-4 text-center text-sm font-medium text-white hover:bg-orange-600">
                  Contact Support
                </button>
                <div className="text-center text-sm text-gray-600">
                  <p>Response within 24 hours</p>
                  <p className="text-xs text-gray-500 mt-1">Monday - Saturday, 9 AM - 6 PM</p>
                </div>
              </div>
            </div>

            {/* Processing Times */}
            <div className="rounded-lg border border-amber-100 bg-white p-4 shadow-sm">
              <div className="mb-3 flex items-center">
                <Clock className="mr-2 h-5 w-5 text-orange-500" />
                <h3 className="font-serif text-amber-900">Processing Times</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">UPI/Wallet</span>
                  <span className="font-medium text-amber-900">1-2 days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Credit Card</span>
                  <span className="font-medium text-amber-900">3-5 days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Bank Transfer</span>
                  <span className="font-medium text-amber-900">5-7 days</span>
                </div>
              </div>
            </div>

            {/* Related Links */}
            <div className="rounded-lg border border-amber-100 bg-white p-4 shadow-sm">
              <h3 className="font-serif text-amber-900 mb-3">Related Information</h3>
              <div className="space-y-2">
                <button className="block w-full text-left text-sm text-orange-500 hover:text-orange-600">
                  Terms of Service
                </button>
                <button className="block w-full text-left text-sm text-orange-500 hover:text-orange-600">
                  Privacy Policy
                </button>
                <button className="block w-full text-left text-sm text-orange-500 hover:text-orange-600">
                  Shipping & Delivery
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CancellationAndRefund;