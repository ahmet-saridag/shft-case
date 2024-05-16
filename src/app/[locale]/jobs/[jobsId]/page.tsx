"use client"
import Filters from '@/components/filters'
import React, { useEffect } from 'react';
import JobCard from "@/components/job-card"
import Profile from "@/components/profile"
import Pagination from "@/components/pagination"
import {http} from '@/services/http'
import { useQuery } from '@tanstack/react-query';
import { useGeneralStore } from '@/providers/GeneralStoreProvider'
import { useRouter } from 'next/navigation'
import LoadingComponent from "@/components/loading"


export default function Jobs({ params }: any) {
  const {data , isLoading, isError, isFetching, error} = useQuery<any>({
    queryKey: ['jobs'],
    queryFn: async () => {
        // @ts-ignore
      let profileData: any = JSON.parse(localStorage.getItem("userData"));
      if(profileData.accessToken){
          const response = await http("jobs", "GET" , {
            headers: {
              application:"application/json",
              Authorization: profileData.tokenType + " " + profileData.accessToken
            }
          })
          return response
      }
    }
  })

  if (isFetching && isFetching) {
    return (
      <div className="home">
        <LoadingComponent />
      </div>
    );
  }

  if (data?.code && data?.code === "ERR_BAD_REQUEST") {
    return (
      <div className="home">
        <h1 className="text-red-500 text-center h-full mt-10">
          Jobs not found please logout and try again.!!
        </h1>
      </div>
    );
  }

  return (
        <div className='grid grid-cols-12 px-6 py-8 mx-auto lg:py-0 w-full'>
      <div className='order-last md:order-first col-span-12 md:col-span-8 h-dvh overflow-y-scroll '> 
      <Filters />
      <JobCard jobsData={data} />
      <div className='w-full h-56 flex justify-center items-center'>
        <Pagination params={params} jobsData={data} />
      </div>
      </div>
      {/* <div>My Post: {params}</div> */}
      <div className='col-span-12 md:col-span-4'>
        <Profile jobsData={data}/>
      </div>
    </div>
  )
}





