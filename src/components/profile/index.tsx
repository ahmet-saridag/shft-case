"use client";
import React from "react";
import { useEffect, useState } from "react";
import { useGeneralStore } from "@/providers/GeneralStoreProvider";
import getJobs from "@/services/getJobs";
import { useQuery } from "@tanstack/react-query";

export default function Profile({ translateData }: any) {
  let jobsApplied = [];
  const [profileData, setProfileData]: any = useState([]);
  const [appliedJobs, setAppliedJobs]: any = useState([]);

  const { userData, setUserData, setIsSignUp } = useGeneralStore(
    (state) => state
  );

  useEffect(() => {
    // @ts-ignore
    const userProfile: any = JSON.parse(localStorage.getItem("userData"));
    userProfile && setProfileData(userProfile);
  }, [userData]);

  const { data, isLoading, isError, isFetching, error } = useQuery<any>({
    queryKey: ["jobs"],
    queryFn: getJobs,
  });

  if (data && profileData) {
    let selectedJobs: any = [];
    data?.data?.map((s: any) => {
      if (profileData?.user?.appliedJobs?.includes(s.id)) {
        selectedJobs.push(s);
      }
    });
    if (selectedJobs.length > 0) {
      jobsApplied = selectedJobs;
    }
  }

  return (
    <>
      <div className="flex flex-col items-center gap-5 p-5">
        <img
          className="w-56 h-56 rounded-full"
          src={
            profileData?.user?.profileImage
              ? profileData?.user?.profileImage
              : "https://flowbite.com/docs/images/people/profile-picture-5.jpg"
          }
          alt=""
        />
        <div className="flex flex-col md:gap-10 gap-4 md:h-dvh overflow-y-auto  w-full md:pb-36">
          <div className="font-medium flex flex-col items-center dark:text-white">
            <div>
              {profileData?.user?.email
                ? profileData?.user?.email
                : "hr@shft.co"}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {translateData?.date}
            </div>

            <h1 className="mt-5">
              {profileData?.user?.appliedJobs?.length > 0
                ? translateData?.appliedJobs
                : ""}
            </h1>
          </div>
          {jobsApplied?.length > 0 &&
            jobsApplied?.map((job: any) => {
              return (
                <div
                  key={job.id}
                  className="flex flex-col justify-center items-center  w-full border md:p-5 p-3"
                >
                  <div className="flex flex-col gap-5">
                    <h1 className="md:text-2xl text-xl text-center font-bold">
                      {job.name}
                    </h1>
                    <h2 className="md:text-xl text-md">
                      <span className="font-bold">
                        {translateData?.companyName}
                      </span>
                      {job.companyName}
                    </h2>
                    <h2 className="md:text-xl text-md">
                      <span className="font-bold">
                        {translateData?.location}{" "}
                      </span>
                      {job.location}
                    </h2>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}
