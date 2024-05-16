"use client"
import React from "react";
import { useEffect,useState } from "react";
import { useGeneralStore } from '@/providers/GeneralStoreProvider'

export default function Profile({jobsData}:any) {
  const [profileData, setProfileData]: any = useState([]);
  const [appliedJobs, setAppliedJobs]: any = useState([]);

  const { userData,setUserData, setIsSignUp } = useGeneralStore(
    (state) => state,
  )
  

  useEffect(() => {
    // @ts-ignore
   const data: any = JSON.parse(localStorage.getItem("userData"));
   if(data){
    setProfileData(data);
    let selectedJobs: any = [];
     jobsData.data.map((s:any) => 
     {
      if(data.user.appliedJobs.includes(s.id)){
        selectedJobs.push(s)
      }
     }
     )
     setAppliedJobs(selectedJobs)    
    }

  }, [userData]);


  return (
    <>
      <div className="flex flex-col items-center gap-5 p-5">
        <img
          className="w-56 h-56 rounded-full"
          src={profileData?.user?.profileImage ? profileData?.user?.profileImage : "https://flowbite.com/docs/images/people/profile-picture-5.jpg"}
          alt=""
        />
        <div className="flex flex-col md:gap-10 gap-4 md:h-dvh overflow-y-auto  w-full md:pb-36">
        <div className="font-medium flex flex-col items-center dark:text-white">
          <div>{profileData?.user?.email ? profileData?.user?.email : "hr@shft.co"}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
          Joined in May 2024
          </div>

          <h1 className="mt-5">{profileData?.user?.appliedJobs?.length > 0 ? "Applied Jobs" : ""}</h1>
        </div>
        { appliedJobs?.length > 0 &&
          appliedJobs?.map((job:any) => {
            return (
              <div key={job.id} className="flex flex-col justify-center items-center  w-full border md:p-5 p-3">
                <div className="flex flex-col gap-5">
                <h1 className="md:text-2xl text-xl text-center font-bold">{job.name}</h1>
                <h2 className="md:text-xl text-md"><span className="font-bold">Company Name:</span>{job.companyName}</h2>
                <h2 className="md:text-xl text-md"><span className="font-bold">Location: </span>{job.location}</h2>
                </div>
            </div>  
            )          
           })
        }
        </div>
      </div>
    </>
  );
}
