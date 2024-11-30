import { Card, Typography, List, ListItem, ListItemPrefix, ListItemSuffix, Chip, Accordion, AccordionHeader, AccordionBody, } from "@material-tailwind/react";
import { Cog6ToothIcon, PowerIcon, } from "@heroicons/react/24/solid";
import { Avatar } from "@material-tailwind/react";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { MdTour } from "react-icons/md";
import { RiBookletFill } from "react-icons/ri";
import React, { useContext, useEffect, useState, } from "react";
import { FaBars, FaTimes } from 'react-icons/fa';
import axios from 'axios';

import { useNavigate } from "react-router-dom";
import { UserContext } from "@/UserContext";
import { baseUrl } from "@/Url";
import toast from "react-hot-toast";

export function StaffSidebar() {
  const [open, setOpen] = React.useState(0);
  const [logo, setLogo] = useState(null);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false); // To manage the sidebar toggle on mobile

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const response = await axios.get(`${baseUrl}/staff-details/settings/getSystemLogo`);
        const systemLogo = response.data.avatar;
        setLogo(systemLogo);
      } catch (error) {
        console.error("Error fetching logo:", error);
      }
    };
    fetchLogo();
  }, []);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${baseUrl}/logout`, {}, { withCredentials: true });
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null);
      toast.success('Logged out successfully.');
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleStaff = () => navigate('/staff-db');
  const handleEvent = () => navigate('/staff/events');
  const handlePackage = () => navigate('/staff/add-package');
  const handleBookingList = () => navigate('/admin/bookings');
  const handleTransactions = () => navigate('/admin/transactions');
  const handleSettings = () => navigate('/staff/settings');

  return (
    <div>
      {/* Hamburger menu on mobile */}
      <button
        className="lg:hidden p-4 text-white"
        onClick={handleSidebarToggle}
      >
        {sidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      
      {/* Sidebar */}
      <div
        className={`lg:w-80 w-full h-full p-4 shadow-xl shadow-blue-gray-900/5 bg-white absolute lg:relative top-0 left-0 z-50
          transform transition-all duration-300 ease-in-out 
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 overflow-y-auto`}
      >
       
          <div className="mb-2 p-4">
            <div className="flex items-center gap-2 cursor-pointer">
            <Typography variant="h5" color="blue-gray"
              onClick={() => navigate('/staff-db')}
            >
              <Avatar
                src={logo || "/GUEST-PROFILE.png"}  // Fallback to a default logo if the fetched logo is null
                alt="Logo"
              />
              {user.firstName}
            </Typography>
            </div>
          </div>
          <List>
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
            <ListItem onClick={handleSettings}>
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
      </div>
    </div>
  );
}
