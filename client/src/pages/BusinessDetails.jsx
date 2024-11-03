import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';


export default function BusinessDetails() {
    const navigate = useNavigate(); 

    const [error, setError] = useState(''); // New state for error handling
    const [formData, setFormData] = useState({
        businessName: '',
        businessAddress: '',
        businessType: '',
        businessBranch: '',
        contactNumber: '',
        birCertificatePhoto: '',
        dtiPermitPhoto: '',
        businessPermitPhoto: '',
        mayorsPermitPhoto: '',
    });
    const [birCertificatePhoto, setBirCertificatePhoto] = useState('');
    const [dtiPermitPhoto, setDtiPermitPhoto] = useState('');
    const [businessPermitPhoto, setBusinessPermitPhoto] = useState('');
    const [mayorsPermitPhoto, setMayorsPermitPhoto] = useState('');
    const [contactNo, setContactNo] = useState('');


    useEffect(() => {
        const data = localStorage.getItem('formData');
        if (data) {
            const parsedData = JSON.parse(data);
            setFormData(prev => ({ ...prev, ...parsedData }));
        }
    }, []);

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        // Check if all photos are uploaded
        if (!birCertificatePhoto || !dtiPermitPhoto || !businessPermitPhoto || !mayorsPermitPhoto) {
            setError("All required documents must be uploaded.");
            return; // Prevent form submission if photos are missing
        }

        setError(''); // Clear error if everything is valid

        // Start the toast notification
    const toastId = toast.loading('Creating your signup...');

    try {
        const response = await fetch('/api/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(submissionData),
        });

        const data = await response.json();

        if (response.ok) {
            // Handle success, e.g., save token
            console.log('Token:', data.token); // You can also save this token in localStorage if needed
            toast.success('Signup created');
        } else {
            throw new Error(data.error || 'Failed to signup');
        }
    } catch (error) {
        toast.error(error.message || 'Failed to signup');
    } finally {
        toast.dismiss(toastId); // Dismiss the loading toast
    }

    // Clear local storage after submission
    localStorage.removeItem('formData');
    navigate.push('/email-verification'); // Navigate to the home page or wherever needed
};

    async function handleFileChange(ev, type) {
        const files = ev.target.files;
        if (files?.length === 1) {
          const data = new FormData();
          data.set('file', files[0]);
    
          const uploadPromise = fetch('/api/upload', {
            method: 'POST',
            body: data,
          }).then(response => {
            if (response.ok) {
              return response.json().then(link => {
                if (type === 'birCertificate') {
                    setBirCertificatePhoto(link);
                } else if (type === 'dtiPermit') {
                    setDtiPermitPhoto(link);
                } else if (type === 'businessPermit') {
                    setBusinessPermitPhoto(link);
                } else if (type === 'mayorsPermit') {
                    setMayorsPermitPhoto(link);
                }
              });
            } 
            throw new Error('Something went wrong'); 
          });
    
          await toast.promise(uploadPromise, {
            loading: 'Uploading...',
            success: 'Upload complete',
            error: 'Upload failed'
          });
        }
      }

    return (
        <div className="flex">
        {/* Left Side - Background Color/Image */}
        <div className="flex-1 bg-gray-200 relative">
            {/* Optional: Add a background image */}
            {/* <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/path-to-your-image.jpg')" }} /> */}
        </div>

        {/* Right Side - Form Container */}
        <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-2">Tell us about your business</h1>
        <h3 className='mb-4'>This information will be shown on the app so that customers can search and contact you in case they have any questions.
        <Label htmlFor="terms" 
            className="cursor-pointer text-red-400"
            onClick={() => {
            }}> See sample BIR Form
        </Label>
        </h3>
            <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
                <Label htmlFor="businessName">Business Name:</Label>
                <Input
                    type="text"
                    value={formData.businessName}
                    onChange={ev => setFormData({ ...formData, businessName: ev.target.value })}
                    placeholder="Enter business name"
                    required
                />

                <Label htmlFor="businessType">Business Type:</Label>
                <Select onValueChange={(value) => setFormData({ ...formData, businessType: value })}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Business Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="service">Service</SelectItem>
                        <SelectItem value="product">Product</SelectItem>
                    </SelectContent>
                </Select>

                <Label htmlFor="businessAddress">Business Complete Address:</Label>
                <Input
                    type="text"
                    value={formData.businessAddress}
                    onChange={ev => setFormData({ ...formData, businessAddress: ev.target.value })}
                    placeholder="Enter business complete address"
                    required
                />

                <Label htmlFor="businessBranch">Number of Branches:</Label>
                <Input
                    type="text"
                    value={formData.businessBranch}
                    onChange={ev => setFormData({ ...formData, businessBranch: ev.target.value })}
                    placeholder="Enter number of branches"
                    required
                />

                <Label htmlFor="contactNumber">Contact Number:</Label>
                    <PhoneInput
                        className="phone-input-container mt-2 mb-2 w-full px-3 py-2 border border-gray-300 rounded-2xl"
                        international
                        countryCallingCodeEditable={false}
                        defaultCountry="PH"
                        placeholder="Enter phone number"
                        value={contactNo}
                        onChange={setContactNo}
                    />

            <h1 className="text-2xl font-bold mb-2">Business Documents</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    {/* BIR Certificate Upload */}
                    <Label htmlFor="BIR Certificate Photo">BIR Certificate</Label>
                    {birCertificatePhoto && (
                    <img
                        src={birCertificatePhoto}
                        width={250}
                        height={250}
                        alt="BIR Certificate"
                        className="object-cover rounded-lg mb-1 w-[250px] h-[250px]"
                    />
                    )}
                    <Label htmlFor="birCertificatePhoto">
                    <Input
                        id="birCertificatePhoto"
                        type="file"
                        className="hidden "
                        onChange={(e) => handleFileChange(e, 'birCertificate')}
                    />
                    <span className="block border rounded-lg p-2 text-center cursor-pointer w-[250px]">
                        Upload BIR Certificate
                    </span>
                    </Label>
                </div>
                <div>
                {/* DTI Permit Upload */}
                    <Label htmlFor="DTI Permit Photo">DTI Permit</Label>
                    {dtiPermitPhoto&& (
                    <img
                        src={dtiPermitPhoto}
                        width={250}
                        height={250}
                        alt="DTI Permit"
                        className="object-cover rounded-lg mb-1 w-[250px] h-[250px]"
                    />
                    )}
                    <Label htmlFor="dtiPermitPhoto">
                    <Input
                        id="dtiPermitPhoto"
                        type="file"
                        className="hidden"
                        onChange={(e) => handleFileChange(e, 'dtiPermit')}
                    />
                    <span className="block border rounded-lg p-2 text-center cursor-pointer w-[250px]">
                        Upload DTI Permit
                    </span>
                    </Label>
                </div>
                <div>
                    {/* Business Permit Upload */}
                    <Label htmlFor="Business Permit Photo">Business Permit</Label>
                    {businessPermitPhoto && (
                        <img
                            src={businessPermitPhoto}
                            width={250}
                            height={250}
                            alt="Business Permit"
                            className="object-cover rounded-lg mb-1 w-[250px] h-[250px]"
                        />
                    )}
                    <Label htmlFor="businessPermitPhoto">
                    <Input
                        id="businessPermitPhoto"
                        type="file"
                        className="hidden"
                        onChange={(e) => handleFileChange(e, 'businessPermit')}
                    />
                    <span className="block border rounded-lg p-2 text-center cursor-pointer w-[250px] ">
                        Upload Business Permit
                    </span>
                    </Label>
                </div>
                <div>
                    {/* Mayor's Permit Upload */}
                    <Label htmlFor="Mayor's Permit Photo">Mayor's Permit</Label>
                    {mayorsPermitPhoto && (
                    <img
                        src={mayorsPermitPhoto}
                        width={250}
                        height={250}
                        alt="Mayor's Permit"
                        className="object-cover rounded-lg mb-1 w-[250px] h-[250px]"
                    />
                    )}
                    <Label htmlFor="mayorsPermitPhoto">
                    <Input
                        id="mayorsPermitPhoto"
                        type="file"
                        className="hidden"
                        onChange={(e) => handleFileChange(e, 'mayorsPermit')}
                    />
                    <span className="block border rounded-lg p-2 text-center cursor-pointer w-[250px]">
                        Upload Mayor's Permit
                    </span>
                    </Label>
                </div>
            </div>
                {/* Display error message if any */}
                {error && <p className="text-red-500">{error}</p>}

                {/* Submit Button */}
                <Button type="submit" 
                    className="p-2 bg-red-500 text-white rounded-md
                     hover:bg-red-600 w-[350px]"
                    
                >

                    Submit
                </Button>
            </form>

                {/* Sample BIR Document */}
        </div>
        </div>
    );
}

