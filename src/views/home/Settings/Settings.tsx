import React, { useState } from 'react';
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
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { SettingsCardProps } from './types';
import { useAuthContext } from '../../../context/common/AuthContext/AuthContext';
import { useConfirmation } from '../../../hooks/useConfirmation';
import { useSignoutViewModel } from '../../../view-models/auth/useSignoutViewModel';

// Configuration object to control which settings cards are enabled/disabled
const SETTINGS_CONFIG = {
  // Profile Settings
  personalInfo: false,
  changePassword: true,
  linkedAccounts: false,
  
  // Notification Settings
  pushNotifications: false,
  emailSmsAlerts: false,
  templeSpecificUpdates: false,
  
  // Temple Preferences
  followedTemples: false,
  templeSubscriptions: false,
  
  // Payment Settings
  savedPaymentMethods: false,
  transactionHistory: false,
  autoDeduction: false,
  
  // Privacy Settings
  dataSharing: false,
  twoFactorAuth: false,
  deviceManagement: false,
  
  // Language Settings
  changeLanguage: false,
  largerText: false,
  highContrast: false,
  
  // Support & Help
  faqs: false,  // Example: disabled by default
  contactSupport: true,
  reportIssue: false,
  
  // Account Actions
  deleteAccount: false,
  logout: true,
};

