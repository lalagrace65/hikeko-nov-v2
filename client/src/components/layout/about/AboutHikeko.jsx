import {
    CardHeader,
    CardBody,
    Typography,
    Button,
  } from "@material-tailwind/react";
   
  export function AboutHikeko() {
    return (
    <div className="flex justify-center items-center mt-20 gap-5 bg-about p-20">
        <CardHeader shadow={false}  floated={false}
          className="ml-30 mr-30 shrink-0 rounded-r-none w-80"
        >
          <img
            src="praisedTA_1.jpg"
            alt="card-image"
            className="h-full w-full object-cover"
          />
        </CardHeader>
        <CardBody>
          <Typography color="white" className="mb-8 font-extralight text-2xl">
            At HikeKo, we are passionate about connecting hikers with the beauty of nature. 
            Our mission is to provide an enriching and safe hiking experience for everyone. 
            We believe that every step in nature is a step towards a healthier and happier life.
          </Typography>
          <a href="/about" className="inline-block">
            <Button variant="text" className="flex items-center gap-2">
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
    </div> 
    );
  }