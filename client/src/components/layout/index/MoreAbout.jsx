    import {
        Card,
        CardHeader,
        CardBody,
        Typography,
        Button,
    } from "@material-tailwind/react";
    import { useNavigate } from "react-router-dom";
   
  export function MoreAbout() {
    const navigate = useNavigate();
    const handleLearnMore = () => {
        navigate('/about#pricing');
    }
    return (
        <div className="mt-20">
            <Card className="w-full max-w-[100rem] flex-row bg-aboutColor text-white shadow-2xl">
                <CardHeader
                    shadow={false}
                    floated={false}
                    className="m-0 w-2/5 shrink-0 rounded-r-none hidden lg:block"
                    >
                    <img
                        src="praisedTA_1.jpg"
                        alt="About Hikeko"
                        className="h-full w-full object-cover"
                    />
                </CardHeader>
            <CardBody className="p-10">
                <Typography variant="h4" color="blue-gray" className="mb-2 text-white">
                    Promote Your Hiking Events with Hikeko
                </Typography>
                <Typography color="gray" className="mb-8 font-normal text-white">
                    Do you organize incredible hiking experiences and want to reach adventurers everywhere? So do we!
                </Typography>
                <Typography color="gray" className="mb-8 font-normal text-white">
                    By partnering with Hikeko, you can showcase your hiking events to our community of nature lovers 
                    and adventure seekers. It’s easy – post your hiking events on our platform and gain visibility with outdoor adventurers. 
                </Typography>
                <Typography color="gray" className="mb-8 font-normal text-white">
                    Ready to grow your reach? Let’s start our partnership with Hikeko today!
                </Typography>
                <a className="inline-block">
                    <Button variant="text" className="flex items-center gap-2" onClick={handleLearnMore}>
                        Learn More
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                            className="h-4 w-4"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                            />
                        </svg>
                    </Button>
                </a>
            </CardBody>
            </Card>
        </div>
      
    );
  }