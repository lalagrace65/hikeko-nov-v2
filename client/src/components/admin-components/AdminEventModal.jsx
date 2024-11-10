// src/components/PackageModal.jsx
import React from "react";
import { Dialog, Card, CardBody, CardFooter, Typography, Button } from "@material-tailwind/react";
import dayjs from "dayjs";

const PackageModal = ({ open, handleClose, packageData }) => {
    function formatTime(time) {
        if (time && typeof time === 'object' && 'hours' in time && 'minutes' in time) {
            return `${String(time.hours).padStart(2, '0')}:${String(time.minutes).padStart(2, '0')}`;
        }
        return '';
    }

    function formatTimestamp(timestamp) {
        return dayjs(timestamp).format('YYYY-MM-DD HH:mm:ss');
    }  
    
    return (
        <Dialog
            size="xs"
            open={open}
            handler={handleClose}
            className="bg-transparent shadow-none flex items-center justify-center"
        >
            <Card className="border mx-auto h-[800px] w-[800px]">
                <CardBody className="flex flex-col">
                    {/*Package Details Header*/}
                    <div className="p-4 border rounded-xl w-auto bg-adminModal">
                        <Typography className="mb-4" variant="h4" color="blue-gray">
                            Package Details
                        </Typography>
                        <Typography className="custom-paragraph font-normal" variant="paragraph" color="gray">
                            <p><b>Mountain name:</b> {packageData ? packageData.trailId.title : 'N/A'}</p>
                        </Typography>
                        <Typography className="custom-paragraph font-normal" variant="paragraph" color="gray">
                            <p><b>Slot:</b> </p>
                        </Typography>
                        <Typography className="custom-paragraph font-normal" variant="paragraph" color="gray">
                            <p><b>Status:</b> {packageData ? packageData.status : 'N/A'}</p>
                        </Typography>
                        <Typography className="custom-paragraph font-normal" variant="paragraph" color="gray">
                            <p><b>Packages:</b> </p>
                                {packageData && packageData.packages.length > 0 ? (
                                    <ul className="list-disc list-inside ml-4">
                                    {packageData.packages.map((item, index) => (
                                        <li key={index} className="py-1">{item}</li>
                                    ))}
                                </ul>
                                ) : (
                                    <p>N/A</p>
                            )}
                        </Typography>   
                        <Typography className="custom-paragraph font-normal" variant="paragraph" color="gray">
                            <p><b>Additional package inclusions:</b> {packageData ? packageData.additionalPackages : 'N/A'}</p>
                        </Typography>   
                        <Typography className="custom-paragraph font-normal" variant="paragraph" color="gray">
                            <p><b>Package Exclusions:</b> {packageData ? packageData.exclusions : 'N/A'}</p>
                        </Typography>   
                        <Typography className="custom-paragraph font-normal" variant="paragraph" color="gray">
                            <p><b>Coordinator:</b> {packageData ? packageData.coordinatorName : 'N/A'}</p>
                        </Typography>   
                        <Typography className="custom-paragraph font-normal" variant="paragraph" color="gray">
                            <p><b>Price:</b> {packageData ? packageData.price : 'N/A'}</p>
                        </Typography>
                        <Typography className="custom-paragraph font-normal" variant="paragraph" color="gray">
                            <p><b>Payment Options:</b> {packageData ? packageData.paymentOptions : 'N/A'}</p>
                        </Typography>
                        <Typography className="custom-paragraph font-normal" variant="paragraph" color="gray">
                            <p><b>Downpayment policy:</b> {packageData ? packageData.dpPolicy : 'N/A'}</p>
                        </Typography>
                        <Typography className="custom-paragraph font-normal" variant="paragraph" color="gray">
                            <p><b>Pickup Location:</b> {packageData ? packageData.pickupLocation : 'N/A'}</p>
                        </Typography>  
                        <Typography className="custom-paragraph font-normal" variant="paragraph" color="gray">
                            <p><b>Event Date:</b> {packageData && packageData.date ? new Date(packageData.date).toLocaleDateString() : 'N/A'}</p>
                        </Typography>  
                        <Typography className="custom-paragraph font-normal" variant="paragraph" color="gray">
                            <p><b>Event Time:</b> {packageData ? `${formatTime(packageData.checkIn)} - ${formatTime(packageData.checkOut)}` : 'N/A'}</p>
                        </Typography> 
                        <Typography className="custom-paragraph font-normal" variant="paragraph" color="gray">
                            <p><b>Event date created:</b> {packageData ? `${formatTimestamp(packageData.timestamp)}` : 'N/A'}</p>
                        </Typography> 
                    </div>
                    {/*Booked Accounts*/}   
                </CardBody>
                <CardFooter className="pt-0">
                    <Button variant="gradient" onClick={handleClose} fullWidth>
                        Close
                    </Button>
                </CardFooter>
            </Card>
        </Dialog>
    );
};

export default PackageModal;
