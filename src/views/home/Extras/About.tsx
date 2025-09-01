import { Heart, Users, Smartphone, Target, Eye, CheckCircle } from 'lucide-react';
import {  MdTempleHindu } from 'react-icons/md';

import {companyInfo} from '../../../components/companyInfo'

const About = () => {
  return (
    <div className="min-h-screen bg-amber-50 font-sans">
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-500 text-white">
            <Heart className="h-8 w-8" />
          </div>
          <h1 className="mb-2 font-serif text-3xl text-amber-900">About {companyInfo.name}</h1>
          <p className="text-lg text-gray-600 font-medium">Connecting Tradition with Technology</p>
          <p className="text-gray-500 mt-2">Bridging the gap between age-old traditions and modern innovation</p>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-4xl">
          <div className="rounded-lg border border-amber-100 bg-white p-6 shadow-sm md:p-8">
            
            {/* Introduction */}
            <section className="mb-8">
              <div className="mb-4 flex items-center">
                <MdTempleHindu className="mr-3 h-6 w-6 text-orange-500" />
                <h2 className="font-serif text-xl text-amber-900">Our Story</h2>
              </div>
              <p className="mb-4 text-gray-700 leading-relaxed">
                At <strong>{companyInfo.name}</strong>, we believe temples are not just places of worship—they are living centers of culture, tradition, and community. Our mission is to bridge the gap between age-old traditions and modern technology, making temples more accessible, organized, and connected to devotees everywhere.
              </p>
              <div className="rounded-lg bg-orange-50 border border-orange-200 p-4">
                <p className="text-sm text-orange-800">
                  <strong>Our Purpose:</strong> To preserve and strengthen our cultural roots in the digital era while making spiritual practices more accessible to all.
                </p>
              </div>
            </section>

            {/* Who We Are */}
            <section className="mb-8">
              <div className="mb-4 flex items-center">
                <Smartphone className="mr-3 h-6 w-6 text-orange-500" />
                <h2 className="font-serif text-xl text-amber-900">Who We Are</h2>
              </div>
              <p className="mb-4 text-gray-700 leading-relaxed">
                {companyInfo.name} is a digital platform designed exclusively for temples. We enable each temple to create its own verified profile, share updates in real time, and engage directly with devotees through offerings, poojas, and events—both online and offline.
              </p>
            </section>

            {/* Why Aaraadhya */}
            <section className="mb-8">
              <div className="mb-4 flex items-center">
                <CheckCircle className="mr-3 h-6 w-6 text-orange-500" />
                <h2 className="font-serif text-xl text-amber-900">Why {companyInfo.name}</h2>
              </div>
              
              <div className="grid gap-4 md:grid-cols-1">
                <div className="rounded-lg bg-green-50 border border-green-200 p-4">
                  <div className="flex items-start">
                    <CheckCircle className="mr-3 mt-1 h-5 w-5 text-green-600 flex-shrink-0" />
                    <div>
                      <h3 className="mb-2 font-medium text-green-900">For Temples</h3>
                      <p className="text-sm text-green-800">
                        A simple way to manage digital presence, share updates, and receive offerings.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="rounded-lg bg-blue-50 border border-blue-200 p-4">
                  <div className="flex items-start">
                    <CheckCircle className="mr-3 mt-1 h-5 w-5 text-blue-600 flex-shrink-0" />
                    <div>
                      <h3 className="mb-2 font-medium text-blue-900">For Devotees</h3>
                      <p className="text-sm text-blue-800">
                        A trusted space to follow temples, stay updated, and participate in spiritual activities without barriers.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="rounded-lg bg-purple-50 border border-purple-200 p-4">
                  <div className="flex items-start">
                    <CheckCircle className="mr-3 mt-1 h-5 w-5 text-purple-600 flex-shrink-0" />
                    <div>
                      <h3 className="mb-2 font-medium text-purple-900">For Tradition</h3>
                      <p className="text-sm text-purple-800">
                        A way to preserve and strengthen our cultural roots in the digital era.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Vision & Mission */}
            <section className="mb-8">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <div className="mb-4 flex items-center">
                    <Eye className="mr-3 h-6 w-6 text-orange-500" />
                    <h2 className="font-serif text-xl text-amber-900">Our Vision</h2>
                  </div>
                  <div className="rounded-lg bg-amber-50 border border-amber-200 p-4">
                    <p className="text-amber-800 leading-relaxed">
                      To become the <strong>most trusted digital ecosystem for temples</strong>, where every temple—big or small—has a voice, and every devotee feels connected.
                    </p>
                  </div>
                </div>
                
                <div>
                  <div className="mb-4 flex items-center">
                    <Target className="mr-3 h-6 w-6 text-orange-500" />
                    <h2 className="font-serif text-xl text-amber-900">Our Mission</h2>
                  </div>
                  <div className="space-y-3">
                    <div className="rounded-lg bg-orange-50 border border-orange-200 p-3">
                      <p className="text-sm text-orange-800">
                        Empower <strong>temple authorities</strong> with modern tools to manage and grow their temple community.
                      </p>
                    </div>
                    <div className="rounded-lg bg-orange-50 border border-orange-200 p-3">
                      <p className="text-sm text-orange-800">
                        Provide <strong>devotees</strong> with authentic, verified, and seamless access to temple updates and offerings.
                      </p>
                    </div>
                    <div className="rounded-lg bg-orange-50 border border-orange-200 p-3">
                      <p className="text-sm text-orange-800">
                        Build a <strong>centralized platform</strong> where tradition and technology walk hand in hand.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Our Services */}
            <section className="mb-8">
              <div className="mb-4 flex items-center">
                <Users className="mr-3 h-6 w-6 text-orange-500" />
                <h2 className="font-serif text-xl text-amber-900">What We Offer</h2>
              </div>
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

            {/* Tagline Section */}
            <section className="mb-8">
              <div className="rounded-lg bg-gradient-to-r from-orange-100 to-amber-100 border border-orange-200 p-6 text-center">
                <h2 className="font-serif text-2xl text-amber-900 mb-2">{companyInfo.name}</h2>
                <p className="text-lg font-medium text-orange-800">{companyInfo.tagline}</p>
              </div>
            </section>

            {/* Contact */}
            <section className="mb-6">
              <h2 className="mb-4 font-serif text-xl text-amber-900">Get in Touch</h2>
              <div className="rounded-lg bg-orange-50 p-4">
                <p className="mb-2 text-gray-700">
                  Ready to join our community or have questions about our platform?
                </p>
                <div className="text-sm text-gray-600">
                  <p>Email: {companyInfo.emails.support}</p>
                  <p>Phone: {companyInfo.numbers.primary}</p>
                  <p>Address: {companyInfo.address.address}, {companyInfo.address.locality}, {companyInfo.address.city}, {companyInfo.address.state} - {companyInfo.address.zip}</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;