import {
    CardHeader,
    CardBody,
    Typography,
  } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
   
  export function FeaturedPackage() {
    const navigate = useNavigate();

    const handleSimagaysay = () => {
        navigate('/trails/670f417129cedf3c278584b9');
    }
    const handleTimarid = () => {
        navigate('/trails/670eb2bc4b9780da917fe711');
    }
    const handleTiradpass = () => {
        navigate('/trails/670f46b529cedf3c278584d6');
    }
    const handlPalemlem = () => {
        navigate('/trails/670ea39b353edd402dd25e0a');
    }

    return (
    <div className="flex flex-wrap md:flex-row lg:flex-row justify-center items-center mt-5 sm:px-10 md:px-40 lg:px-120">
        <div className="h-[20rem] w-full sm:w-1/2 max-w-[365px] mb-8">
            <CardHeader onClick={handleSimagaysay} floated={false} color="blue-gray" className="cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105 ">
                <img
                    src="mt.batulao.jpg"
                    alt="ui/ux review check"
                />
            <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
            </CardHeader>
            <CardBody>
            <div className="flex items-center justify-between">
                <Typography variant="h5" color="blue-gray" className="font-medium -mt-2">
                Mt. Simagaysay
                </Typography>
            </div>
            <Typography color="gray"  className="font-small text-sm mt-1">
                Alfonso cavite, Philippines
            </Typography>
                <Typography
                    className="flex items-center gap-1.5 font-small text-gray-600 text-sm"
                    >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="-mt-0.5 h-3 w-3 text-gray-600"
                    >
                        <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clipRule="evenodd"
                        />
                    </svg>
                    4.7 . class 2 . Trail Difficulty: 3
                </Typography>
            </CardBody>
        </div>
        {/*feature 2*/}
        <div className="h-[20rem] w-full sm:w-1/2 max-w-[365px] mb-8">
            <CardHeader onClick={handleSimagaysay} floated={false} color="blue-gray" className="cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105 ">
                <img
                    src="mt.batulao.jpg"
                    alt="ui/ux review check"
                />
            <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
            </CardHeader>
            <CardBody>
            <div className="flex items-center justify-between">
                <Typography variant="h5" color="blue-gray" className="font-medium -mt-2">
                Mt. Simagaysay
                </Typography>
            </div>
            <Typography color="gray"  className="font-small text-sm mt-1">
                Alfonso cavite, Philippines
            </Typography>
                <Typography
                    className="flex items-center gap-1.5 font-small text-gray-600 text-sm"
                    >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="-mt-0.5 h-3 w-3 text-gray-600"
                    >
                        <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clipRule="evenodd"
                        />
                    </svg>
                    4.7 . class 2 . Trail Difficulty: 3
                </Typography>
            </CardBody>
        </div>
        {/*feature 3*/}
        <div className="h-[20rem] w-full sm:w-1/2 max-w-[365px] mb-8">
            <CardHeader onClick={handleSimagaysay} floated={false} color="blue-gray" className="cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105 ">
                <img
                    src="mt.batulao.jpg"
                    alt="ui/ux review check"
                />
            <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
            </CardHeader>
            <CardBody>
            <div className="flex items-center justify-between">
                <Typography variant="h5" color="blue-gray" className="font-medium -mt-2">
                Mt. Simagaysay
                </Typography>
            </div>
            <Typography color="gray"  className="font-small text-sm mt-1">
                Alfonso cavite, Philippines
            </Typography>
                <Typography
                    className="flex items-center gap-1.5 font-small text-gray-600 text-sm"
                    >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="-mt-0.5 h-3 w-3 text-gray-600"
                    >
                        <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clipRule="evenodd"
                        />
                    </svg>
                    4.7 . class 2 . Trail Difficulty: 3
                </Typography>
            </CardBody>
        </div>
        {/*feature 4*/}
        <div className="h-[20rem] w-full sm:w-1/2 max-w-[365px] mb-8">
            <CardHeader onClick={handleSimagaysay} floated={false} color="blue-gray" className="cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105 ">
                <img
                    src="mt.batulao.jpg"
                    alt="ui/ux review check"
                />
            <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
            </CardHeader>
            <CardBody>
            <div className="flex items-center justify-between">
                <Typography variant="h5" color="blue-gray" className="font-medium -mt-2">
                Mt. Simagaysay
                </Typography>
            </div>
            <Typography color="gray"  className="font-small text-sm mt-1">
                Alfonso cavite, Philippines
            </Typography>
                <Typography
                    className="flex items-center gap-1.5 font-small text-gray-600 text-sm"
                    >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="-mt-0.5 h-3 w-3 text-gray-600"
                    >
                        <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clipRule="evenodd"
                        />
                    </svg>
                    4.7 . class 2 . Trail Difficulty: 3
                </Typography>
            </CardBody>
        </div>
    </div>
      
    );
  }