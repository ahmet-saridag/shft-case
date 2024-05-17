"use client";
import { useSearchParams,useRouter } from "next/navigation";
import { useState } from "react";

function PaginationComponent({ params }: any) {
  const [selectFilter, setSelectFilter] = useState(10); // Declare a state variable...

  const router = useRouter();
  const searchParams = useSearchParams();
  const perPage:any = searchParams.get("perPage");
  let pageNumber: any = searchParams.get("page");
  const query = searchParams.get("search[query]");

  const options = [
    { value: 10, label: "10" },
    { value: 20, label: "20" },
    { value: 30, label: "30" },
    { value: 40, label: "40" },
    { value: 50, label: "50" },
  ]

  const goToPrevPage = () => {
    if (pageNumber && Number(pageNumber) !== 1) {
      let path = Number(pageNumber) - 1;
      window.location.href = window.location.origin + "/" + params.locale + (        "/jobs?page=" +
      path +
      "&perPage=" +
      perPage +
      "&search%5Bfield%5D=name&search%5Bquery%5D=" +
      query)
     }
  };

  const goToNextPage = () => {
    if (pageNumber && Number(pageNumber) !== 7) {
      let path = Number(pageNumber) + 1;
      window.location.href = window.location.origin + "/" + params.locale + ("/jobs?page=" +
      path +
      "&perPage=" +
      perPage +
      "&search%5Bfield%5D=name&search%5Bquery%5D=" +
      query)
    }
  };


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

  return (
    <>
      <div className="pagination">
        <nav>
          <ul className="flex items-center justify-between w-full h-20 text-sm">
            <button
              onClick={goToPrevPage}
              // @ts-ignore
              disabled={
                params?.jobsId
                  ? Number(params?.jobsId) === 1
                    ? "cursor-not-allowed"
                    : ""
                  : "cursor-not-allowed"
              }
              className={
                params?.jobsId
                  ? Number(params?.jobsId) === 1
                    ? "cursor-not-allowed"
                    : ""
                  : "cursor-not-allowed"
              }
            >
              <a className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 border border-e-0 border-gray-300 rounded-s-lg hover:bg-white hover:text-blue-500  ">
                <span className="sr-only">Previous</span>
                <svg
                  className="w-2.5 h-2.5 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 1 1 5l4 4"
                  />
                </svg>
              </a>
            </button>
            <div className="mx-5">
              {pageNumber} / {perPage}
            </div>
            <li
              onClick={goToNextPage}
              className={
                params?.jobsId
                  ? Number(params?.jobsId) === 7
                    ? "cursor-not-allowed"
                    : "cursor-pointer"
                  : ""
              }
            >
              <a className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 border border-gray-300 rounded-e-lg hover:bg-white hover:text-blue-500">
                <span className="sr-only">Next</span>
                <svg
                  className="w-2.5 h-2.5 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
              </a>
            </li>
            <select
              id="small"
              value={Number(perPage)} // ...force the select's value to match the state variable...
             onChange={e => hanldeSelectFilter(e.target.value)} 
             defaultValue={Number(perPage)}
             className="text-sm ml-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
            </select>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default PaginationComponent;
