import React from 'react';
import { Button } from '@material-tailwind/react';

const HikekoTermsOfService = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 max-w-lg mx-auto shadow-lg">
        <h2 className="text-xl font-semibold">HikeKo Terms and Conditions</h2>
        <p className="mt-4 text-sm">Effective Date: <strong>November 15, 2024</strong></p>
        
        <div className="mt-4 text-sm space-y-6 max-h-96 overflow-y-auto">
          {/* Privacy Policy Section */}
          <h3 className="font-semibold italic mt-4">1. Introduction</h3>
          <p>Welcome to <b>HikeKo!</b> By accessing and using our sevices, you agree to comply with these <span className='font-semibold text-primary'>Terms and Conditions</span>.
            These terms apply to all users of the HikeKo platform, including customers, hikers, guides, and other contributors.
          </p>
          
          <h4 className="font-semibold italic">2. Acceptance of Terms</h4>
          <p>By creating an account or logging into HikeKo, you confirm that you agree to these Terms and Conditions, our Privacy Policy,
            and any guidelines or policies we may publish. If you do not agree, please refrain from using HikeKo.
          </p>

          <h4 className="font-semibold italic">3. User Accounts</h4>
          <ul className="list-none pl-6">
            <li><b>Registration:</b> When you register, you agree to provide accurate inforamtiong and keep your login credentials secure.</li>
            <li><b>Account Security:</b> You are responsible for safeguarding your account details, including your password. Notify HikeKo immediately of any unauthorized use.</li>
          </ul>

          <h4 className="font-semibold italic">4. Use of Personal Data</h4>
          <ul className="list-none pl-6">
            <li><b>Public by Default:</b> By using HikeKo, you acknowledge that certain information you add, such as trail reviews, routes, and comments, may be publicly visible by default.</li>
            <li><b>Data Use:</b> HikeKo collects and uses personal data in accordance with our Privacy Policy.
                This includes data collected for acocunt management, usage tracking, and personalized content.
            </li>
          </ul>

          <h4 className="font-semibold italic">5. Trails and Safety Information</h4>
          <ul className="list-none pl-6">
            <li><b>Accuracy of Information:</b> HikeKo strives to provide accurate and up-to-date trail information.
              However, we do not guarantee the accuracy, completeness, or reliability of any content on the platform.
            </li>
            <li><b>User Responsibility:</b> Users are responsible for ensuring they have adequate preparation, skills, and knowledge for any hiking activities.
                Use HikeKo as a guide, but always prioritize safety and check trail conditions before hiking.
            </li> 
          </ul>

          <h4 className="font-semibold italic">6. Prohibited Conduct</h4>
          <ul className="list-none pl-6">
            <li><b>Respectful Use:</b> Users must interact respectfully on HikeKo, without engaging in abusive, harassing, or discriminatory behavior.</li>
            <li><b>No Unauthorized Access:</b> Unauthorized access to Hikeko's. systems, hacking, or any attempt to disrupt services is strictly prohibited</li>
            <li><b>content Restrictions:</b> Do not upload illegal, offensive, or harmful content. Any content violating these guidelines will be removed, 
                and the responsible account may be suspended.
            </li> 
          </ul>

          <h4 className="font-semibold italic">7. Limitation of Liability</h4>
          <ul className="list-none pl-6">
            <li><b>User Assumes Risk:</b> HikeKo does not take responsibility for any injuries, losses or damages resulting from hiking activities or the information provided on our platform</li>
            <li><b>No Warranty:</b> HikeKo provides all information and services "as-is" without warranty of any kind, express or implied.</li>
          </ul>

          <h4 className="font-semibold italic">8. Intellectual Property</h4>
          <ul className="list-none pl-6">
            <li><b>HikeKo Content:</b> All content on the Hikeko platform, including text, images, and software, is the property of HikeKo and protected by copyright laws.</li>
            <li><b>User Contributions:</b> By submitting content, you grant HikeKo a non-exclusive, royalty-free, and worldwide license to use,
                display, and distribute your content as part of the HikeKo platform.</li>
          </ul>

          <h4 className="font-semibold italic">9. Termination of Use</h4>
          <ul className="list-none pl-6">
            <li><b>Voluntary Termination:</b> You may terminate your HikeKo account at any time.</li>
            <li><b>Termination by HikeKo:</b> Hikeko reserves the right to terminate or suspend accounts that violate these Terms and Conditions.</li>
          </ul>

          <h4 className="font-semibold italic">10. Changes to Terms</h4>
          <p>HikeKo reserves the right to update these Terms and Conditions at any time. Users will be notified of significant changes, and continued use of the platform
            after such changes constitutes acceptance of the updated Terms and Conditions.
          </p>

          <h4 className="font-semibold italic">11. Governing Law</h4>
          <p>These Terms and Conditions are governed by and construed in accordance with the laws applicable in your country of residence</p>

          <h4 className="font-semibold italic">12. Contact Us</h4>
          <p>For questions or concerns about these Terms and Conditions, please contact us at:</p>
  
          <p>Email: <strong>hikeko.app@gmail.com</strong></p>
          <p>Phone: <strong>+639298083890</strong></p>
        </div>

        <div className="flex justify-end mt-6">
          <Button color="gray" onClick={onClose} className="ml-2">
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HikekoTermsOfService;
