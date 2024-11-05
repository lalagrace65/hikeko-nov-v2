import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
 
function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${id === open ? "rotate-180" : ""} h-5 w-5 transition-transform`}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  );
}
 
export function GeneralQuestion() {
  const [open, setOpen] = React.useState(0);
 
  const handleOpen = (value) => setOpen(open === value ? 0 : value);
 
  return (
    <div className="px-10">
      <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
        <AccordionHeader onClick={() => handleOpen(1)} className="bg-transparent ">What is Hiking?</AccordionHeader>
        <AccordionBody>
            Hiking is a form of walking, usually on trails, often in natural areas. 
            It's a popular outdoor activity that offers many benefits for physical and mental health.
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 2} icon={<Icon id={2} open={open} />}>
        <AccordionHeader onClick={() => handleOpen(2)} className="bg-transparent ">
            What equipment do I need for hiking? 
        </AccordionHeader>
        <AccordionBody>
            Basic hiking essentials include comfortable hiking boots, appropriate clothing, a backpack, water, snacks, a map, and a compass. 
            Depending on the hike, you may also need additional items like trekking poles, a first-aid kit, and rain gear.
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 3} icon={<Icon id={3} open={open} />}>
        <AccordionHeader onClick={() => handleOpen(3)} className="bg-transparent">
            How do I choose a hiking trail? 
        </AccordionHeader>
        <AccordionBody>
            Consider your fitness level, experience, and the amount of time you have available. 
            Research different trails to find one that matches your interests and abilities. Look for information on trail length, elevation gain, difficulty level, and scenic features.
        </AccordionBody>
      </Accordion>
    </div>
  );
}