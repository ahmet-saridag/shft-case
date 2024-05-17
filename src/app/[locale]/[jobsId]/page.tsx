import Filters from "@/components/filters";
import React, { useEffect } from "react";
import JobCard from "@/components/job-card";
import Profile from "@/components/profile";
import Pagination from "@/components/pagination";
import getJobs from "@/services/getJobs";
import { getTranslations } from "next-intl/server";

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function Jobs({ params }: any) {
  const t = await getTranslations("Page");
  const queryClient = new QueryClient();

  const filtersData = {
    title: t("Filters.title"),
    search: t("Filters.search"),
  };

  const profileData = {
    appliedJobs: t("Profile.appliedJobs"),
    date: t("Profile.date"),
    companyName: t("Profile.companyName"),
    location: t("Profile.location"),
  };

  const jobCardData = {
    location: t("JobCard.location"),
    currency: t("JobCard.currency"),
    detail: t("JobCard.detail"),
    withdraw: t("JobCard.withdraw"),
    applyJob: t("JobCard.applyJob"),
    companyName: t("JobCard.companyName"),
    jobName: t("JobCard.jobName"),
    createdAt: t("JobCard.createdAt"),
    keyword: t("JobCard.keyword"),
    salary: t("JobCard.salary"),
    productDescription: t("JobCard.productDescription"),
    close: t("JobCard.close"),
    apply: t("JobCard.apply"),
  };

  await queryClient.prefetchQuery({
    queryKey: ["jobs"],
    queryFn: getJobs,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="grid grid-cols-12 px-6 py-8 mx-auto lg:py-0 w-full">
        <div className="order-last md:order-first col-span-12 md:col-span-8 ">
          <Filters params={params} translateData={filtersData} />
          <div className="h-dvh overflow-y-scroll">
            <JobCard translateData={jobCardData} />
          </div>
          <div className="w-full h-56 flex justify-center items-center">
            <Pagination params={params} />
          </div>
        </div>
        <div className="col-span-12 md:col-span-4">
          <Profile translateData={profileData} />
        </div>
      </div>
    </HydrationBoundary>
  );
}
