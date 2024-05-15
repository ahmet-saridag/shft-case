import axios from 'axios'

import environment from '@/environments/environment'

export async function http(api: string , type:string , data:any = null) {
  let response: any = [];

  switch (type) {
    case "POST":
      response = await axios.post(environment.baseUrl + api , data).then(res =>  res.data).catch(err => err); 
      break;
    case "GET":
      response = await axios.get(environment.baseUrl + api , data).then(res =>  res.data).catch(err => err); 
      break;
    default:
      break;
  }
  
    return response;
  }