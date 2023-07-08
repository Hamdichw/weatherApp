import React from "react";
import { formatToLocalTime } from "../Services/Service";

export default function TimeLocation({weather:{dt  ,timezone , name , country}}) {
  return (
    <div>
      <div className="flex flex-col items-center justify-center my-6 ">
        <p className="text-white text-xl font-extralight">
          {formatToLocalTime(dt,timezone)}
        </p>
      </div>
      <div className="flex flex-col items-center justify-center my-3 ">
        <p className="text-white text-3xl font-meduim">
          {`${name} , ${country}`}
        </p>
      </div>
    </div>
  );
}
