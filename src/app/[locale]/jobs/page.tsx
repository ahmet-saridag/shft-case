import Filters from '@/components/filters'
import React from 'react';
import JobCard from "@/components/job-card"
import Profile from "@/components/profile"
import Pagination from "@/components/pagination"


export default function Jobs() {
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
