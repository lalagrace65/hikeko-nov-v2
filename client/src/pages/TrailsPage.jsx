import { useEffect, useState } from "react";

import GlobalApi from "@/Shared/GlobalApi";
import CategoryList from "@/components/maps/CategoryList";
import RangeSelect from "@/components/maps/RangeSelect";
import SelectRating from "@/components/maps/SelectRating";
import GoogleMapView from "@/components/maps/GoogleMapView";
import TrailList from "@/components/maps/TrailList";
import MyDatePicker from "@/components/maps/MyDatePicker";
import SkeltonLoading from "@/components/icons/SkeletonLoading";
export default function TrailsPage() {

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
        <CategoryList onChangeCategory={(value)=>setCategory(value)}/>
        <RangeSelect onRadiusChange={(value)=>setRadius(value)}/>
        <SelectRating/>
        <MyDatePicker/>
      </div>
      <div className="col-span-3">
        <GoogleMapView trailList={trailList}/>
        <div className='md:absolute mx-2 w-[90%] md:w-[74%]
           bottom-36 relative md:bottom-3'>

           
            <TrailList trailList={trailList}/>
            
            
        </div>
      </div>
    </div>
  );
}