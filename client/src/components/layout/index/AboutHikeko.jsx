import {
    CardHeader,
    CardBody,
    Typography,
    Button,
  } from "@material-tailwind/react";
   
  export function AboutHikeko() {
    return (
      // About Hikeko
    <div className="flex justify-center items-center mt-20 bg-about" style={{paddingLeft: "165px", paddingRight: "155px", paddingTop: "40px", paddingBottom: "40px"  }}>
        <CardHeader shadow={false}  floated={false}
          className=" w-2/5 shrink-0 rounded-r-none" 
        >
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
            alt="card-image"
            className="h-full w-full object-cover"
          />
        </CardHeader>
        <CardBody>
          <Typography color="white" className="mb-8 font-extralight text-lg">
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