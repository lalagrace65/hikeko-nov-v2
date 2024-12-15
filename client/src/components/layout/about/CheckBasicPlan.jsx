import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Input,
  Checkbox,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter
} from "@material-tailwind/react";
import axios from 'axios';
import { baseUrl } from '@/Url';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function CheckBasicPlan() {
    const navigate = useNavigate();
    const [isTermsChecked, setIsTermsChecked] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [formData, setFormData] = useState({
        proof: { link: '', name: '' },
    });
    const handleCheckboxChange = () => {
        setIsTermsChecked(prev => !prev);
    };
    const handleFileChange = async (ev, type) => {
        const files = ev.target.files;
        if (files?.length === 1) {
            const file = files[0]; // Get the selected file
            const data = new FormData();
            data.append('file', file);
  
            setIsUploading(true);
            try {
                const response = await axios.post('/api/upload', data, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
  
                // Update the appropriate state based on the type
                const link = response.data.links;  // This will be the URL of the uploaded file
                setFormData(prev => ({
                    ...prev,
                    [type]: { link, name: file.name }
                }));
  
                // Show success toast
                toast.success('Upload complete');
            } catch (error) {
                console.error('Upload failed:', error);
                toast.error('Upload failed');
            } finally {
                setIsUploading(false);
            }
        }
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if (!isTermsChecked) {
            toast.error('You must agree to the terms and conditions');
            return;
        }
        
        try {
            // Log the data before sending it to the server
            const requestData = {
                subscriptionPlan: 'Basic', // or Yearly based on your form selection
                subscriptionStartDate: new Date(),
                subscriptionEndDate: new Date(new Date().setMonth(new Date().getMonth() + 3)), // 3 months from now
                renewalStatus: true,
                termsAccepted:isTermsChecked,
            };
    
            console.log('Submitting Data:', requestData); // Log the data
            
            const response = await axios.post(`${baseUrl}/basicSubscription`, requestData);
            console.log('API Response:', response); 
            if (response.status === 200) {
                toast.success('Subscription basic Checked successfully');
                
                // Retrieve subscriptionId from the response and pass it along
                const subscriptionId = response.data.subscriptionId;
                console.log('Subscription ID:', subscriptionId);
                
                // Store subscriptionId in localStorage
                localStorage.setItem('subscriptionId', subscriptionId);

                navigate('/travelAgencySignUp', { state: { subscriptionData: requestData, subscriptionId } });
            }
        } catch (error) {
            console.error('Subscription error:', error);
            toast.error('Failed to submit subscription');
        }
    };

    // Scroll to top when this component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form>
                <Card className="w-96">
                    <CardHeader color="blue-gray" className="relative h-56">
                        <img
                            src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                            alt="card-image"
                        />
                    </CardHeader>
                    <CardBody>
                        <Typography variant="h5" color="blue-gray" className="mb-2">
                            Basic Plan Subscription
                        </Typography>
                        <Typography>
                            Join the Basic Plan today and start exploring with exclusive content and discounts tailored for adventurers like you!
                        </Typography>
                        <div>
                            With the Basic Plan, enjoy:
                            <ul className="mt-2 list-disc list-inside">
                                <li>Access to curated trail guides</li>
                                <li>Regular updates on new trails and events</li>
                                <li>Discounts on selected tours and gear</li>
                            </ul>
                        </div>

                        <div className="mt-4">
                            <Input 
                                id="proof" 
                                type="file" 
                                onChange={(ev) => handleFileChange(ev, 'proof')} 
                                accept="image/*" 
                                label="Upload Proof" 
                            />
                            {isUploading ? (
                                <div className="flex justify-center items-center mt-4">
                                    <Spinner className="text-blue-500" />
                                </div>
                            ) : formData.proof.link ? (
                                <div className="mt-4">
                                    <Typography className="text-green-500 text-sm">
                                        Uploaded Proof:
                                    </Typography>
                                    <img 
                                        src={formData.proof.link} 
                                        alt="Uploaded Proof" 
                                        className="mt-2 max-w-full h-[200px] object-cover"
                                    />
                                </div>
                            ) : null}
                        </div>

                        <div className="mt-4 flex items-center">
                            <Checkbox 
                                checked={isTermsChecked}
                                onChange={handleCheckboxChange} 
                            />
                            <Typography 
                                className="text-blue-600 cursor-pointer ml-2"
                                onClick={() => setIsModalOpen(true)}
                            >
                                I confirm to follow the Basic Plan
                            </Typography>
                        </div>
                    </CardBody>
                    <CardFooter className="pt-0">
                        <Button 
                            disabled={!isTermsChecked} 
                            className="w-full bg-primary cursor-pointer"
                            onClick={handleSubmit}
                        >
                                Submit
                        </Button>
                    </CardFooter>
                </Card>
            </form>

            {/* Modal for Terms and Conditions */}
            <Dialog open={isModalOpen} handler={() => setIsModalOpen(false)}>
            <DialogBody style={{ maxHeight: '400px', overflowY: 'auto', padding: '16px' }}>
                <Typography variant="h5" color="blue-gray">
                    Join the Basic Plan on Hikeko
                </Typography>

                <Typography variant="h6" className="mt-4">
                    Are you ready to unlock exclusive trail guides, exciting updates, and special discounts? 
                    Join the <strong>Basic Plan</strong> today and embark on your next adventure with all the benefits Hikeko has to offer.
                </Typography>

                <div className="mt-4">
                    <Typography variant="h6" color="blue-gray">
                    <strong>With the Basic Plan, you get:</strong>
                    </Typography>
                    <ul className="mt-2 list-disc list-inside">
                        <li><strong>Exclusive Access</strong> to curated trail guides</li>
                        <li><strong>Regular Updates</strong> on new trails, events, and tours</li>
                        <li><strong>Discounts</strong> on selected tours and adventure gear</li>
                    </ul>
                </div>

                <div className="mt-6">
                    <Typography variant="h6" color="blue-gray">
                    <strong>Terms of Service (Short Summary)</strong>
                    </Typography>
                    <ul className="mt-2 list-disc list-inside">
                        <li><strong>Subscription Period</strong>: You will be charged <strong>monthly</strong> based on your selected plan.</li>
                        <li><strong>Cancellation</strong>: You can cancel anytime, and your access will continue until the end of the billing cycle.</li>
                        <li><strong>Renewal</strong>: Your subscription will automatically renew unless canceled prior to the renewal date.</li>
                        <li><strong>Refunds</strong>: No refunds will be issued after the renewal period starts.</li>
                    </ul>
                </div>

                <div className="mt-6">
                    <Typography variant="h6" color="blue-gray">
                    <strong>How It Works</strong>
                    </Typography>
                    <Typography variant="h6" className="mt-2">
                    By confirming, you agree to subscribe to the Basic Plan, which includes the benefits listed above. You will have full access to exclusive content and discounts tailored for adventurers like you.
                    </Typography>
                </div>

                <div className="mt-6">
                    <Typography variant="h6" className="text-center">
                    By joining, you agree to the <strong>Terms of Service</strong> and <strong>Privacy Policy</strong> of Hikeko.
                    </Typography>
                </div>
            </DialogBody>
                <DialogFooter>
                    <Button
                        className='bg-primary text-white border-none'
                        onClick={() => setIsModalOpen(false)}
                    >
                        Close
                    </Button>
                </DialogFooter>
            </Dialog>
        </div>
    );
}
