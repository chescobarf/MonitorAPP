import axios from "axios";
// Regex para usar en emails, reestructurando la respuesta que nos da la data (keys) y devolviendo los datos como un array.
export const regexEmails: any = (data: any, estado: string) => {
  if (data[`${estado}`]) {
    const res = JSON.stringify(data)
    // Aqui llega el dato como un objeto
    var regex = /["]+/;
    var array = res.split(regex)
    // Aqui separamos todos las comillas, y obtenemos un arreglo de strings
    var regex = /[,]+/; // regex es reasignado, para reutilizar variable
    var emails = array[3].split(regex)
    // Aqui obligamos a trabajar con el dato [3] del arreglo para quitarle las comas y eventualmente conseguir solamente el arreglo con los emails que necesitamos
    return emails
  } else {
    return []
  }
}
// Create Headers with Axios
export const axiosCreateHttp: any = (ctx: Context) => {
  const key = ctx.vtex.adminUserAuthToken
  return axios.create({
    headers: {
      VtexIdclientAutCookie: key,
      "REST-Range": `resources=0-1`,
      "Cache-Control": "no-cache",
      "X-Vtex-Use-Https": true
    }
  })
}
export const axiosCreateHttpCookie: any = (ctx: Context) => {
  const key = ctx.vtex.adminUserAuthToken
  return axios.create({
    headers: {
      "Cookie": "VtexIdclientAutCookie=" + key,
      "REST-Range": `resources=0-1`,
      "Cache-Control": "no-cache",
      "X-Vtex-Use-Https": true,
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  })
}

let context: any = null

export const getCacheContext = () => {
  return context
}

export function setCacheContext(ctx: any) {
  context = ctx
}

export function JsonToNumber(json: JSON) {
  var key = Object.values(json)
  return key
}

export async function getUpdateTime(ctx: any) {
  const http = axiosCreateHttpCookie(ctx)
  var updateTime = await http.get(
    `http://${ctx.vtex.workspace}--${ctx.vtex.account}.myvtex.com/_v/order_monitor/updateTime`
  )
  updateTime = updateTime?.data
  var updateTimeNumber: any = Object.values(updateTime)
  updateTimeNumber = updateTimeNumber[0]
  return updateTimeNumber * 60000
}
