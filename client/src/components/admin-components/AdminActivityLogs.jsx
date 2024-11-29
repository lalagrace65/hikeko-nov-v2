import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Typography, Spinner } from "@material-tailwind/react";
import { baseUrl } from "@/Url";

const ActivityLogs = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRecentActivities = async () => {
    setLoading(true);
    setError(null);

    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));

      if (!storedUser?.id || !storedUser?.token) {
        throw new Error("User is not authenticated.");
      }

      const response = await axios.get(
        `${baseUrl}/admin/package-activities?adminId=${storedUser.id}`,
        {
          headers: {
            Authorization: `Bearer ${storedUser.token}`,
          },
        }
      );
      console.log("API Response:", response.data);
      setActivities(response.data.activities || []);
    } catch (err) {
      console.error("Error fetching recent activities:", err);
      setError(err.response?.data?.message || err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecentActivities();
  }, []); // Fetch only once when the component mounts

  // Slice the activities array to show only the first 3
  const recentActivities = activities.slice(0, 3);

  return (
    <div className="recent-activities">
      <Typography variant="h4" className="mb-4">
        Recent Activities
      </Typography>
      {loading ? (
        <div className="flex justify-center">
          <Spinner />
        </div>
      ) : error ? (
        <Typography variant="small" color="red" className="text-center">
          {error}
        </Typography>
      ) : recentActivities.length > 0 ? (
        <Card
          className="border overflow-y-auto"
          style={{
            maxHeight: "350px",
            padding: "16px",
            borderRadius: "16px",
          }}
        >
          <ul className="list-none p-0 m-0">
            {recentActivities.map((activity, index) => (
              <li key={index} className="mb-4 border-b pb-2">
                <Typography variant="body1" color="blue-gray">
                  {activity.description || "No description available"}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {activity.createdAt
                    ? new Date(activity.createdAt).toLocaleString()
                    : "Unknown time"}
                </Typography>
              </li>
            ))}
          </ul>
        </Card>
      ) : (
        <Typography variant="small" color="gray" className="text-center">
          No recent activities found.
        </Typography>
      )}
    </div>
  );
};

export default ActivityLogs;
