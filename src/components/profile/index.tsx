import React from "react";

export default function Profile() {
  return (
    <>
      <div className="flex flex-col items-center gap-5 p-5">
        <img
          className="w-50 h-50 rounded-full"
          src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
          alt=""
        />
        <div className="flex flex-col md:gap-10 gap-4 md:h-dvh overflow-y-auto  w-full md:pb-36">
        <div className="font-medium flex flex-col items-center dark:text-white">
          <div>hr@shft.co</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Joined in August 2014
          </div>

          <h1 className="mt-5">Applied Jobs</h1>
        </div>
        <div className="flex flex-col justify-center items-center  w-full border md:p-5 p-3">
            <div className="flex flex-col gap-5">
            <h1 className="md:text-4xl text-xl text-center font-bold">Job Name</h1>
            <h2 className="md:text-xl text-md"><span className="font-bold">Company Name:</span> Ipsum Dolor</h2>
            <h2 className="md:text-xl text-md"><span className="font-bold">Location: </span> Irving</h2>
            </div>
        </div>
        </div>

      </div>
    </>
  );
}
