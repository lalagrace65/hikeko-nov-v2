import { Card, Typography, List, ListItem, ListItemPrefix, ListItemSuffix, Chip, Accordion, AccordionHeader, AccordionBody, } from "@material-tailwind/react";
import { PresentationChartBarIcon, Cog6ToothIcon, InboxIcon, PowerIcon, } from "@heroicons/react/24/solid";
import { Avatar } from "@material-tailwind/react";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { BiSolidReport } from "react-icons/bi";
import { MdTour } from "react-icons/md";
import { RiBookletFill } from "react-icons/ri";
import { FaUserGroup } from "react-icons/fa6";
import React, { useContext, useEffect, useState, } from "react";
import { FaBars, FaTimes } from 'react-icons/fa';
import axios from 'axios';

import { useNavigate } from "react-router-dom";
import { UserContext } from "@/UserContext";
import { baseUrl } from "@/Url";
import toast from "react-hot-toast";

export function MultiLevelSidebar() {
  const [open, setOpen] = React.useState(0);
  const [logo, setLogo] = useState(null);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false); // To manage the sidebar toggle on mobile

  useEffect(() => {
    const fetchBusinessName = async () => {
      if (user && user.token) {
        try {
          const response = await axios.get(`${baseUrl}/admin-details`, {
            headers: { Authorization: `Bearer ${user.token}` },
          });
          setUser((prevUser) => ({
            ...prevUser,
            businessName: response.data.businessName,
          }));
        } catch (error) {
          console.error("Error fetching business name:", error);
        }
      }
    };
    fetchBusinessName();
  }, []);

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const response = await axios.get(`${baseUrl}/admin-details/settings/getSystemLogo`);
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

  const handleAnalytics = () => navigate('/admin/dashboard');
  const handleReports = () => navigate('/admin/dashboard/reports');
  const handleEvent = () => navigate('/admin/events');
  const handlePackage = () => navigate('/admin/add-package');
  const handleBookingList = () => navigate('/admin/bookings');
  const handleTransactions = () => navigate('/admin/transactions');
  const handleEventArchives = () => navigate('/admin/archives');
  const handleStaffList = () => navigate('/admin/staff-list');
  const handleAddStaff = () => navigate('/admin/add-staff');
  const handlePayment = () => navigate('/admin/payments');
  const handleSettings = () => navigate('/admin/settings');

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
              onClick={() => navigate('/admin/dashboard/analytics')}
            >
              <Avatar
                src={logo || "/default-logo.jpg"}  // Fallback to a default logo if the fetched logo is null
                alt="Logo"
              />
              {user.businessName ? user.businessName : `${user.incrementId}`}
            </Typography>
            </div>
          </div>
          <List>
          {user && user.role === 'admin' && (
            <ListItem onClick={handleAnalytics}>
              <ListItemPrefix>
                <PresentationChartBarIcon className="h-6 w-6 mr-2" />
              </ListItemPrefix>
                Dashboard
            </ListItem>
          )}
          {user && user.role === 'admin' && (
            <ListItem onClick={handleReports}>
              <ListItemPrefix>
                <BiSolidReport  className="h-6 w-6 mr-2" />
              </ListItemPrefix>
                Reports
            </ListItem>
          )}
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
              {user && user.role === 'admin' && ( 
              <ListItem onClick={handleEventArchives}>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Event Archives
              </ListItem>
              )}
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
          {/*staff tab is hidden in the staff account upon login*/} 
          {user && user.role === 'admin' && (  
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
          )}
          
          {user && user.role === 'admin' && (
            <ListItem onClick={handleSettings}>
              <ListItemPrefix>
                <Cog6ToothIcon className="h-5 w-5 mr-2" />
              </ListItemPrefix>
                Settings
            </ListItem>
          )}
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
