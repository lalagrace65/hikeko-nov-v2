import { baseUrl } from "@/Url";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
  } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
   
function CheckIcon() {
return (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className="h-3 w-3"
    >
    <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 12.75l6 6 9-13.5"
    />
    </svg>
);
}

export function PricingCard() {
const navigate = useNavigate();

const basicPlanSubscription = () => {
    navigate('/basicPlanSubscription'); 
};

const premiumPlanSubscription = () => {
    navigate('/uploadProofSubscription'); 
};
return (
    <div className="grid gap-10 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1">
        {/* Basic Plan Subscription */}
        <Card variant="gradient" className="w-full max-w-[20rem] p-8 bg-cardPrice shadow-xl hover:scale-[1.02] mb-6">
            <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="m-0 mb-8 rounded-none border-b border-white/10 pb-8 text-center text-primary"
            >
                <Typography variant="small" className="font-normal uppercase">BASIC PLAN</Typography>
                <Typography
                    variant="h1"
                    className="mt-6 flex justify-center gap-1 text-7xl font-normal"
                >
                    <span className="mt-2 text-4xl">₱</span>0{" "}
                    <span className="self-end text-4xl"></span>
                </Typography>
            </CardHeader>
            <CardBody className="p-0">
                <ul className="flex flex-col gap-4">
                    <li className="flex items-center gap-4">
                        <span className="rounded-full border border-white/20 bg-primary p-1 text-white">
                            <CheckIcon />
                        </span>
                        <Typography className="font-normal">1 Admin Account</Typography>
                    </li>
                    <li className="flex items-center gap-4">
                        <span className="rounded-full border border-white/20 bg-primary p-1 text-white">
                            <CheckIcon />
                        </span>
                        <Typography className="font-normal">3 Staff Accounts</Typography>
                    </li>
                    <li className="flex items-center gap-4">
                        <span className="rounded-full border border-white/20 bg-primary p-1 text-white">
                            <CheckIcon />
                        </span>
                        <Typography className="font-normal">Up to 6 Events per month</Typography>
                    </li>
                    <li className="flex items-center gap-4">
                        <span className="rounded-full border border-white/20 bg-primary p-1 text-white">
                            <CheckIcon />
                        </span>
                        <Typography className="font-normal">3 months free plan</Typography>
                    </li>
                </ul>
            </CardBody>
            <CardFooter className="mt-12 p-0">
                <Button
                    size="lg"
                    className="hover:scale-[1.02] focus:scale-[1.02] active:scale-100 bg-primary"
                    ripple={false}
                    fullWidth={true}
                    onClick={basicPlanSubscription}
                >
                    Get Started
                </Button>
            </CardFooter>
        </Card>

        {/* Premium Plan Subscription */}
        <Card variant="gradient" className="w-full max-w-[20rem] p-8 bg-cardPrice shadow-xl hover:scale-[1.02] mb-6">
            <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="m-0 mb-8 rounded-none border-b border-white/10 pb-8 text-center text-primary"
            >
                <Typography variant="small" className="font-normal uppercase">PREMIUM PLAN</Typography>
                <Typography
                    variant="h1"
                    className="mt-6 flex justify-center gap-1 text-7xl font-normal"
                >
                    <span className="mt-2 text-4xl">₱</span>120{" "}
                    <span className="self-end text-sm">/6 months</span>
                </Typography>
            </CardHeader>
            <CardBody className="p-0">
                <ul className="flex flex-col gap-4">
                    <li className="flex items-center gap-4">
                        <span className="rounded-full border border-white/20 bg-primary p-1 text-white">
                            <CheckIcon />
                        </span>
                        <Typography className="font-normal whitespace-nowrap">1 Admin Account</Typography>
                    </li>
                    <li className="flex items-center gap-4">
                        <span className="rounded-full border border-white/20 bg-primary p-1 text-white">
                            <CheckIcon />
                        </span>
                        <Typography className="font-normal whitespace-nowrap">5 Staff Accounts</Typography>
                    </li>
                    <li className="flex items-center gap-4">
                        <span className="rounded-full border border-white/20 bg-primary p-1 text-white">
                            <CheckIcon />
                        </span>
                        <Typography className="font-normal whitespace-nowrap">Up to 10 Events per month</Typography>
                    </li>
                    <li className="flex items-center gap-4">
                        <span className="rounded-full border border-white/20 bg-primary p-1 text-white">
                            <CheckIcon />
                        </span>
                        <Typography className="font-normal whitespace-nowrap">2 Ads per month</Typography>
                    </li>
                </ul>
            </CardBody>
            <CardFooter className="mt-12 p-0">
                <Button
                    size="lg"
                    className="hover:scale-[1.02] focus:scale-[1.02] active:scale-100 bg-primary"
                    ripple={false}
                    fullWidth={true}
                    onClick={premiumPlanSubscription}
                >
                    Get Started
                </Button>
            </CardFooter>
        </Card>
    </div>
);


}