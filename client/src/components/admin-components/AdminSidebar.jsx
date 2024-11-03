import { Card, Typography, List, ListItem, ListItemPrefix,
         ListItemSuffix, Chip, Accordion, AccordionHeader, AccordionBody,} from "@material-tailwind/react";
import { PresentationChartBarIcon, Cog6ToothIcon, InboxIcon, PowerIcon, } from "@heroicons/react/24/solid";
import { Avatar } from "@material-tailwind/react";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { MdTour } from "react-icons/md";
import { RiBookletFill } from "react-icons/ri";
import { FaUserGroup } from "react-icons/fa6";
import React, { useContext } from "react";
import axios from 'axios';

import { useNavigate } from "react-router-dom";
import { UserContext } from "@/UserContext";

export function MultiLevelSidebar() {
  const [open, setOpen] = React.useState(0);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleOpen = (value) => {
    setOpen(open === value ? value : value);
  };

  // Function to handle logout
  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:4000/logout', {}, { withCredentials: true });
      setUser(null);
      navigate('/'); // Redirect to the index after logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleEvent = () => {
    navigate('/admin/events'); 
  };

  const handlePackage = () => {
    navigate('/admin/add-package'); 
  };

  const handleBookingList = () => {
    navigate('/admin/bookings');
  };

  const handleTransactions = () => {
    navigate('/admin/transactions');
  };

  const handleEventArchives = () => {
    navigate('/admin/archives');
  };

  const handleStaffList = () => {
    navigate('/admin/staff-list'); 
  };

  const handleAddStaff = () => {
    navigate('/admin/add-staff'); 
  };

  return (
    <Card className=".h-screen w-80 p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 p-4 ">
        <Typography className="flex items-center gap-2" variant="h5" color="blue-gray">
            <Avatar className="rounded-lg h-10 w-10"
              src="https://docs.material-tailwind.com/img/face-2.jpg" alt="avatar" />
            {!!user && (<div>{user.name}</div>)}
        </Typography>
      </div>
      <List>
        <Accordion
          open={open === 1}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 1}>
            <AccordionHeader onClick={() => handleOpen(1)} className="bg-transparent border-b-0 p-3">
              <ListItemPrefix>
                <PresentationChartBarIcon className="h-6 w-6 mr-2" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Dashboard
              </Typography>
            </AccordionHeader>
          </ListItem>
          
          <AccordionBody className="py-1">
            <List className="p-0">
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Analytics
              </ListItem>
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Reporting
              </ListItem>
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Projects
              </ListItem>
            </List>
          </AccordionBody>
        </Accordion>

        <Accordion
          open={open === 2}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${open === 2 ? "rotate-180" : ""}`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 2}>
            <AccordionHeader onClick={() => handleOpen(2)} className="bg-transparent border-b-0 p-3">
              <ListItemPrefix>
                <MdTour className="h-6 w-6 mr-2" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Tours & Packages
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              <ListItem onClick={handleEvent}>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Event List
              </ListItem>
              <ListItem onClick={handlePackage}>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Create Event
              </ListItem>
              
              
              <ListItem onClick={handleEventArchives}>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Event Archives
              </ListItem>
            </List>
          </AccordionBody>
        </Accordion>

        <Accordion
          open={open === 3}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${open === 3 ? "rotate-180" : ""}`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 3}>
            <AccordionHeader onClick={() => handleOpen(3)} className="bg-transparent border-b-0 p-3">
              <ListItemPrefix>
                <RiBookletFill  className="h-5 w-5 mr-2" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Bookings
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              <ListItem onClick={handleBookingList}>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Booking list
              </ListItem>
              <ListItem onClick={handleTransactions}>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Transactions
              </ListItem>
            </List>
          </AccordionBody>
        </Accordion>

        <Accordion
          open={open === 4}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${open === 4 ? "rotate-180" : ""}`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 4}>
            <AccordionHeader onClick={() => handleOpen(4)} className="bg-transparent border-b-0 p-3">
              <ListItemPrefix>
                <FaUserGroup  className="h-5 w-5 mr-2" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Staff
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              <ListItem onClick={handleStaffList}>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Staff List
              </ListItem>
              <ListItem onClick={handleAddStaff}>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Create Staff
              </ListItem>
            </List>
          </AccordionBody>
        </Accordion>

        <ListItem>
          <ListItemPrefix>
            <InboxIcon className="h-5 w-5 mr-2" />
          </ListItemPrefix>
          Inbox
          <ListItemSuffix>
            <Chip value="14" size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
          </ListItemSuffix>
        </ListItem>

        <ListItem>
          <ListItemPrefix>
            <Cog6ToothIcon className="h-5 w-5 mr-2" />
          </ListItemPrefix>
          Settings
        </ListItem>
        
        <ListItem onClick={handleLogout}>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5 mr-2" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
    </Card>
  );
}
