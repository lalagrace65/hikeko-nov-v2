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

export default function CheckBasicPlan() {
    const navigate = useNavigate();
    const [isTermsChecked, setIsTermsChecked] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

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
                        <Typography>
                            With the Basic Plan, enjoy:
                            <ul className="mt-2 list-disc list-inside">
                                <li>Access to curated trail guides</li>
                                <li>Regular updates on new trails and events</li>
                                <li>Discounts on selected tours and gear</li>
                            </ul>
                        </Typography>

                        <div className="mt-4">
                           
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
                            className="w-full"
                            onClick={handleSubmit}
                        >
                            
                                Submit
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