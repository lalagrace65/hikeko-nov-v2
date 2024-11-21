import { useEffect, useState } from "react";

import GlobalApi from "@/Shared/GlobalApi";
import TrailList from "@/components/maps/TrailList";
import MyDatePicker from "@/components/maps/MyDatePicker";
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

  const getGooglePlace=()=>{
    setLoading(true)
  GlobalApi.getGooglePlace().then((res)=>{
    setTrailList(res.data.product.results)
    setLoading(false)
  })
}

  return (
      <div>
          <TrailList trailList={trailList}/>
      </div>

  );
}