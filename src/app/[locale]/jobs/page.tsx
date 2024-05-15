"use client"
import Filters from '@/components/filters'
import React from 'react';
import JobCard from "@/components/job-card"
import Profile from "@/components/profile"
import Pagination from "@/components/pagination"
import {http} from '@/services/http'
import { useQuery } from '@tanstack/react-query';
import { useGeneralStore } from '@/providers/GeneralStoreProvider'
import { useRouter } from 'next/navigation'

export default function Jobs() {
  // const router = useRouter();

  // const { userData, setUserData } = useGeneralStore(
  //   (state) => state,
  // )
  // if(!localStorage.getItem('userData')){
  //    router.push("/en/login")
  // }

  // if(){

  // }


  // let config = {
  //   page:1,
  //   perPage: 10,
  //   orderBy:"",
  //   search:"",
  // }
  // const {data , isLoading, isError, isSuccess} = useQuery<any>({
  //   queryKey: ['jobs'],
  //   queryFn: async () => {
  //         const response = await http('api/jobs' , 'GET' , 1)
  //         return response
  //   }
  // })

  // console.log(data);


  return (
    <div className='grid grid-cols-12 px-6 py-8 mx-auto lg:py-0 w-full'>
      <div className='order-last md:order-first col-span-12 md:col-span-8 h-dvh overflow-y-scroll '> 
      <Filters />
      <JobCard />
      <div className='w-full h-56 flex justify-center items-center'>
        <Pagination />
      </div>
      </div>
      <div className='col-span-12 md:col-span-4'>
        <Profile/>
      </div>
    </div>
  )
}





