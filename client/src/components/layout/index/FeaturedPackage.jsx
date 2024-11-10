import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
  } from "@material-tailwind/react";
  import { useNavigate } from "react-router-dom";

  export function FeaturedPackage() {
    const navigate = useNavigate();

    return (
      <div className="flex justify-center items-center mt-10 gap-5">
        {/*featured card 1*/}
        <Card
          shadow={false}
          className="relative grid h-[20rem] w-full max-w-[275px] overflow-hidden text-center "
        >
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="absolute inset-0 m-0 h-full w-full rounded-none bg-cover bg-center"
            style={{ backgroundImage: "url('/palemlem.jpg')" }}
          >
            <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/70 via-black/40" />
          </CardHeader>
  
          <CardBody className="relative p-4">
            <div className="absolute top-3 left-3 text-left">
              <Typography color="white">
                <span className="text-xl font-bold">MT. Palemlem</span>
                <span className="text-sm font-bold">Day hike</span>
              </Typography>
            </div>
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2">
                <a href="http://localhost:5173/trails/670ea39b353edd402dd25e0a">
                <Button className="bg-transparent border-2"> Book Now</Button>
                </a>
            </div>
          </CardBody>
        </Card>
  
        {/*featured card 2*/}
        <Card
          shadow={false}
          className="relative grid h-[20rem] w-full max-w-[275px] overflow-hidden text-center "
        >
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="absolute inset-0 m-0 h-full w-full rounded-none bg-cover bg-center"
            style={{ backgroundImage: "url('/sicapoo.jpg')" }}
          >
            <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/70 via-black/40" />
          </CardHeader>
  
          <CardBody className="relative p-4">
            <div className="absolute top-3 left-3 text-left">
              <Typography color="white">
                <span className="text-xl font-bold">MT. Sicapoo</span>
                <span className="text-sm font-bold">Day hike</span>
              </Typography>
            </div>
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2">
                <a href="http://localhost:5173/trails/670eae174b9780da917fe6ca">
                <Button className="bg-transparent border-2"> Book Now</Button>
                </a>
            </div>
          </CardBody>
        </Card>

        {/*featured card 3*/}
        <Card
          shadow={false}
          className="relative grid h-[20rem] w-full max-w-[275px] overflow-hidden text-center "
        >
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="absolute inset-0 m-0 h-full w-full rounded-none bg-cover bg-center"
            style={{ backgroundImage: "url('/timarid.jpg')" }}
          >
            <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/70 via-black/40" />
          </CardHeader>
  
          <CardBody className="relative p-4">
            <div className="absolute top-3 left-3 text-left">
              <Typography color="white">
                <span className="text-xl font-bold">MT. Timarid</span>
                <span className="text-sm font-bold">Day hike</span>
              </Typography>
            </div>
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2">
                <a href="http://localhost:5173/trails/670eb2bc4b9780da917fe711">
                <Button className="bg-transparent border-2"> Book Now</Button>
                </a>
            </div>
          </CardBody>
        </Card>

        {/*featured card 4*/}
        <Card
          shadow={false}
          className="relative grid h-[20rem] w-full max-w-[275px] overflow-hidden text-center "
        >
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="absolute inset-0 m-0 h-full w-full rounded-none bg-cover bg-center"
            style={{ backgroundImage: "url('/scenery2.png')" }}
          >
            <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/70 via-black/40" />
          </CardHeader>
  
          <CardBody className="relative p-4">
            <div className="absolute top-3 left-3 text-left">
              <Typography color="white">
                <span className="text-xl font-bold">MT. Simagaysay</span>
                <span className="text-sm font-bold">Day hike</span>
              </Typography>
            </div>
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2">
                <a href="http://localhost:5173/trails/670f417129cedf3c278584b9">
                <Button className="bg-transparent border-2"> Book Now</Button>
                </a>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }
  