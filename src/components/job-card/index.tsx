import Filters from "@/components/filters";
import React from "react";

export default function JobCard() {
  return (
    <>
      <div className="flex flex-col gap-5 mt-5">
        <div className="grid grid-cols-12  w-full p-5 bg-white border border-gray-200 rounded-lg shadow md:flex-row">
          <div className="col-span-12 md:col-span-2">
            <img
              className="object-cover w-full h-32 md:h-full rounded-t-lg"
              src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              alt=""
            />
          </div>
          <div className="col-span-12 md:col-span-8">
            <div className="flex flex-col justify-between p-4 leading-normal">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Company Name - Job Name
              </h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Cupiditate sed possimus asperiores neque optio quas. Aliquam
                reiciendis autem quo totam.
              </p>
              <div>Location: Irving</div>
              <div>Salary: 2000$</div>
              <div className="flex gap-3 mt-3">
                <button
                  type="button"
                  className="px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Small
                </button>
                <button
                  type="button"
                  className="px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Small
                </button>
                <button
                  type="button"
                  className="px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Small
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 md:col-span-2 col-span-12 ">
            <button
              type="button"
              className="w-full px-3 py-2 text-lg font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
            >
              Detail
            </button>
            <button
              type="button"
              className="w-full px-3 py-2 text-lg font-medium text-center text-blue-500 bg-white border border-blue-500 hover:bg-blue-700 hover:text-white rounded-lg  focus:ring-4 focus:outline-none focus:ring-blue-300"
            >
              Withdraw
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
