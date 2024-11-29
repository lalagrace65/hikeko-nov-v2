import { MultiLevelSidebar } from "@/components/admin-components/AdminSidebar";
import React, { useContext, useEffect, useState } from "react";
import { Card, CardBody, Typography, Spinner } from "@material-tailwind/react";
import { PiPackageThin } from "react-icons/pi";
import { PiBookLight } from "react-icons/pi";
import axios from "axios";
import MonthlyBookingsTravelAgency from "@/components/admin-components/MonthlyBookingsTravelAgency";
import AdminRecentActivity from "@/components/admin-components/AdminRecentActivity";
import { UserContext } from "@/UserContext";

export default function AdminPage() {
  const { user, setUser } = useContext(UserContext);
  const [totalStaff, setTotalStaff] = useState(0);
  const [staffStatus, setStaffStatus] = useState({
    active: 0,
    suspended: 0
  })
  const [totalBookings, setTotalBookings] = useState(0);
  const [totalPackages, setTotalPackages] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [adminData, setAdminData] = useState(null);
  const [packageStatus, setPackageStatus] = useState({
     upcoming: 0, 
     ongoing: 0, 
     ended: 0 
  });

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

  const adminId = localStorage.getItem("user");
  // Fetch admin data (if not in state yet)
  useEffect(() => {
    if (!adminData && adminId) {
      const data = JSON.parse(adminId); // Assuming admin data is stored as a stringified object
      setAdminData(data);
    }
  }, [adminId, adminData]);

  // Fetch data when the component mounts, and only if adminData is set
  useEffect(() => {
    if (adminData) {
      fetchData();
    }
  }, [adminData]); // This will run when adminData is set


  // Centralized function to handle multiple GET requests
  const fetchData = async () => {
    try {
      if (!adminData || !adminData.token) {
        throw new Error("Admin ID or token is missing");
      }

      setLoading(true);
      const headers = {
        Authorization: `Bearer ${adminData.token}`, // Pass token in Authorization header
      };

      const [staffRes, bookingsRes, packagesRes, earningsRes, subscriptionRes, packageStatusRes ] = await Promise.all([
        axios.get("/api/staff-count", { headers }),
        axios.get("/api/booking-count", { headers }),
        axios.get("/api/package-count", { headers }),
        axios.get("/api/total-earnings", { headers }),
        axios.get("/admin-details", { headers }),
        axios.get("/packages", {headers}),
      ]);

      const packages = packageStatusRes.data;

      if (packageStatusRes.status === 200 && packageStatusRes.data.length > 0) {
        const packages = packageStatusRes.data;
        const upcomingPackages = packages.filter((packageItem) => packageItem.status === 'upcoming').length;
        const ongoingPackages = packages.filter((packageItem) => packageItem.status === 'ongoing').length;
        const endedPackages = packages.filter((packageItem) => packageItem.status === 'ended').length;
      
        setPackageStatus({
          upcoming: upcomingPackages,
          ongoing: ongoingPackages,
          ended: endedPackages,
        });
      } else {
        console.error("Error fetching package status:", packageStatusRes);
      }

      setTotalStaff(staffRes.data.totalStaff);
      setStaffStatus({
        active: staffRes.data.active,
        suspended: staffRes.data.suspended,
      });


      setTotalStaff(staffRes.data.totalStaff);
      setTotalBookings(bookingsRes.data.bookingCount);
      setTotalPackages(packagesRes.data.packageCount);
      setTotalEarnings(earningsRes.data.totalEarnings);
      setSubscriptions(subscriptionRes.data.subscriptionId);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to load data.");
    } finally {
      setLoading(false);
    }
  };

  function formatCurrency(amount, currency = 'PHP') {
    return new Intl.NumberFormat('en-PH', {
        style: 'currency',
        currency,
    }).format(amount);
  }  

  return (
    <div className="flex h-screen">
      <MultiLevelSidebar />
      <div className="flex-1 p-6 sm:p-10">
        <div className="flex gap-2 items-center">
            <Typography className="text-3xl font-bold mb-4 uppercase">{user.businessName ? user.businessName : 'Admin'}</Typography>
            <Typography variant="h6" className="text-xs text-gray-500">REPORTS AND STATISTICS</Typography>
        </div>
        <div className="p-4">
            {loading ? (
                <Spinner />
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <div className="">
                    <div className="grid gap-2 sm:grid-cols-3">
                        {/*Total Staff*/}
                        <Card className="flex flex-col border ">
                            <CardBody>
                                <div className="flex items-center space-x-10">
                                    {/* SVG on the left */}
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="size-20">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                                    </svg>
                                    {/* Text on the right */}
                                    <div className="flex flex-col gap-2">
                                        <div className="flex gap-2">
                                          <Typography variant="h3">Total Staff:</Typography><Typography variant="h3" className="font-light">{totalStaff}</Typography>
                                        </div>
                                        <div className="flex gap-2">
                                          <div className="flex items-center  border-r pr-2 border-gray-300 gap-2">
                                            <Typography variant="h6">Active:</Typography><Typography variant="h6" className="font-light">{staffStatus.active || 0}</Typography>
                                          </div>
                                          <div className="flex items-center border-gray-300 gap-2">
                                            <Typography variant="h6">Suspended:</Typography><Typography variant="h6" className="font-light">{staffStatus.suspended || 0}</Typography>
                                          </div>
                                        </div>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                        {/*Total Bookings*/}
                        <Card className="flex flex-col border ">
                            <CardBody>
                                <div className="flex items-center space-x-10">
                                    {/* SVG on the left */}
                                    <PiBookLight className="w-20 h-20"/>
                                    {/* Text on the right */}
                                    <div className="flex gap-2">
                                    <Typography variant="h3">Total Bookings:</Typography><Typography variant="h3" className="font-light">{totalBookings}</Typography>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                        {/*Total Package*/}
                        <Card className="flex flex-col border ">
                            <CardBody>
                                <div className="flex items-center space-x-10">
                                    {/* SVG on the left */}
                                    <PiPackageThin className="w-20 h-20"/>
                                    {/* Text on the right */}
                                    <div className="flex gap-2">
                                        <Typography variant="h3">Total Packages:</Typography><Typography variant="h3" className="font-light">{totalPackages}</Typography> 
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                    <div className="mt-4 grid gap-2 sm:grid-cols-3">
                        {/*Total Archived*/}
                        <Card className="flex flex-col border ">
                            <CardBody>
                                <div className="flex items-center space-x-10">
                                    {/* SVG on the left */}
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="size-20">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                                    </svg>
                                    {/* Text on the right */}
                                    <div className="flex flex-col">
                                        <Typography variant="h5">Event List</Typography>
                                        <div className="grid grid-cols-3 gap-2">
                                            <div className="flex items-center  border-r pr-2 border-gray-300 gap-2">
                                                <Typography variant="h6">Upcoming:</Typography><Typography variant="h6" className="font-light">{packageStatus.upcoming || 0}</Typography>
                                            </div>
                                            <div className="flex items-center border-r px-1 border-gray-300 gap-2">
                                                <Typography variant="h6">Ongoing:</Typography><Typography variant="h6" className="font-light">{packageStatus.ongoing || 0}</Typography>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Typography variant="h6">Ended:</Typography><Typography variant="h6" className="font-light">{packageStatus.ended || 0}</Typography>
                                            </div>
                                        </div> 
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                        {/*Total Earnings*/}
                        <Card className="flex flex-col border ">
                            <CardBody>
                                <div className="flex items-center space-x-10">
                                    {/* SVG on the left */}
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="size-20">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                                    </svg>
                                    {/* Text on the right */}
                                    <div className="flex gap-2">
                                    <Typography variant="h4">Total Earnings:</Typography><Typography variant="h3" className="font-light">{formatCurrency(totalEarnings, 'PHP')}</Typography> 
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                        {/*Subscription date*/}
                        <Card className="flex flex-col border ">
                            <CardBody>
                                <div className="flex items-center space-x-10">
                                    {/* SVG on the left */}
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="size-20">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                                    </svg>
                                    {/* Text on the right */}
                                    <div className="flex flex-col">
                                        <Typography variant="h5">Subscription Details</Typography>
                                        <div className="grid grid-cols-2">
                                            <div className="flex gap-1">
                                                <Typography variant="h6">Plan:</Typography><Typography variant="h6" className="font-light"> {subscriptions?.subscriptionPlan || "N/A"}</Typography>
                                            </div>
                                            <div className="flex gap-1">
                                            <Typography variant="h6">Start:</Typography><Typography variant="h6" className="font-light">{subscriptions?.subscriptionStartDate ? new Date(subscriptions.subscriptionStartDate).toLocaleDateString() : "N/A"}</Typography>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2"> 
                                            <div className="flex gap-1">
                                                <Typography variant="h6">Status:</Typography><Typography variant="h6" className="font-light">{subscriptions?.subscriptionStatus || "N/A"}</Typography> 
                                            </div>
                                            <div className="flex gap-1">
                                                <Typography variant="h6">Expiry:</Typography><Typography variant="h6" className="font-light">{subscriptions?.subscriptionEndDate ? new Date(subscriptions.subscriptionEndDate).toLocaleDateString() : "N/A"}</Typography>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                    <div className="mt-4 flex flex-row space-x-4">
                        <div className="flex flex-col w-2/3">
                            <Typography variant="h4" className="flex mb-4">Monthly Bookings</Typography>
                            <MonthlyBookingsTravelAgency />
                        </div>
                        <div className="flex w-1/3">
                            <AdminRecentActivity adminId={adminId} />
                        </div>
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
}
