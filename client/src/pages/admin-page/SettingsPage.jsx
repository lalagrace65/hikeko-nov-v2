import { MultiLevelSidebar } from "@/components/admin-components/AdminSidebar";
import { Input, Typography } from "@material-tailwind/react";
import React,{useState,useEffect} from 'react'
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';



export default function SettingsPage() {
    const [signUpId, setSignUpId] = useState('');
    const [profileFetched, setProfileFetched] = useState(false);
    const [businessName, setBusinessName] = useState('');
    const [businessEmail, setBusinessEmail] = useState('');
    const [businessBranch, setBusinessBranch] = useState('');
    const [businessAddress, setBusinessAddress] = useState('');
    const [businessType, setBusinessType] = useState('');
    const [businessContactNo, setBusinessContactNo] = useState("");
    const [birCertificateDocu, setBirCertificateDocu] = useState({ link: '', name: '' });
    const [dtiPermitDocu, setDtiPermitDocu] = useState({ link: '', name: '' });
    const [businessPermitDocu, setBusinessPermitDocu] = useState({ link: '', name: '' });
    const [mayorsPermitDocu, setMayorsPermitDocu] = useState({ link: '', name: '' });

    const [travelAgencyPassword, setTravelAgencyPassword] = useState('');

    const [travelAgencyLogoImage, setTravelAgencyLogoImage] = useState('');
    const [isUploading, setIsUploading] = useState(false);

 
    function inputHeader(text) {
        return (
            <h2 className="text-2xl mt-4">{text}</h2>
        );
    }

    function inputDescription(text) {
        return (
            <p className="text-gray-500 text-sm">{text}</p>
        );
    }

    function preInput(header, description) {
        return (
            <>
                {inputHeader(header)}
                {inputDescription(description)}
            </>
        );
    }  

    async function uploadTravelLogo(ev){
        const files = ev.target?.files;
        if(files?.length === 1){
            console.log("Files selected for upload:", files[0]);
            setIsUploading(true);
            toast.loading("Uploading image...");
    
            const data = new FormData();
            data.append('file', files[0]);
    
            try {
                console.log("Sending files to the server...");
                const res = await axios.post('/api/upload', data);
                console.log("Upload response:", res);
    
                
    
                // Update the travel agency logo image state with the uploaded image link
            setTravelAgencyLogoImage(res.data?.links?.[0] || '');

                toast.success('Upload complete');
            } catch (error) {
                console.error("Upload error:", error);
                toast.error("Failed to upload image.");
            } finally {
                setIsUploading(false);
                toast.dismiss();
            }
        } else {
            toast.error("Please select only one image.");
        }
    }
    
    // Fetch travel agency details when component mounts
    useEffect(() => {
        const fetchDetails = async () => {
            try {
                if (!signUpId) {
                    return;
                  }

                const response = await axios.get('/api/travelAgency/settings', { withCredentials: true });
                const data = response.data;
                setBusinessName(data.businessName || '');
                setBusinessEmail(data.businessEmail || '');
                setBusinessAddress(data.businessAddress || '');
                setBusinessType(data.businessType || '');
                setBusinessContactNo(data.businessContactNo || '');
            } catch (error) {
                console.error('Error fetching travel agency details:', error);
                toast.error('Failed to fetch profile details');
            }
        }; 
            fetchDetails();

    }, [signUpId]);
// Correct version of the function
const inputClassName = () => "w-full p-2 border border-gray-300 rounded";

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.put('/api/travelAgency/settings', {
            travelAgencyLogoImage: travelAgencyLogoImage,
            travelAgencyPassword,

        }, { withCredentials: true });

        console.log("Profile update response:", response);
        toast.success('Profile updated successfully');
    } catch (error) {
        console.error('Error updating profile:', error);
        toast.error('Failed to update profile');
    }
};

return (
    <div className="flex min-h-screen">
      <MultiLevelSidebar className="min-h-screen" />
      <div className="flex-1 p-8">
        <div className="border bg-white shadow rounded-xl p-6 flex flex-col gap-8">
        <form onSubmit={handleSubmit}>
          {/* Container for the two columns */}
          <div className="flex gap-8">
            
            {/* Left Column */}
            <div className="flex flex-col w-1/2">
              <Typography variant="h4" color="blue-gray">Profile</Typography>
              <div className="flex flex-col items-center justify-center">
                <img 
                  src={travelAgencyLogoImage} 
                  className="w-40 h-40 rounded-full object-cover items-center justify-center"                           
                  alt="travelAgencyLogo"
                />
              </div>
              <input 
                id="travelAgencyLogo" 
                type="file" 
                accept="image/*" 
                onChange={uploadTravelLogo}
                className="hidden" 
              />
              <span 
                className="block border rounded-lg p-2 text-center cursor-pointer"
                onClick={() => document.getElementById('travelAgencyLogo').click()}
              >
                Edit
              </span>
              {preInput('Business Name')}
              <input
                type="text"
                className={inputClassName()}
                placeholder="Business Name"
                value={businessName}
                onChange={ev => setBusinessName(ev.target.value)}
              />
              {preInput('Business Email')}
              <input
                type="email"
                className={inputClassName()}
                placeholder="business email"
                value={businessEmail}
                onChange={ev => setBusinessEmail(ev.target.value)}
              />
              {preInput('New Password', 'Change password')}
              <input
                type="password"
                className={inputClassName()}
                placeholder="Password"
                value={travelAgencyPassword}
                onChange={ev => setTravelAgencyPassword(ev.target.value)}
              />
            </div>
  
            {/* Right Column */}
            <div className="flex flex-col w-1/2">
              {preInput('Business Address')}
              <input
                type="text"
                className={inputClassName()}
                placeholder="Business Address"
                value={businessAddress}
                onChange={ev => setBusinessAddress(ev.target.value)}
              />
              {preInput('Business Type')}
              <input
                type="text"
                className={inputClassName()}
                placeholder="Business Type"
                value={businessType}
                onChange={ev => setBusinessType(ev.target.value)}
              />
              {preInput('Business Contact Number')}
              <PhoneInput
                className="phone-input-container mt-2 mb-2 w-full p-2 border border-gray-300 rounded-2xl"
                international
                countryCallingCodeEditable={false}
                defaultCountry="PH"
                placeholder="Enter phone number"
                value={businessContactNo}
                onChange={setBusinessContactNo}
              />
            </div>
            
          </div>
  
          {/* Register Button */}
          <button className="w-full p-2 bg-primary text-white rounded-2xl"> Save </button>
        </form>
        </div>
        
      </div>
    </div>
  );  
}
