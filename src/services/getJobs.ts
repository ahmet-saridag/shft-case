import { http } from "@/services/http";

export default async function getJobs() {
  // @ts-ignore
  let profileData: any = JSON.parse(localStorage.getItem("userData"));
  if (profileData.accessToken) {
    const response = await http("jobs", "GET", {
      headers: {
        application: "application/json",
        Authorization: profileData.tokenType + " " + profileData.accessToken,
      },
    });
    return response;
  }
}
