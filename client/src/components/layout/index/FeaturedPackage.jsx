import {
    CardHeader,
    CardBody,
    Typography,
  } from "@material-tailwind/react";
   
  export function FeaturedPackage() {
    return (
    <div className="flex justify-center items-center mt-10">
        <div className="h-[20rem] w-full max-w-[365px] mb-10">
            <CardHeader floated={false} color="blue-gray" className="cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105">
                <img
                    src="mt.batulao.jpg"
                    alt="ui/ux review check"
                />
            <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
            </CardHeader>
            <CardBody>
            <div className="flex items-center justify-between">
                <Typography variant="h5" color="blue-gray" className="font-medium">
                Mt. Batulao
                </Typography>
            </div>
            <Typography color="gray">
                Alfonso cavite, Philippines
            </Typography>
                <Typography
                    className="flex items-center gap-1.5 font-normal text-gray-600"
                    >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="-mt-0.5 h-4 w-4 text-gray-600"
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
        <div className="h-[20rem] w-full max-w-[365px] mb-10 ">
            <CardHeader floated={false} color="blue-gray" className="cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105">
                <img
                    src="gulugud-baboy.jpg"
                    alt="ui/ux review check"
                />
            <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
            </CardHeader>
            <CardBody>
            <div className="flex items-center justify-between">
                <Typography variant="h5" color="blue-gray" className="font-medium">
                Gulugud-baboy
                </Typography>
            </div>
            <Typography color="gray">
                Alfonso cavite, Philippines
            </Typography>
                <Typography
                    className="flex items-center gap-1.5 font-normal text-gray-600"
                    >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="-mt-0.5 h-4 w-4 text-gray-600"
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
        <div className="h-[20rem] w-full max-w-[365px] mb-10 ">
            <CardHeader floated={false} color="blue-gray" className="cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105">
                <img
                    src="scenery1.png"
                    alt="ui/ux review check"
                />
            <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
            </CardHeader>
            <CardBody>
            <div className="flex items-center justify-between">
                <Typography variant="h5" color="blue-gray" className="font-medium">
                Tirad-pass
                </Typography>
            </div>
            <Typography color="gray">
                Alfonso cavite, Philippines
            </Typography>
                <Typography
                    className="flex items-center gap-1.5 font-normal text-gray-600"
                    >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="-mt-0.5 h-4 w-4 text-gray-600"
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
        <div className="h-[20rem] w-full max-w-[365px] mb-10 ">
            <CardHeader floated={false} color="blue-gray" className="cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105">
                <img
                    src="scenery2.png"
                    alt="ui/ux review check"
                />
            <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
            </CardHeader>
            <CardBody>
            <div className="flex items-center justify-between">
                <Typography variant="h5" color="blue-gray" className="font-medium">
                Mt. Palemlem
                </Typography>
            </div>
            <Typography color="gray">
                Alfonso cavite, Philippines
            </Typography>
                <Typography
                    className="flex items-center gap-1.5 font-normal text-gray-600"
                    >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="-mt-0.5 h-4 w-4 text-gray-600"
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