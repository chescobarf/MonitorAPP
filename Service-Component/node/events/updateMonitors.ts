// import { JsonToNumber } from '../utils'
 import axios from "axios";
 import {STATUS} from "../utils/status";
import { emailValidation } from "../utils/emailValidation";
export async function updateMonitors(context?:any) {
  const ctx = context
  const account = ctx.vtex.account
  const workspace = ctx.vtex.workspace
  const axiosCreateHttp:any = (ctx:Context) =>{
    return axios.create({
        headers:{
          Cookie: "VtexIdclientAutCookie"+"="+ctx.vtex.authToken,
          "Content-Type":"application/json",
          "REST-Range": `resources=0-1`,
          "Cache-Control": "no-cache",
          "X-Vtex-Use-Https": true
        }
      })
  }
  const http=axiosCreateHttp(ctx)  

  STATUS.forEach(status => {
    emailValidation(http,workspace,account,status)
  });
  return true
}
