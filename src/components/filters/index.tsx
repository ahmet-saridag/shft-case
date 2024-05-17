"use client";
import React, { useState } from "react";
import { useSearchParams,useRouter } from "next/navigation";

export default function Filters({ translateData, params }: any) {
  const [selectFilter, setSelectFilter] = useState(10); // Declare a state variable...
  const router = useRouter();
  const searchParams = useSearchParams();

  const perPage:any = searchParams.get("perPage");
  let pageNumber: any = searchParams.get("page");
  const query: any = searchParams.get("search[query]");


  const options = [
    { value: 10, label: "10" },
    { value: 20, label: "20" },
    { value: 30, label: "30" },
    { value: 40, label: "40" },
    { value: 50, label: "50" },
  ]

  const hanldeSelectFilter = (value:any) => {
    setSelectFilter(value);
    if (perPage) {
      window.location.href = window.location.origin + "/" + params.locale + ("/jobs?page=" +
      pageNumber +
      "&perPage=" +
      value +
      "&search%5Bfield%5D=name&search%5Bquery%5D=" +
      query)
    }
  }


  const handleSearchInput = (value:any) => {
     if (perPage) {
      setSelectFilter(value);
    }
  }


  const submitSearch = () => {
    if (perPage) {
      window.location.href = window.location.origin + "/" + params.locale + ("/jobs?page=" +
      pageNumber +
      "&perPage=" +
      perPage +
      "&search%5Bfield%5D=name&search%5Bquery%5D=" +
      selectFilter)
      }
  }






  return (
    <div className="w-full h-20 flex items-center justify-center">
      <div>{translateData?.title ? translateData?.title : "Basic Filter"}</div>
      <div>
      <select
              id="small"
              value={Number(perPage)} // ...force the select's value to match the state variable...
             onChange={e => hanldeSelectFilter(e.target.value)} 
              className="text-sm ml-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
            </select>
      </div>

      <div className="w-80 ml-5">
        <div className="max-w-md mx-auto">
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            {translateData?.search ? translateData?.search : "Search"}
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              onChange={(e) => handleSearchInput(e.target.value)}
              type="search"
              id="default-search"
              defaultValue={query}
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder={
                translateData?.search ? translateData?.search : "Job Name Search  "
              }
              required
            />
            <button
              onClick={() => submitSearch()}
              type="button"
              className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {translateData?.search ? translateData?.search : "Search"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
