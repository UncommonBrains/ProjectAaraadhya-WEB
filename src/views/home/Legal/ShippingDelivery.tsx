import { Truck, Clock, MapPin, Shield, Package, CheckCircle } from 'lucide-react';
import {numbers, emails, address, companyName} from '../../../components/contacts'


const ShippingDelivery = () => {
  return (
    <div className="min-h-screen bg-amber-50 font-sans">
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <h1 className="font-serif text-3xl text-amber-900 mb-2">Shipping & Delivery</h1>
          <p className="text-gray-600">Fast, secure delivery of sacred items to your doorstep</p>
        </div>

        {/* Delivery Options */}
        <div className="mb-12 grid gap-6 md:grid-cols-3">
          <div className="rounded-lg border border-amber-100 bg-white p-6 shadow-sm text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100">
              <Truck className="h-8 w-8 text-orange-500" />
            </div>
            <h3 className="font-serif text-lg text-amber-900 mb-2">Standard Delivery</h3>
            <p className="text-sm text-gray-600 mb-3">5-7 business days</p>
            <p className="text-xs text-gray-500">Free shipping on orders above ₹500</p>
          </div>

          <div className="rounded-lg border border-amber-100 bg-white p-6 shadow-sm text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
              <Clock className="h-8 w-8 text-blue-500" />
            </div>
            <h3 className="font-serif text-lg text-amber-900 mb-2">Express Delivery</h3>
            <p className="text-sm text-gray-600 mb-3">2-3 business days</p>
            <p className="text-xs text-gray-500">Additional ₹99 shipping charge</p>
          </div>

          <div className="rounded-lg border border-amber-100 bg-white p-6 shadow-sm text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <MapPin className="h-8 w-8 text-green-500" />
            </div>
            <h3 className="font-serif text-lg text-amber-900 mb-2">Same Day Delivery</h3>
            <p className="text-sm text-gray-600 mb-3">Within 24 hours</p>
            <p className="text-xs text-gray-500">Available in select cities only</p>
          </div>
        </div>

        {/* Shipping Information */}
        <div className="mb-8 rounded-lg border border-amber-100 bg-white p-6 shadow-sm">
          <h2 className="font-serif text-xl text-amber-900 mb-6">Shipping Information</h2>
          
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="font-medium text-gray-700 mb-3 flex items-center">
                <Package className="mr-2 h-5 w-5 text-orange-500" />
                Order Processing
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <CheckCircle className="mr-2 h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Orders placed before 2:00 PM are processed the same day
                </li>
                <li className="flex items-start">
                  <CheckCircle className="mr-2 h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Orders placed after 2:00 PM are processed the next business day
                </li>
                <li className="flex items-start">
                  <CheckCircle className="mr-2 h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  We don't process orders on Sundays and public holidays
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-gray-700 mb-3 flex items-center">
                <Shield className="mr-2 h-5 w-5 text-orange-500" />
                Packaging & Safety
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <CheckCircle className="mr-2 h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  All items are carefully packed with protective materials
                </li>
                <li className="flex items-start">
                  <CheckCircle className="mr-2 h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Fragile religious items receive special handling
                </li>
                <li className="flex items-start">
                  <CheckCircle className="mr-2 h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Temperature-controlled shipping for prasadam items
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Delivery Areas */}
        <div className="mb-8 rounded-lg border border-amber-100 bg-white p-6 shadow-sm">
          <h2 className="font-serif text-xl text-amber-900 mb-4">Delivery Areas</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded bg-amber-50 p-4">
              <h4 className="font-medium text-amber-900 mb-2">Pan India</h4>
              <p className="text-sm text-gray-600">We deliver to all major cities and towns across India</p>
            </div>
            <div className="rounded bg-blue-50 p-4">
              <h4 className="font-medium text-blue-900 mb-2">Metro Cities</h4>
              <p className="text-sm text-gray-600">Same-day delivery available in Delhi, Mumbai, Bangalore, Chennai</p>
            </div>
            <div className="rounded bg-green-50 p-4">
              <h4 className="font-medium text-green-900 mb-2">Tier 2 Cities</h4>
              <p className="text-sm text-gray-600">Express delivery to 100+ cities</p>
            </div>
            <div className="rounded bg-purple-50 p-4">
              <h4 className="font-medium text-purple-900 mb-2">Rural Areas</h4>
              <p className="text-sm text-gray-600">Standard delivery to remote locations</p>
            </div>
          </div>
        </div>

        {/* Shipping Charges */}
        <div className="mb-8 rounded-lg border border-amber-100 bg-white p-6 shadow-sm">
          <h2 className="font-serif text-xl text-amber-900 mb-4">Shipping Charges</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-amber-50">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-amber-900">Order Value</th>
                  <th className="px-4 py-3 text-left font-medium text-amber-900">Standard Delivery</th>
                  <th className="px-4 py-3 text-left font-medium text-amber-900">Express Delivery</th>
                  <th className="px-4 py-3 text-left font-medium text-amber-900">Same Day</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-amber-100">
                <tr>
                  <td className="px-4 py-3 text-gray-600">Below ₹500</td>
                  <td className="px-4 py-3 text-gray-600">₹49</td>
                  <td className="px-4 py-3 text-gray-600">₹149</td>
                  <td className="px-4 py-3 text-gray-600">₹199</td>
                </tr>
                <tr className="bg-green-50">
                  <td className="px-4 py-3 text-gray-600">₹500 - ₹999</td>
                  <td className="px-4 py-3 font-medium text-green-600">FREE</td>
                  <td className="px-4 py-3 text-gray-600">₹99</td>
                  <td className="px-4 py-3 text-gray-600">₹149</td>
                </tr>
                <tr className="bg-green-50">
                  <td className="px-4 py-3 text-gray-600">Above ₹1000</td>
                  <td className="px-4 py-3 font-medium text-green-600">FREE</td>
                  <td className="px-4 py-3 font-medium text-green-600">FREE</td>
                  <td className="px-4 py-3 text-gray-600">₹99</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Contact Support */}
        <div className="rounded-lg border border-orange-200 bg-orange-50 p-6 text-center">
          <h3 className="font-serif text-lg text-orange-900 mb-2">Need Help with Your Order?</h3>
          <p className="text-sm text-gray-600 mb-4">Our customer support team is here to assist you</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={`tel:${numbers.primary}`} className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600">
              Call Us: {numbers.primary}
            </a>
            <a href={`mailto:${emails.support}`} className="rounded-lg border border-orange-500 px-4 py-2 text-sm font-medium text-orange-600 hover:bg-orange-100">
              Email Support
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ShippingDelivery;