import React from 'react';
import { Button } from '@material-tailwind/react';

const TaPrivacyPolicy = ({ isOpen, onClose, onAccept }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 max-w-lg mx-auto shadow-lg">
        <h2 className="text-xl font-semibold">Privacy Policy & Terms and Conditions</h2>
        <p className="mt-4 text-sm">Effective Date: <strong>November 15, 2024</strong></p>
        
        <div className="mt-4 text-sm space-y-6 max-h-96 overflow-y-auto">
          {/* Privacy Policy Section */}
          <h3 className="font-semibold mt-4">Privacy Policy</h3>
          <p>At <strong>Hikeko</strong>, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal and business information:</p>
          
          <h4 className="font-semibold">1. Information We Collect</h4>
          <ul className="list-disc pl-6">
            <li>Owner&rsquo;s First Name</li>
            <li>Owner&rsquo;s Last Name</li>
            <li>Owner&rsquo;s Contact Number</li>
            <li>Business Name</li>
            <li>Business Address</li>
            <li>Business Contact Number</li>
            <li>Documents like BIR Certificate, DTI Permit, Business Permit, Mayor's Permit</li>
            <li>Package Information (Details, Media, Payment)</li>
          </ul>

          <h4 className="font-semibold">2. How We Use Your Information</h4>
          <ul className="list-disc pl-6">
            <li>Account verification and setup</li>
            <li>Communications about account status and updates</li>
            <li>Processing payments and transactions</li>
            <li>Legal compliance and reporting</li>
          </ul>

          <h4 className="font-semibold">3. Sharing Your Information</h4>
          <p>Your information may be shared with:</p>
          <ul className="list-disc pl-6">
            <li>Third-party service providers to assist with operations</li>
            <li>Legal authorities when required</li>
            <li>In case of mergers or business transfers</li>
          </ul>

          <h4 className="font-semibold">4. Data Security</h4>
          <p>We use industry-standard security protocols to protect your data, but we cannot guarantee absolute security.</p>

          <h4 className="font-semibold">5. Data Retention</h4>
          <p>We will retain your data for as long as necessary for the purposes outlined above.</p>

          <h4 className="font-semibold">6. Cookies and Tracking Technologies</h4>
          <p>We use cookies to improve your experience. You can disable them, but some features may not function properly.</p>

          <h4 className="font-semibold">7. Third-Party Links</h4>
          <p>Our platform may contain links to third-party websites. We are not responsible for their privacy policies.</p>

          <h4 className="font-semibold">8. Children&rsquo;s Privacy</h4>
          <p>We do not knowingly collect information from children under 13 years old.</p>

          <h4 className="font-semibold">9. Changes to the Privacy Policy</h4>
          <p>We may update this Privacy Policy from time to time. Any changes will be posted here.</p>

          <h4 className="font-semibold">10. Contact Us</h4>
          <p>If you have any questions or concerns, please contact us at:</p>
          <p>Email: <strong>support@hikeko.com</strong></p>
          <p>Phone: <strong>[Insert phone number]</strong></p>

          {/* Terms and Conditions Section */}
          <h3 className="font-semibold mt-6">Terms and Conditions</h3>
          <p>By using the Hikeko platform, you agree to be bound by the following terms and conditions:</p>

          <h4 className="font-semibold">1. Acceptance of Terms</h4>
          <p>By accessing or using Hikeko, you agree to comply with these Terms and Conditions, as well as our Privacy Policy.</p>

          <h4 className="font-semibold">2. Account Registration</h4>
          <p>You must provide accurate and complete information during registration. You are responsible for maintaining the confidentiality of your account details.</p>

          <h4 className="font-semibold">3. Business Listings</h4>
          <p>You are responsible for ensuring the accuracy and legality of the content you post about your travel agency and packages. We reserve the right to remove any content that violates our policies.</p>

          <h4 className="font-semibold">4. Payment and Transactions</h4>
          <p>All transactions made through our platform are subject to payment terms, which will be provided at the time of the transaction.</p>

          <h4 className="font-semibold">5. User Conduct</h4>
          <p>Users agree not to misuse the platform in any way, including fraudulent activities, spamming, or violation of local laws and regulations.</p>

          <h4 className="font-semibold">6. Limitation of Liability</h4>
          <p>We are not liable for any direct or indirect damages arising from the use of our platform or the content posted by users.</p>

          <h4 className="font-semibold">7. Modification of Terms</h4>
          <p>We may update these terms periodically. You will be notified of any significant changes through the platform.</p>

          <h4 className="font-semibold">8. Governing Law</h4>
          <p>These Terms and Conditions are governed by the laws of [Country]. Any disputes shall be resolved through [jurisdiction].</p>

          <h4 className="font-semibold">9. Termination</h4>
          <p>We reserve the right to suspend or terminate your account for violations of our Terms and Conditions.</p>

          <h4 className="font-semibold">10. Contact Information</h4>
          <p>If you have questions about these Terms and Conditions, please contact us at:</p>
          <p>Email: <strong>hikeko.app@gmail.com</strong></p>
          <p>Phone: <strong>+639298083890</strong></p>

        </div>

        <div className="flex justify-end mt-6">
          <Button
            className="bg-primary"
            onClick={() => {
              onAccept(); // Accept the policy and terms
              onClose(); // Close the dialog
            }}
          >
            Accept
          </Button>
          <Button color="gray" onClick={onClose} className="ml-2">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaPrivacyPolicy;
