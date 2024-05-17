"use client";
import { useEffect, useState } from "react";
import { useGeneralStore } from "@/providers/GeneralStoreProvider";
import { useQuery } from "@tanstack/react-query";
import LoadingComponent from "@/components/loading";
import { useSearchParams,useRouter } from "next/navigation";
import { http } from "@/services/http";


export default function JobCard({ translateData }: any) {
  
  const [profileData, setProfileData]: any = useState([]);
  const [isModalOpen, setIsModalOpen]: any = useState();
  const [modalData, setModalData]: any = useState({});
  const { userData, setUserData, setIsSignUp } = useGeneralStore(
    (state) => state
  );
  const searchParams = useSearchParams();
  const perPage = searchParams.get("perPage");
  let pageNumber: any = searchParams.get("page");
  const query = searchParams.get("search[query]");

  useEffect(() => {
    // @ts-ignore
    const userData: any = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
      setProfileData(userData);
      console.log(query)
    }
  }, []);

  const { data, isLoading, isError, isFetching, error } = useQuery<any>({
    queryKey: ["jobs"],
    queryFn: async () => {
      // @ts-ignore
      let profileData: any = JSON.parse(localStorage.getItem("userData"));
      if (profileData.accessToken) {
        const response = await http(        "jobs?page=" +
        pageNumber +
        "&perPage=" +
        perPage +
        "&search%5Bfield%5D=name&search%5Bquery%5D=" +
        (query ? query : "a"), "GET", {
          headers: {
            application: "application/json",
            Authorization: profileData.tokenType + " " + profileData.accessToken,
          },
        });
        return response;
      }
    },
  });

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

  const openDetail = (id: string) => {
    let findCorrectModalData = data?.data.find((s: any) => s.id === id);
    setModalData(findCorrectModalData);
    setIsModalOpen((prev: boolean) => !prev);
  };

  const withDraw = async (id: string) => {
    // if(profileData.accessToken){
    //     const response = await http("jobs/" + id + "/withdraw"    , "POST" , {
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: profileData.tokenType + " " + String(profileData.accessToken)
    //       }
    //     })
    //   console.log(response);
    // }
  };

  const applyToSelectedJob = async (id: string) => {
    // @ts-ignore
    // const userData = JSON.parse(localStorage.getItem("userData"));
    // console.log(userData);
    // console.log(id);
    // console.log(userData.accessToken);
    // if(userData.accessToken){
    //     const response = await http("jobs/" + id + "/apply"    , "POST" , {
    //       headers: {
    //         application: "application/json",
    //         Authorization: userData.tokenType + " " + userData.accessToken
    //       }
    //     })
    //     console.log(response);
    // }
  };

  if (data?.data?.length > 0) {
    return (
      <>
        {data.data.map((job: any) => {
          return (
            <div key={job.id} className="flex flex-col gap-5 mt-5">
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
                      {job.companyName} - {job.name}
                    </h5>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                      {job.description}
                    </p>
                    <div>
                      {translateData?.location} {job.location}
                    </div>
                    <div>
                      {translateData?.salary} {job.salary}
                      {translateData?.currency}
                    </div>

                    <div className="flex gap-3 mt-3">
                      {job.keywords.map((key: any, idx: number) => {
                        return (
                          <button
                            key={idx}
                            type="button"
                            className="px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          >
                            {key}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-4 md:col-span-2 col-span-12 ">
                  <button
                    className="w-full px-3 py-2 text-lg font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                    onClick={() => openDetail(job.id)}
                    type="button"
                  >
                    {translateData?.detail}
                  </button>
                  {profileData?.user?.appliedJobs?.includes(job.id) && (
                    <button
                      type="button"
                      onClick={() => withDraw(job.id)}
                      className="w-full px-3 py-2 text-lg font-medium text-center text-blue-500 bg-white border border-blue-500 hover:bg-blue-700 hover:text-white rounded-lg  focus:ring-4 focus:outline-none focus:ring-blue-300"
                    >
                      {translateData?.withdraw}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        {isModalOpen && (
          <div className=" overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 max-h-full">
            <div className="relative p-4 w-full max-w-2xl max-h-full">
              <div className="shadow-2xl relative bg-white rounded-lg dark:bg-gray-700">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-4xl w-full text-center  font-semibold text-gray-900 dark:text-white">
                    {translateData?.apply}
                  </h3>
                  <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => setIsModalOpen((prev: any) => !prev)}
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                <div className="p-4 md:p-5 space-y-4">
                  <div className="flex flex-col gap-2">
                    <h2 className="md:text-xl text-md">
                      <span className="font-bold">
                        {translateData?.companyName}
                      </span>{" "}
                      {modalData.companyName}
                    </h2>
                    <h2 className="md:text-xl text-md">
                      <span className="font-bold">
                        {translateData?.jobName}{" "}
                      </span>{" "}
                      {modalData.name}
                    </h2>
                    <h2 className="md:text-xl text-md">
                      <span className="font-bold">
                        {translateData?.createdAt}{" "}
                      </span>{" "}
                      {modalData.createdAt}
                    </h2>
                    <h2 className="md:text-xl text-md">
                      <span className="font-bold">
                        {translateData?.location}{" "}
                      </span>{" "}
                      {modalData.location}
                    </h2>
                  </div>
                  <h2 className="md:text-xl text-md">
                    <span className="font-bold">{translateData?.keyword}:</span>
                  </h2>
                  <div className="flex gap-3">
                    {modalData.keywords.map((key: any, idx: number) => {
                      return (
                        <button
                          key={idx}
                          type="button"
                          className="px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                          {key}
                        </button>
                      );
                    })}
                  </div>
                  <h2 className="md:text-xl text-md">
                    <span className="font-bold">{translateData?.salary}: </span>{" "}
                    {modalData.salary}
                    {translateData?.currency}
                  </h2>
                  <div className="w-full">
                    <h2 className="md:text-xl text-md mb-3">
                      <label htmlFor="description" className="font-bold">
                        {translateData?.productDescription}
                      </label>
                    </h2>
                    <p>{modalData.description}</p>
                  </div>
                </div>
                <div className="flex justify-center items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                  <button
                    onClick={() => setIsModalOpen((prev: any) => !prev)}
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    {translateData?.close}
                  </button>
                  <button
                    onClick={() => applyToSelectedJob(modalData.id)}
                    data-modal-hide="default-modal"
                    type="button"
                    className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  >
                    {translateData?.apply}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
  else {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold text-center text-red-500 dark:text-white">
          No jobs avaliable!! (Please check your filters...)
        </h1>
      </div>
    )
  }
}
