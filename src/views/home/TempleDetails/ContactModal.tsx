import { useState } from 'react';
import { X, Phone, Mail, User, MapPin, Copy, Check } from 'lucide-react';
import { companyInfo } from '../../../components/companyInfo';

interface ContactDetails {
  address?: string;
  chiefPriest?: {
    name?: string;
    phoneNumber?: string;
  };
  committeeMembers?: {
    name?: string;
    phoneNumber?: string;
  }[];
  primaryEmail?: string; // Kept for future use
  website?: string;
}

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  contactDetails?: ContactDetails;
}

const ContactModal = ({ isOpen, onClose, contactDetails }: ContactModalProps) => {
  if (!isOpen) return null;

  const [copiedNumber, setCopiedNumber] = useState<string | null>(null);

  const handleCopy = (numberToCopy: string) => {
    navigator.clipboard.writeText(numberToCopy);
    setCopiedNumber(numberToCopy);
    setTimeout(() => {
      setCopiedNumber(null);
    }, 2000); // Reset after 2 seconds
  };

  const handleClose = () => {
    setCopiedNumber(null); // Reset copied state when modal closes
    onClose();
  };

  const hasDetails =
    contactDetails?.address ||
    contactDetails?.chiefPriest?.phoneNumber ||
    (contactDetails?.committeeMembers && contactDetails.committeeMembers.length > 0) ||
    contactDetails?.primaryEmail ||
    contactDetails?.website;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 rounded-full p-1 text-gray-500 hover:bg-gray-100"
        >
          <X className="h-5 w-5" />
        </button>
        <h3 className="mb-4 font-serif text-xl text-amber-900">Contact Details</h3>
        <div className="space-y-4">
          {hasDetails ? (
            <>
              <p className="text-sm text-gray-500">For Temple related queries, contact:</p>

              {contactDetails?.committeeMembers?.map((member, index) => (
                <div key={index} className="flex items-center">
                  <User className="mr-3 h-5 w-5 text-orange-500" />
                  <div className="flex flex-grow items-center justify-between text-gray-700">
                    <div>
                      <span>{member.name}</span>
                      {member.phoneNumber && (
                        <a href={`tel:${member.phoneNumber}`} className="ml-2 text-sm">
                          <Phone className="-mt-1 mr-1 inline h-4 w-4" />
                          {member.phoneNumber}
                        </a>
                      )}
                    </div>
                    {member.phoneNumber && (
                      <button
                        onClick={() => handleCopy(member.phoneNumber!)}
                        className="p-1 text-gray-500 hover:text-gray-800"
                        aria-label="Copy phone number"
                      >
                        {copiedNumber === member.phoneNumber ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {contactDetails?.address && (
                <div className="flex items-start">
                  <MapPin className="mt-1 mr-3 h-5 w-5 flex-shrink-0 text-orange-500" />
                  <p className="text-gray-700">{contactDetails.address}</p>
                </div>
              )}
              {contactDetails?.primaryEmail && (
                <div className="flex flex-grow items-center justify-between">
                  <div className="flex items-center">
                    <Mail className="mr-3 h-5 w-5 text-orange-500" />
                    <a href={`mailto:${contactDetails.primaryEmail}`} className="text-gray-700">
                      {contactDetails.primaryEmail}
                    </a>
                  </div>
                  <button
                    onClick={() => handleCopy(contactDetails.primaryEmail!)}
                    className="p-1 text-gray-500 hover:text-gray-800"
                    aria-label="Copy email address"
                  >
                    {copiedNumber === contactDetails.primaryEmail ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </div>
              )}

              {/* Separator Line */}
              <hr className="my-4 border-gray-200" />

              {/* Company Info Section */}
              <div>
                <p className="text-sm text-gray-500">For website/app related queries, contact:</p>
                <div className="flex flex-grow items-center justify-between">
                  <div className="flex items-center">
                    <Phone className="mr-3 h-5 w-5 text-orange-500" />
                    <a href={`tel:${companyInfo.numbers.primary}`} className="text-gray-700">
                      {companyInfo.numbers.primary}
                    </a>
                  </div>
                  <button
                    onClick={() => handleCopy(companyInfo.numbers.primary)}
                    className="p-1 text-gray-500 hover:text-gray-800"
                    aria-label="Copy phone number"
                  >
                    {copiedNumber === companyInfo.numbers.primary ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">
                  For online booking/payment issues, mail to us:
                </p>
                <div className="flex flex-grow items-center justify-between">
                  <div className="flex items-center">
                    <Mail className="mr-3 h-5 w-5 text-orange-500" />
                    <a href={`mailto:${companyInfo.emails.support}`} className="text-gray-700">
                      {companyInfo.emails.support}
                    </a>
                  </div>
                  <button
                    onClick={() => handleCopy(companyInfo.emails.support)}
                    className="p-1 text-gray-500 hover:text-gray-800"
                    aria-label="Copy email address"
                  >
                    {copiedNumber === companyInfo.emails.support ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            </>
          ) : (
            <p className="text-gray-600">No contact details available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
