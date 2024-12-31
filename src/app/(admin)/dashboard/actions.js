import {callApi} from "@/app/actions";

export default async function getProfileData() {
  return await callApi({
    url: 'profile',
    isAuth: true,
  })
}