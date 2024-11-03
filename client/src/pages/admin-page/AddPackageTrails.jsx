import { useEffect, useState } from "react";

import GlobalApi from "@/Shared/GlobalApi";
import GoogleMapView from "@/components/maps/GoogleMapView";
import AdminTrailList from "@/components/maps/AdminTrailList";
export default function AddPackageTrails() {

  const [category, setCategory] = useState();
  const [radius, setRadius] = useState(2500);
  const [trailList, setTrailList] = useState([]);
  const [loading,setLoading]=useState(true);


useEffect(()=>{
  getGooglePlace();
},[category,radius])

  const getGooglePlace=()=>{
    setLoading(true)
  GlobalApi.getGooglePlace(category,radius).then((res)=>{
    console.log(res.data.product.results);
    setLoading(false)
  })
}

  return (
    <div className="grid grid-cols-1 h-screen md:grid-cols-4 justify-center">
      <div className="p-3">
        <h1 className="text-2xl font-bold mb-4">Add Package Admin Trails</h1>
      </div>
      <div className="col-span-3">
        <GoogleMapView trailList={trailList}/>
        <div className='md:absolute mx-2 w-[90%] md:w-[74%]
           bottom-36 relative md:bottom-3'>

            <AdminTrailList trailList={trailList}/>
        
        </div>
      </div>
    </div>
  );
}