const Settings = () => {
  const [activeSection, setActiveSection] = useState('profile');


 
  // Settings sections with their icons and content components
  const sections = [
    {
      id: 'profile',
      title: 'Profile Settings',
      icon: <User className="h-5 w-5" />,
      component: <ProfileSettings />,
    },
    {
      id: 'notifications',
      title: 'Notification Preferences',
      icon: <Bell className="h-5 w-5" />,
      component: <NotificationSettings />,
    },
    {
      id: 'temples',
      title: 'Temple Preferences',
      icon: <Heart className="h-5 w-5" />,
      component: <TemplePreferences />,
    },
    {
      id: 'payment',
      title: 'Payment & Donations',
      icon: <CreditCard className="h-5 w-5" />,
      component: <PaymentSettings />,
    },
    {
      id: 'privacy',
      title: 'Privacy & Security',
      icon: <ShieldCheck className="h-5 w-5" />,
      component: <PrivacySettings />,
    },
    {
      id: 'language',
      title: 'Language & Accessibility',
      icon: <Languages className="h-5 w-5" />,
      component: <LanguageSettings />,
    },
    {
      id: 'support',
      title: 'Support & Help',
      icon: <HelpCircle className="h-5 w-5" />,
      component: <SupportHelp />,
    },
    {
      id: 'account',
      title: 'Account Actions',
      icon: <Trash2 className="h-5 w-5 text-red-500" />,
      component: <AccountActions />,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 font-serif text-2xl font-bold text-amber-900">Settings</h1>

      <div className="flex flex-col gap-8 md:flex-row">
        {/* Sidebar Navigation */}
        <aside className="h-fit w-full rounded-lg bg-amber-50 p-4 md:w-80">
          <nav>
            <ul className="space-y-1">
              {sections.map((section) => (
                <li key={section.id}>
                  <button
                    onClick={() => setActiveSection(section.id)}
                    className={`flex w-full items-center rounded-md px-4 py-3 text-left transition-colors ${
                      activeSection === section.id
                        ? 'bg-amber-100 font-medium text-amber-900'
                        : 'text-gray-600 hover:bg-amber-100/50'
                    }`}
                  >
                    <span className="mr-3">{section.icon}</span>
                    <span>{section.title}</span>
                    {activeSection === section.id && <ChevronRight className="ml-auto h-4 w-4" />}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 rounded-lg border border-amber-100 bg-white p-6">
          {sections.find((section) => section.id === activeSection)?.component}
        </main>
      </div>
    </div>
  );
};

// Individual Settings Section Components
const ProfileSettings = () => {
  const { user } = useAuthContext();

  return (
    <div className="space-y-8">
      <h2 className="border-b border-amber-100 pb-2 font-serif text-xl font-bold text-amber-900">
        Profile Settings
      </h2>

      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-amber-600 text-3xl font-medium text-white">
              {user?.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}
            </div>
            <button className="absolute right-0 bottom-0 rounded-full border border-amber-200 bg-amber-100 p-2 transition-colors hover:bg-amber-200">
              <Edit3 className="h-4 w-4 text-amber-800" />
            </button>
          </div>

          <div className="flex-1">
            <h3 className="text-lg font-medium text-amber-900">{user?.displayName}</h3>
            <p className="text-gray-500">{user?.email}</p>
          </div>

          <button className="flex items-center gap-2 rounded-md bg-amber-50 px-4 py-2 text-amber-900 transition-colors hover:bg-amber-100">
            <Edit3 className="h-4 w-4" />
            Edit Profile
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <SettingsCard
            title="Personal Information"
            icon={<User className="h-5 w-5" />}
            description="Update your name, email, phone number and profile picture"
            disabled={!SETTINGS_CONFIG.personalInfo}
          />

          <NavLink to="/reset-password">
            <SettingsCard
              title="Change Password"
              icon={<Key className="h-5 w-5" />}
              description="Securely update your password to keep your account safe"
              disabled={!SETTINGS_CONFIG.changePassword}
            />
          </NavLink>

          <SettingsCard
            title="Manage Linked Accounts"
            icon={<Link className="h-5 w-5" />}
            description="Connect with Google, Facebook, Apple accounts"
            disabled={!SETTINGS_CONFIG.linkedAccounts}
          />
        </div>
      </div>
    </div>
  );
};

const NotificationSettings = () => {
  return (
    <div className="space-y-8">
      <h2 className="border-b border-amber-100 pb-2 font-serif text-xl font-bold text-amber-900">
        Notification Preferences
      </h2>

      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-6">
          <SettingsCard
            title="Push Notifications"
            icon={<Bell className="h-5 w-5" />}
            description="Manage notifications for poojas, events and community updates"
            toggle={true}
            disabled={!SETTINGS_CONFIG.pushNotifications}
          />

          <SettingsCard
            title="Email & SMS Alerts"
            icon={<FileText className="h-5 w-5" />}
            description="Subscription, donation receipts, and event reminders"
            toggle={true}
            disabled={!SETTINGS_CONFIG.emailSmsAlerts}
          />

          <SettingsCard
            title="Temple-Specific Updates"
            icon={<Calendar className="h-5 w-5" />}
            description="Choose favorite temples for personalized notifications"
            disabled={!SETTINGS_CONFIG.templeSpecificUpdates}
          />
        </div>
      </div>
    </div>
  );
};

const TemplePreferences = () => {
  return (
    <div className="space-y-8">
      <h2 className="border-b border-amber-100 pb-2 font-serif text-xl font-bold text-amber-900">
        Temple Preferences
      </h2>

      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-6">
          <SettingsCard
            title="Followed Temples"
            icon={<Heart className="h-5 w-5" />}
            description="Manage list of followed temples and their updates"
            disabled={!SETTINGS_CONFIG.followedTemples}
          />

          <SettingsCard
            title="Temple Service Subscriptions"
            icon={<Calendar className="h-5 w-5" />}
            description="Auto-reminders for bookings, donations, and poojas"
            toggle={true}
            disabled={!SETTINGS_CONFIG.templeSubscriptions}
          />
        </div>
      </div>
    </div>
  );
};

const PaymentSettings = () => {
  return (
    <div className="space-y-8">
      <h2 className="border-b border-amber-100 pb-2 font-serif text-xl font-bold text-amber-900">
        Payment & Donations
      </h2>

      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-6">
          <SettingsCard
            title="Saved Payment Methods"
            icon={<CreditCard className="h-5 w-5" />}
            description="Manage UPI, cards, and wallets for quick payments"
            disabled={!SETTINGS_CONFIG.savedPaymentMethods}
          />

          <SettingsCard
            title="Transaction History"
            icon={<FileText className="h-5 w-5" />}
            description="View past donations, ticket bookings, etc."
            disabled={!SETTINGS_CONFIG.transactionHistory}
          />

          <SettingsCard
            title="Auto-Deduction for Monthly Donations"
            icon={<Calendar className="h-5 w-5" />}
            description="Enable recurring donations to your favorite temples"
            toggle={true}
            disabled={!SETTINGS_CONFIG.autoDeduction}
          />
        </div>
      </div>
    </div>
  );
};

const PrivacySettings = () => {
  return (
    <div className="space-y-8">
      <h2 className="border-b border-amber-100 pb-2 font-serif text-xl font-bold text-amber-900">
        Privacy & Security
      </h2>

      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-6">
          <SettingsCard
            title="Data Sharing Preferences"
            icon={<ShieldCheck className="h-5 w-5" />}
            description="Choose what information temples can see about you"
            disabled={!SETTINGS_CONFIG.dataSharing}
          />

          <SettingsCard
            title="Two-Factor Authentication"
            icon={<Smartphone className="h-5 w-5" />}
            description="Add an extra layer of security to your account"
            toggle={true}
            disabled={!SETTINGS_CONFIG.twoFactorAuth}
          />

          <SettingsCard
            title="Device Management"
            icon={<Smartphone className="h-5 w-5" />}
            description="See and log out of active sessions on other devices"
            disabled={!SETTINGS_CONFIG.deviceManagement}
          />
        </div>
      </div>
    </div>
  );
};

const LanguageSettings = () => {
  return (
    <div className="space-y-8">
      <h2 className="border-b border-amber-100 pb-2 font-serif text-xl font-bold text-amber-900">
        Language & Accessibility
      </h2>

      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-6">
          <SettingsCard
            title="Change Language"
            icon={<Languages className="h-5 w-5" />}
            description="Support for Malayalam, Sanskrit, Hindi, English, etc."
            disabled={!SETTINGS_CONFIG.changeLanguage}
          />

          <SettingsCard
            title="Larger Text"
            icon={<AlignLeft className="h-5 w-5" />}
            description="Increase text size for better readability"
            toggle={true}
            disabled={!SETTINGS_CONFIG.largerText}
          />

          <SettingsCard
            title="High Contrast Mode"
            icon={<Moon className="h-5 w-5" />}
            description="For better accessibility and viewing comfort"
            toggle={true}
            disabled={!SETTINGS_CONFIG.highContrast}
          />
        </div>
      </div>
    </div>
  );
};

const SupportHelp = () => {
  return (
    <div className="space-y-8">
      <h2 className="border-b border-amber-100 pb-2 font-serif text-xl font-bold text-amber-900">
        Support & Help
      </h2>

      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-6">
          <SettingsCard
            title="FAQs"
            icon={<HelpCircle className="h-5 w-5" />}
            description="Find answers to commonly asked questions"
            disabled={!SETTINGS_CONFIG.faqs}
          />

          <SettingsCard
            title="Contact Support"
            icon={<HelpCircle className="h-5 w-5" />}
            description="Connect with our support team for assistance"
            disabled={!SETTINGS_CONFIG.contactSupport}
          />

          <SettingsCard
            title="Report an Issue"
            icon={<HelpCircle className="h-5 w-5" />}
            description="Let us know if you're experiencing any problems"
            disabled={!SETTINGS_CONFIG.reportIssue}
          />
        </div>
      </div>
    </div>
  );
};

const AccountActions = () => {
  const { handleSignout } = useSignoutViewModel();
  const confirm = useConfirmation();

  const handleSignoutButtonClick = async () => {
    const confirmation = await confirm({
      title: 'Logout',
      message: 'Are you sure you want to logout?',
    });

    if (confirmation) handleSignout();
  };

  

  return (
    <div className="space-y-8">
      <h2 className="border-b border-amber-100 pb-2 font-serif text-xl font-bold text-amber-900">
        Account Actions
      </h2>

      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-6">
          <div>
            <SettingsCard
              title="Delete Account"
              icon={<Trash2 className="h-5 w-5 text-red-500" />}
              description="Permanently remove your account and all data"
              danger={true}
              disabled={!SETTINGS_CONFIG.deleteAccount}
            />
          </div>

          <div onClick={handleSignoutButtonClick}>
            <SettingsCard
              title="Logout"
              icon={<LogOut className="h-5 w-5" />}
              description="Sign out of your account on this device"
              disabled={!SETTINGS_CONFIG.logout}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Settings Card Component
const SettingsCard: React.FC<SettingsCardProps> = ({
  title,
  icon,
  description,
  toggle = false,
  danger = false,
  disabled = false,
}) => {
  const [isEnabled, setIsEnabled] = useState(false);

  const handleToggleClick = () => {
    if (!disabled) {
      setIsEnabled(!isEnabled);
    }
  };

  const handleButtonClick = () => {
    if (!disabled) {
      // Handle button click for non-toggle cards
      console.log(`${title} clicked`);
    }
  };

  return (
  <div
    className={`rounded-lg border p-4 transition-shadow ${
      disabled 
        ? 'border-gray-200 bg-gray-50 opacity-60 cursor-not-allowed'
        : danger 
        ? 'border-red-100 hover:shadow-sm cursor-pointer'
        : 'border-amber-100 hover:shadow-sm cursor-pointer'
    }`}
  >
    <div className="flex items-start justify-between">
      <div className="flex items-start space-x-3">
        <div 
          className={`mt-0.5 rounded-full p-2 ${
            disabled 
              ? 'bg-gray-100' 
              : danger 
              ? 'bg-red-50' 
              : 'bg-amber-50'
          }`}
        >
          <div className={disabled ? 'text-gray-400' : ''}>
            {icon}
          </div>
        </div>
        <div>
          <h3 
            className={`font-medium ${
              disabled 
                ? 'text-gray-400' 
                : danger 
                ? 'text-red-500' 
                : 'text-amber-900'
            }`}
          >
            {title}
          </h3>
          <p className={`mt-1 text-sm ${disabled ? 'text-gray-400' : 'text-gray-500'}`}>
            {description}
          </p>
        </div>
      </div>
      {toggle ? (
        <button
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            disabled
              ? 'bg-gray-300 cursor-not-allowed'
              : isEnabled 
              ? 'bg-amber-500 cursor-pointer' 
              : 'bg-gray-200 cursor-pointer'
          }`}
          onClick={handleToggleClick}
          disabled={disabled}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              isEnabled ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      ) : (
        <button
          className={`rounded-full p-2 transition-colors ${
            disabled 
              ? 'text-gray-400 cursor-not-allowed' 
              : danger 
              ? 'text-red-500 hover:bg-red-50 cursor-pointer' 
              : 'text-amber-700 hover:bg-amber-50 cursor-pointer'
          }`}
          onClick={handleButtonClick}
          disabled={disabled}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      )}
    </div>
  </div>
);

};

export default Settings;