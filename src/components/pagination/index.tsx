"use client"

function PaginationComponent({jobsData , params}: any) {
  
  const totalPages = Math.ceil(jobsData?.data?.length / 10);

  const goToPrevPage = () => {
      window.location.pathname = params?.locale + "/jobs/" + (params?.jobsId - 1);
  };

  const goToNextPage = () => {
    window.location.pathname = params?.locale + "/jobs/" + (Number(params?.jobsId) + 1);
  };

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
 
            {params?.jobsId} /  {jobsData?.data?.length}
            </div>
            <li
              onClick={goToNextPage}
              className={
                params?.jobsId ? (Number(params?.jobsId) === 7 ? "cursor-not-allowed" : "cursor-pointer") : ""
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
            <select id="small" className="text-sm ml-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
    <option defaultValue={10}>10</option>
    <option value="US">20</option>
    <option value="US">30</option>
    <option value="US">40</option>
    <option value="US">50</option>
  </select>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default PaginationComponent;