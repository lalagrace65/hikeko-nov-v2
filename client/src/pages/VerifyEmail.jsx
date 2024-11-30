import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Card, CardBody } from '@material-tailwind/react';
import { FiCheckCircle } from "react-icons/fi";
export default function VerifyEmail() {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();


    return (
        <div className="flex items-center justify-center min-h-screen bg-orange-200 p-6">
            <Card className="w-full max-w-md bg-white shadow-lg">
                <CardBody className="p-8">
                    
                        <div className="text-center">
                            <Typography variant="h5" color="blue-gray" className="mb-4 font-semibold">
                                Email Verified
                            </Typography>
                            <div className="flex justify-center items-center mb-4">
                                <FiCheckCircle className="text-6xl text-green-600" />
                            </div>                            
                            <Typography className="text-lg text-gray-600 mb-6">
                                Your email has been successfully verified. You can now log in to your account.
                            </Typography>
                            <Button
                                onClick={() => navigate('/login')}
                                fullWidth
                                className="mt-4 bg-primary"
                            >
                                Go to Login
                            </Button>
                        </div>
                    
                </CardBody>
            </Card>
        </div>
    );
}
