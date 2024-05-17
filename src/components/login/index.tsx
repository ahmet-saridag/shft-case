"use client";
import { useEffect, useState } from "react";
import { http } from "@/services/http";
import { useGeneralStore } from "@/providers/GeneralStoreProvider";
import { useRouter } from "next/navigation";

type registerParameters = {
  accessToken: string;
  tokenType: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    profileImage: string;
    appliedJobs: [string];
  };
};

export default function LoginComponent({ translateData, params }: any) {
  const router = useRouter();
  const [authStatus, setAuthStatus] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const [errorMessage, setErrorMessage] = useState("Invalid login inputs!!");
  const [error, setError] = useState(false);

  const { setUserData, isSignUp } = useGeneralStore((state) => state);

  const toggleAuthStatus = () => {
    setAuthStatus((prevStatus) => !prevStatus);
    setError(false);
  };

  const handleForm = async (e: any) => {
    e.preventDefault();
    let path = !authStatus ? "register" : "login";
    setIsFetching(true); //
    let userDataSet = await http(path, "POST", {
      email: e.target.email.value,
      password: e.target.password.value,
    });
    if (!userDataSet.accessToken) {
      setIsFetching(false); //
      setError(true);
      setErrorMessage(userDataSet?.response?.data?.message);
    } else {
      setIsFetching(false); //
      setUserData(userDataSet);
      router.push("/" + params.locale + "/jobs/1");
      localStorage.setItem("userData", JSON.stringify(userDataSet));
    }
  };

  useEffect(() => {
    setAuthStatus(isSignUp);
  }, [isSignUp]);

  const handleFormChance = (e: any) => {
    if (e.target.value) {
      setError(false);
    }
  };

  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <img
              className="w-8 h-8 mr-2"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
              alt="logo"
            />
            SHFT
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                {!authStatus
                  ? translateData?.createAccount
                  : translateData?.signTitle}
              </h1>
              <form
                onSubmit={handleForm}
                className="space-y-4 md:space-y-6"
                action="#"
                onChange={handleFormChance}
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {translateData?.email}
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className={
                      error
                        ? "bg-gray-50 border text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 border-red-500"
                        : "bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    }
                    placeholder="name@company.com"
                    required
                    autoComplete="email"
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {translateData?.password}
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    autoComplete="password"
                    className={
                      error
                        ? "border-red-500 bg-gray-50 border text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-2"
                        : "bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    }
                    required
                  />
                </div>
                <span className={error ? "text-red-500" : "hidden"}>
                  {error && errorMessage}
                </span>
                {/* <div>
                      <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                      <input type="confirm-password" name="confirm-password" id="confirm-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                  </div> */}
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="remember"
                        className="text-gray-500 dark:text-gray-300"
                      >
                        {translateData?.rememberMe}
                      </label>
                    </div>
                  </div>
                  {authStatus && (
                    <a
                      href="#"
                      className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      {translateData?.forgotPassword}
                    </a>
                  )}
                </div>
                <button
                  type="submit"
                  className="flex justify-center items-center w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  {isFetching ? (
                    <div role="status">
                      <svg
                        aria-hidden="true"
                        className="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : !authStatus ? (
                    translateData?.createAccount
                  ) : (
                    translateData?.login
                  )}
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  {!authStatus
                    ? translateData?.alreadyAccount
                    : translateData?.accountYet}
                  <a
                    onClick={toggleAuthStatus}
                    className="cursor-pointer font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    {!authStatus
                      ? translateData?.loginHere
                      : translateData?.signUp}
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
