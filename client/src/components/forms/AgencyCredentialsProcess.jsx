import React, { useEffect } from 'react';
import { Card, Typography, Spinner } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';

const AgencyCredentialsProcess = () => {
    const navigate = useNavigate();
    useEffect(() => {
        // Scroll to top on component mount
        window.scrollTo(0, 0);
      }, []);

    useEffect(() => {
        // Set a timeout to redirect to the homepage after 10 seconds (10000 milliseconds)
        const timer = setTimeout(() => {
            navigate('/');
        }, 8000);

        // Cleanup the timer on component unmount
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <Card className="w-full max-w-md p-8 text-center shadow-lg">
                <div className="flex justify-center mb-6">
                    <Spinner color="blue" className="h-16 w-16" />
                </div>
                <Typography variant="h4" className="mb-4 text-gray-900">
                    We are processing your partnership credentials
                </Typography>
                <Typography variant="h6" color="gray" className="mb-4">
                    Kindly wait while we review your submission. You will receive a reply via email once the process is completed.
                </Typography>
                <Typography variant="h6" color="gray" className="mb-4">
                    Thank you for your patience.
                </Typography>
                <Typography variant="h6" color="gray" className="mt-4">
                    In a moment, we'll redirect you to the homepage. Feel free to reach out if you have further questions.
                </Typography>
            </Card>
        </div>
    );
};

export default AgencyCredentialsProcess;
