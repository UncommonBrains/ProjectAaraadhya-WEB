import { Shield, Eye, Lock, UserCheck } from 'lucide-react';
import {companyInfo} from '../../../components/companyInfo'


const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-amber-50 font-sans">
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-500 text-white">
            <Shield className="h-8 w-8" />
          </div>
          <h1 className="mb-2 font-serif text-3xl text-amber-900">Privacy Policy</h1>
          <p className="text-gray-600">Your privacy is important to us at {companyInfo.name}</p>
          <p className="text-sm text-gray-500">Last updated: August 20, 2025</p>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-4xl">
          <div className="rounded-lg border border-amber-100 bg-white p-6 shadow-sm md:p-8">
            
            {/* Introduction */}
            <section className="mb-8">
              <div className="mb-4 flex items-center">
                <Eye className="mr-3 h-6 w-6 text-orange-500" />
                <h2 className="font-serif text-xl text-amber-900">Introduction</h2>
              </div>
              <p className="mb-4 text-gray-700 leading-relaxed">
                At {companyInfo.name}, we respect your privacy and are committed to protecting your personal data. 
                This privacy policy explains how we collect, use, and safeguard your information when you 
                use our temple discovery and devotional services platform.
              </p>
              <p className="text-gray-700 leading-relaxed">
                This policy applies to all information collected through our website, mobile applications, 
                and related services (collectively referred to as "Services").
              </p>
            </section>

            {/* Information We Collect */}
            <section className="mb-8">
              <div className="mb-4 flex items-center">
                <UserCheck className="mr-3 h-6 w-6 text-orange-500" />
                <h2 className="font-serif text-xl text-amber-900">Information We Collect</h2>
              </div>
              
              <div className="space-y-4">
                <div className="rounded-lg bg-amber-50 p-4">
                  <h3 className="mb-2 font-medium text-amber-900">Personal Information</h3>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• Name, email address, and phone number</li>
                    <li>• Profile information and preferences</li>
                    <li>• Location data (with your consent)</li>
                    <li>• Payment information for store purchases</li>
                  </ul>
                </div>
                
                <div className="rounded-lg bg-amber-50 p-4">
                  <h3 className="mb-2 font-medium text-amber-900">Usage Information</h3>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• Device information and identifiers</li>
                    <li>• App usage patterns and preferences</li>
                    <li>• Temple visits and search history</li>
                    <li>• Interaction with content and features</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* How We Use Information */}
            <section className="mb-8">
              <div className="mb-4 flex items-center">
                <Lock className="mr-3 h-6 w-6 text-orange-500" />
                <h2 className="font-serif text-xl text-amber-900">How We Use Your Information</h2>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border border-amber-200 bg-white p-4">
                  <h3 className="mb-2 font-medium text-amber-900">Service Provision</h3>
                  <p className="text-sm text-gray-600">
                    To provide and maintain our services, process transactions, 
                    and respond to your requests.
                  </p>
                </div>
                
                <div className="rounded-lg border border-amber-200 bg-white p-4">
                  <h3 className="mb-2 font-medium text-amber-900">Personalization</h3>
                  <p className="text-sm text-gray-600">
                    To personalize your experience and provide relevant 
                    temple recommendations.
                  </p>
                </div>
                
                <div className="rounded-lg border border-amber-200 bg-white p-4">
                  <h3 className="mb-2 font-medium text-amber-900">Communication</h3>
                  <p className="text-sm text-gray-600">
                    To send you updates, notifications, and marketing 
                    communications (with consent).
                  </p>
                </div>
                
                <div className="rounded-lg border border-amber-200 bg-white p-4">
                  <h3 className="mb-2 font-medium text-amber-900">Improvement</h3>
                  <p className="text-sm text-gray-600">
                    To analyze usage patterns and improve our services 
                    and user experience.
                  </p>
                </div>
              </div>
            </section>

            {/* Data Sharing */}
            <section className="mb-8">
              <h2 className="mb-4 font-serif text-xl text-amber-900">Information Sharing</h2>
              <div className="rounded-lg bg-red-50 border border-red-200 p-4">
                <p className="text-sm text-red-800">
                  <strong>We do not sell your personal data.</strong> We may share information only in the following circumstances:
                </p>
                <ul className="mt-2 space-y-1 text-sm text-red-700">
                  <li>• With your explicit consent</li>
                  <li>• With service providers who assist our operations</li>
                  <li>• To comply with legal obligations</li>
                  <li>• To protect our rights and prevent fraud</li>
                </ul>
              </div>
            </section>

            {/* Your Rights */}
            <section className="mb-8">
              <h2 className="mb-4 font-serif text-xl text-amber-900">Your Rights</h2>
              <div className="grid gap-3 md:grid-cols-2">
                <div className="rounded bg-blue-50 p-3">
                  <h3 className="font-medium text-blue-900">Access & Correction</h3>
                  <p className="text-sm text-blue-700">View and update your personal information</p>
                </div>
                <div className="rounded bg-blue-50 p-3">
                  <h3 className="font-medium text-blue-900">Data Portability</h3>
                  <p className="text-sm text-blue-700">Request a copy of your data</p>
                </div>
                <div className="rounded bg-blue-50 p-3">
                  <h3 className="font-medium text-blue-900">Deletion</h3>
                  <p className="text-sm text-blue-700">Request deletion of your account</p>
                </div>
                <div className="rounded bg-blue-50 p-3">
                  <h3 className="font-medium text-blue-900">Opt-out</h3>
                  <p className="text-sm text-blue-700">Unsubscribe from communications</p>
                </div>
              </div>
            </section>

            {/* Contact */}
            <section className="mb-6">
              <h2 className="mb-4 font-serif text-xl text-amber-900">Contact Us</h2>
              <div className="rounded-lg bg-orange-50 p-4">
                <p className="mb-2 text-gray-700">
                  If you have questions about this privacy policy or our practices, please contact us:
                </p>
                <div className="text-sm text-gray-600">
                  <p>Email: {companyInfo.emails.privacy}</p>
                  <p>Phone: {companyInfo.numbers.primary}</p>
                  <p>Address: {companyInfo.name}, {companyInfo.address.address}, {companyInfo.address.locality}, {companyInfo.address.city}, {companyInfo.address.state}</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicy;