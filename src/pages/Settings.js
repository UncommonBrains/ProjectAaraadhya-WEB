import React, { useState } from "react";
import {
  User,
  Key,
  Link,
  Bell,
  CreditCard,
  ShieldCheck,
  Languages,
  HelpCircle,
  Trash2,
  ChevronRight,
  Edit3,
  LogOut,
  AlignLeft,
  Calendar,
  Heart,
  FileText,
  Smartphone,
  Moon,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const Settings = () => {
  const [activeSection, setActiveSection] = useState("profile");

  // Settings sections with their icons and content components
  const sections = [
    {
      id: "profile",
      title: "Profile Settings",
      icon: <User className="w-5 h-5" />,
      component: <ProfileSettings />,
    },
    {
      id: "notifications",
      title: "Notification Preferences",
      icon: <Bell className="w-5 h-5" />,
      component: <NotificationSettings />,
    },
    {
      id: "temples",
      title: "Temple Preferences",
      icon: <Heart className="w-5 h-5" />,
      component: <TemplePreferences />,
    },
    {
      id: "payment",
      title: "Payment & Donations",
      icon: <CreditCard className="w-5 h-5" />,
      component: <PaymentSettings />,
    },
    {
      id: "privacy",
      title: "Privacy & Security",
      icon: <ShieldCheck className="w-5 h-5" />,
      component: <PrivacySettings />,
    },
    {
      id: "language",
      title: "Language & Accessibility",
      icon: <Languages className="w-5 h-5" />,
      component: <LanguageSettings />,
    },
    {
      id: "support",
      title: "Support & Help",
      icon: <HelpCircle className="w-5 h-5" />,
      component: <SupportHelp />,
    },
    {
      id: "account",
      title: "Account Actions",
      icon: <Trash2 className="w-5 h-5 text-red-500" />,
      component: <AccountActions />,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-2xl font-serif text-amber-900 font-bold mb-8">
        Settings
      </h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-80 bg-amber-50 rounded-lg p-4 h-fit">
          <nav>
            <ul className="space-y-1">
              {sections.map((section) => (
                <li key={section.id}>
                  <button
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center px-4 py-3 rounded-md text-left transition-colors ${activeSection === section.id
                      ? "bg-amber-100 text-amber-900 font-medium"
                      : "text-gray-600 hover:bg-amber-100/50"
                      }`}
                  >
                    <span className="mr-3">{section.icon}</span>
                    <span>{section.title}</span>
                    {activeSection === section.id && (
                      <ChevronRight className="ml-auto h-4 w-4" />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 bg-white rounded-lg border border-amber-100 p-6">
          {sections.find((section) => section.id === activeSection)?.component}
        </main>
      </div>
    </div>
  );
};

// Individual Settings Section Components
const ProfileSettings = () => {
  return (
    <div className="space-y-8">
      <h2 className="text-xl font-serif text-amber-900 font-bold pb-2 border-b border-amber-100">
        Profile Settings
      </h2>

      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="relative">
            <div className="bg-amber-600 rounded-full w-24 h-24 flex items-center justify-center text-white font-medium text-3xl">
              R
            </div>
            <button className="absolute bottom-0 right-0 bg-amber-100 rounded-full p-2 border border-amber-200 hover:bg-amber-200 transition-colors">
              <Edit3 className="w-4 h-4 text-amber-800" />
            </button>
          </div>

          <div className="flex-1">
            <h3 className="text-lg font-medium text-amber-900">Ramesh Kumar</h3>
            <p className="text-gray-500">ramesh@example.com</p>
          </div>

          <button className="px-4 py-2 bg-amber-50 hover:bg-amber-100 text-amber-900 rounded-md flex items-center gap-2 transition-colors">
            <Edit3 className="w-4 h-4" />
            Edit Profile
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SettingsCard
            title="Personal Information"
            icon={<User className="w-5 h-5" />}
            description="Update your name, email, phone number and profile picture"
          />

          <NavLink to="/reset-password">
            <SettingsCard
              title="Change Password"
              icon={<Key className="w-5 h-5" />}
              description="Securely update your password to keep your account safe"
            />
          </NavLink>

          <SettingsCard
            title="Manage Linked Accounts"
            icon={<Link className="w-5 h-5" />}
            description="Connect with Google, Facebook, Apple accounts"
          />
        </div>
      </div>
    </div>
  );
};

const NotificationSettings = () => {
  return (
    <div className="space-y-8">
      <h2 className="text-xl font-serif text-amber-900 font-bold pb-2 border-b border-amber-100">
        Notification Preferences
      </h2>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SettingsCard
            title="Push Notifications"
            icon={<Bell className="w-5 h-5" />}
            description="Manage notifications for poojas, events and community updates"
            toggle={true}
          />

          <SettingsCard
            title="Email & SMS Alerts"
            icon={<FileText className="w-5 h-5" />}
            description="Subscription, donation receipts, and event reminders"
            toggle={true}
          />

          <SettingsCard
            title="Temple-Specific Updates"
            icon={<Calendar className="w-5 h-5" />}
            description="Choose favorite temples for personalized notifications"
          />
        </div>
      </div>
    </div>
  );
};

const TemplePreferences = () => {
  return (
    <div className="space-y-8">
      <h2 className="text-xl font-serif text-amber-900 font-bold pb-2 border-b border-amber-100">
        Temple Preferences
      </h2>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SettingsCard
            title="Followed Temples"
            icon={<Heart className="w-5 h-5" />}
            description="Manage list of followed temples and their updates"
          />

          <SettingsCard
            title="Temple Service Subscriptions"
            icon={<Calendar className="w-5 h-5" />}
            description="Auto-reminders for bookings, donations, and poojas"
            toggle={true}
          />
        </div>
      </div>
    </div>
  );
};

const PaymentSettings = () => {
  return (
    <div className="space-y-8">
      <h2 className="text-xl font-serif text-amber-900 font-bold pb-2 border-b border-amber-100">
        Payment & Donations
      </h2>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SettingsCard
            title="Saved Payment Methods"
            icon={<CreditCard className="w-5 h-5" />}
            description="Manage UPI, cards, and wallets for quick payments"
          />

          <SettingsCard
            title="Transaction History"
            icon={<FileText className="w-5 h-5" />}
            description="View past donations, ticket bookings, etc."
          />

          <SettingsCard
            title="Auto-Deduction for Monthly Donations"
            icon={<Calendar className="w-5 h-5" />}
            description="Enable recurring donations to your favorite temples"
            toggle={true}
          />
        </div>
      </div>
    </div>
  );
};

const PrivacySettings = () => {
  return (
    <div className="space-y-8">
      <h2 className="text-xl font-serif text-amber-900 font-bold pb-2 border-b border-amber-100">
        Privacy & Security
      </h2>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SettingsCard
            title="Data Sharing Preferences"
            icon={<ShieldCheck className="w-5 h-5" />}
            description="Choose what information temples can see about you"
          />

          <SettingsCard
            title="Two-Factor Authentication"
            icon={<Smartphone className="w-5 h-5" />}
            description="Add an extra layer of security to your account"
            toggle={true}
          />

          <SettingsCard
            title="Device Management"
            icon={<Smartphone className="w-5 h-5" />}
            description="See and log out of active sessions on other devices"
          />
        </div>
      </div>
    </div>
  );
};

const LanguageSettings = () => {
  return (
    <div className="space-y-8">
      <h2 className="text-xl font-serif text-amber-900 font-bold pb-2 border-b border-amber-100">
        Language & Accessibility
      </h2>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SettingsCard
            title="Change Language"
            icon={<Languages className="w-5 h-5" />}
            description="Support for Malayalam, Sanskrit, Hindi, English, etc."
          />

          <SettingsCard
            title="Larger Text"
            icon={<AlignLeft className="w-5 h-5" />}
            description="Increase text size for better readability"
            toggle={true}
          />

          <SettingsCard
            title="High Contrast Mode"
            icon={<Moon className="w-5 h-5" />}
            description="For better accessibility and viewing comfort"
            toggle={true}
          />
        </div>
      </div>
    </div>
  );
};

const SupportHelp = () => {
  return (
    <div className="space-y-8">
      <h2 className="text-xl font-serif text-amber-900 font-bold pb-2 border-b border-amber-100">
        Support & Help
      </h2>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SettingsCard
            title="FAQs"
            icon={<HelpCircle className="w-5 h-5" />}
            description="Find answers to commonly asked questions"
          />

          <SettingsCard
            title="Contact Support"
            icon={<HelpCircle className="w-5 h-5" />}
            description="Connect with our support team for assistance"
          />

          <SettingsCard
            title="Report an Issue"
            icon={<HelpCircle className="w-5 h-5" />}
            description="Let us know if you're experiencing any problems"
          />
        </div>
      </div>
    </div>
  );
};

const AccountActions = () => {
  return (
    <div className="space-y-8">
      <h2 className="text-xl font-serif text-amber-900 font-bold pb-2 border-b border-amber-100">
        Account Actions
      </h2>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SettingsCard
            title="Delete Account"
            icon={<Trash2 className="w-5 h-5 text-red-500" />}
            description="Permanently remove your account and all data"
            danger={true}
          />

          <SettingsCard
            title="Logout"
            icon={<LogOut className="w-5 h-5" />}
            description="Sign out of your account on this device"
          />
        </div>
      </div>
    </div>
  );
};

// Reusable Settings Card Component
const SettingsCard = ({
  title,
  icon,
  description,
  toggle = false,
  danger = false,
}) => {
  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <div
      className={`p-4 border rounded-lg ${danger ? "border-red-100" : "border-amber-100"
        } hover:shadow-sm transition-shadow`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <div
            className={`mt-0.5 p-2 rounded-full ${danger ? "bg-red-50" : "bg-amber-50"
              }`}
          >
            {icon}
          </div>
          <div>
            <h3
              className={`font-medium ${danger ? "text-red-500" : "text-amber-900"
                }`}
            >
              {title}
            </h3>
            <p className="text-sm text-gray-500 mt-1">{description}</p>
          </div>
        </div>
        {toggle ? (
          <button
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isEnabled ? "bg-amber-500" : "bg-gray-200"
              }`}
            onClick={() => setIsEnabled(!isEnabled)}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isEnabled ? "translate-x-6" : "translate-x-1"
                }`}
            />
          </button>
        ) : (
          <button
            className={`p-2 rounded-full hover:bg-amber-50 transition-colors ${danger ? "text-red-500" : "text-amber-700"
              }`}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Settings;
