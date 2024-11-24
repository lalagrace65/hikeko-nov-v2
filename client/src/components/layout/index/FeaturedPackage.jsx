import {
    CardHeader,
    CardBody,
    Typography,
  } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { GiMountainRoad } from "react-icons/gi";
   
  export function FeaturedPackage() {
    const navigate = useNavigate();

    const handleSimagaysay = () => {
        navigate('/trails/670eae174b9780da917fe6ca');
    }
    const handleGulugud = () => {
        navigate('/trails/670f511d8100acafad4cdbe3');
    }
    const handleTiradpass = () => {
        navigate('/trails/670f46b529cedf3c278584d6');
    }
    const handlPalemlem = () => {
        navigate('/trails/670ea39b353edd402dd25e0a');
    }

    return (
    <div className="flex flex-wrap md:flex-row lg:flex-row justify-center items-center mt-5 sm:px-10 md:px-40 lg:px-120">
        <div className="md:h-[15rem] lg:h-[20rem] w-full sm:w-1/2 md:w-1/3 lg:w-1/4 max-w-[365px] mb-2">
            <CardHeader onClick={handlPalemlem} floated={false} color="blue-gray" className="cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105 ">
                <img
                    src="palemlem.jpg"
                    alt="ui/ux review check"
                />
            <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
            </CardHeader>
            <CardBody>
            <div className="flex items-center justify-between">
                <Typography variant="h5" color="blue-gray" className="font-medium -mt-2">
                Mt. Palemlem
                </Typography>
            </div>
            <Typography color="gray"  className="font-small text-sm mt-1">
                Adams, Ilocos Norte
            </Typography>
                <Typography
                    className="flex items-center gap-1.5 font-small text-gray-600 text-sm"
                    >
                    <GiMountainRoad />
                    Trail class 2 . Trail Difficulty: 7
                </Typography>
            </CardBody>
        </div>
        {/*feature 2*/}
        <div className="md:h-[15rem] lg:h-[20rem] w-full sm:w-1/2 md:w-1/3 lg:w-1/4 max-w-[365px] mb-2">
            <CardHeader onClick={handleTiradpass} floated={false} color="blue-gray" className="cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105 ">
                <img
                    src="tiradPass.jpg"
                    alt="ui/ux review check"
                />
            <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
            </CardHeader>
            <CardBody>
            <div className="flex items-center justify-between">
                <Typography variant="h5" color="blue-gray" className="font-medium -mt-2">
                Tirad Pass - Sagada Traverse
                </Typography>
            </div>
            <Typography color="gray"  className="font-small text-sm mt-1">
                Gregorio Del Pilar, Ilocos Sur
            </Typography>
                <Typography
                    className="flex items-center gap-1.5 font-small text-gray-600 text-sm"
                    >
                    <GiMountainRoad />
                    Trail class 1 . Trail Difficulty: 5
                </Typography>
            </CardBody>
        </div>
        {/*feature 3*/}
        <div className="md:h-[15rem] lg:h-[20rem] w-full sm:w-1/2 md:w-1/3 lg:w-1/4 max-w-[365px] mb-2">
            <CardHeader onClick={handleGulugud} floated={false} color="blue-gray" className="cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105 ">
                <img
                    src="gulugud.jpg"
                    alt="ui/ux review check"
                />
            <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
            </CardHeader>
            <CardBody>
            <div className="flex items-center justify-between">
                <Typography variant="h5" color="blue-gray" className="font-medium -mt-2">
                Mt. Gulugud-Baboy
                </Typography>
            </div>
            <Typography color="gray"  className="font-small text-sm mt-1">
                Anilao, Mabini, Batangas
            </Typography>
                <Typography
                    className="flex items-center gap-1.5 font-small text-gray-600 text-sm"
                    >
                    <GiMountainRoad />
                    Trail class 1 . Trail Difficulty: 2
                </Typography>
            </CardBody>
        </div>
        {/*feature 4*/}
        <div className=" md:h-[15rem] lg:h-[20rem] w-full sm:w-1/2 md:w-1/3 lg:w-1/4 max-w-[365px] mb-2">
            <CardHeader onClick={handleSimagaysay} floated={false} color="blue-gray" className="cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105 ">
                <img
                    src="sicapoo.jpg"
                    alt="ui/ux review check"
                />
            <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
            </CardHeader>
            <CardBody>
            <div className="flex items-center justify-between">
                <Typography variant="h5" color="blue-gray" className="font-medium -mt-2">
                Mt. Sicapoo
                </Typography>
            </div>
            <Typography color="gray"  className="font-small text-sm mt-1">
                Solsona, Ilocos Norte
            </Typography>
                <Typography
                    className="flex items-center gap-1.5 font-small text-gray-600 text-sm"
                    >
                    <GiMountainRoad />
                    Trail class 2 . Trail Difficulty: 9
                </Typography>
            </CardBody>
        </div>
    </div>
      
    );
  }