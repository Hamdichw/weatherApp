import React, { useState } from "react";
import { UilSearch, UilLocationPinAlt } from "@iconscout/react-unicons";
export default function SearchBar({setQuery , setUnits , units}) {
  const[city,setCity] = useState('')
  const hundleSearchInput = () =>{
    if(city){
      setQuery({q:city})
    }
   
  }
 const hundleUnits= (e)=>{
  const unit = e.currentTarget.name
  if(unit !== units){
    setUnits(unit)
  }
 }
  const hundleLocation=()=>{
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        setQuery({lat,lon,})
      })
    }
  }
  return (
    <div className="flex flex-row justify-center my-6 ">
      <div className="mx-2 flex flex-row w-3/4 items-center justify-center space-x-4">
        <input
        
          value={city}
          type="text"
          placeholder="Search for city ....."
          className=" text-xl font-light  p-2 w-full shadow-xl focus:outline-none capitalize placeholder:lowercase"
          onChange={(e)=>setCity(e.currentTarget.value)}
        />
        
        <UilSearch
          size={25}
          className="text-white cursor-pointer transition ease-out hover:scale-125 "
          onClick ={hundleSearchInput}
        />
        <UilLocationPinAlt
          size={25}
          className="text-white cursor-pointer transition ease-out  hover:scale-125 "
          onClick ={hundleLocation}
        />
      </div>
      <div className="mx-2 flex flex-row w-1/4 items-center justify-center ">
        <button name="metric" className="text-xl text-white font-light  transition ease-out hover:scale-125"
        onClick={hundleUnits}>
          °C
        </button>
        <p className="text-xl text-white mx-1">|</p>
        <button name="imperial" className="text-xl text-white font-light  transition ease-out hover:scale-125" onClick={hundleUnits}>
          °F
        </button>
      </div>
    </div>
  );
}
