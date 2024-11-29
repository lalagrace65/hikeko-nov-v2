import { useEffect, useState } from "react";


import TrailList from "@/components/maps/TrailList";
import MyDatePicker from "@/components/maps/MyDatePicker";
import { baseUrl } from "@/Url";
import axios from "axios";
export default function TrailsPage() {

  const [trailList, setTrailList] = useState([]);
  const [loading,setLoading]=useState(true);

  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

  useEffect(()=>{
    getGooglePlace();
  },[])

  const getGooglePlace = async () => {
    try {
        const response = await axios.get(`${baseUrl}/api/trails`);  // Make sure this is the correct endpoint
        setTrailList(response.data.results);  // Assuming this is the correct data structure
        setLoading(false);
    } catch (error) {
        console.error(error);
    }
};


  return (
      <div>
          <TrailList trailList={trailList}/>
      </div>

  );
}