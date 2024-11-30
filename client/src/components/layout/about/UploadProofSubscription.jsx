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
  DialogFooter,
  Spinner
} from "@material-tailwind/react";
import axios from 'axios';
import { baseUrl } from '@/Url';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function UploadProofSubscription() {
    const navigate = useNavigate();
    const [isUploading, setIsUploading] = useState(false);
    const [formData, setFormData] = useState({
        proof: { link: '', name: '' },
    });
    const [isTermsChecked, setIsTermsChecked] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

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

    const handleCheckboxChange = () => {
        setIsTermsChecked(prev => !prev);
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
                subscriptionPlan: 'Premium', // or Yearly based on your form selection
                subscriptionStartDate: new Date(),
                subscriptionEndDate: new Date(new Date().setMonth(new Date().getMonth() + 6)), // 6 months from now
                proof: formData.proof.link, // The proof link after the upload
                termsAccepted:isTermsChecked,
                renewalStatus: true,
            };
    
            console.log('Submitting Data:', requestData); // Log the data
            
            const response = await axios.post(`${baseUrl}/premiumSubscription`, requestData);
            
            if (response.status === 200) {
                toast.success('Subscription Proof uploaded successfully');
                
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
                            Hikeko Premium Plan Subscription
                        </Typography>
                        <Typography>
                            Lorem ipsum odor amet, consectetuer adipiscing elit.
                        </Typography>

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
                                I agree to the Terms and Conditions
                            </Typography>
                        </div>
                    </CardBody>
                    <CardFooter className="pt-0">
                        <Button 
                            disabled={isUploading || !isTermsChecked} 
                            className="w-full"
                            onClick={handleSubmit}
                        >
                            {isUploading ? (
                                <span className="loader"></span>  // You can use a spinner or animation here
                            ) : (
                                'Submit'
                            )}
                        </Button>
                    </CardFooter>
                </Card>
            </form>

            {/* Modal for Terms and Conditions */}
            <Dialog open={isModalOpen} handler={() => setIsModalOpen(false)}>
                <DialogHeader>Terms and Conditions</DialogHeader>
                <DialogBody>
                    <Typography>
                        {/* Terms and Conditions content here */}
                        By proceeding, you agree to the terms and conditions of our service.
                    </Typography>
                </DialogBody>
                <DialogFooter>
                    <Button
                        color="red"
                        onClick={() => setIsModalOpen(false)}
                    >
                        Close
                    </Button>
                </DialogFooter>
            </Dialog>
        </div>
    );
}
