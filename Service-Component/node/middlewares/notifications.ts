import axios from "axios"
export async function notifications(ctx: Context, next: () => Promise<any>) {

//Status es sacado desde el mismo context y saca el parametro enviado "status" por la URL
 const  status = ctx.vtex.route.params.status
// const key="eyJhbGciOiJFUzI1NiIsImtpZCI6IkE3MDZFRDdEMjBDQ0RCMDk0M0ZFMzc0OUVDQTUwQkY1NENDNzFCMTgiLCJ0eXAiOiJqd3QifQ.eyJzdWIiOiJjaHJpc3RpYW4uZXNjb2JhckB2dGV4LmNvbS5iciIsImFjY291bnQiOiJjaHJpc3RpYW5lc2NvYmFyIiwiYXVkaWVuY2UiOiJhZG1pbiIsInNlc3MiOiI1M2RlZjIxNy0yNDFhLTRiN2MtODgzNS04MmQ2YTg4NGI2ZGEiLCJleHAiOjE2MjM0MTg1NDMsInVzZXJJZCI6IjdkMjFjNDg3LWZmMDEtNDE5MS04MGVlLTFjZjY2MDhmMzViNyIsImlhdCI6MTYyMzMzMjE0MywiaXNzIjoidG9rZW4tZW1pdHRlciIsImp0aSI6IjQ0OGI0YWU5LWUwNjktNDY5OC05NmJhLTRhNmI2ZjA3YjkxNiJ9.7m0Tv6e56jK8x6gjKsFFZypBnd0pCmVEhIs7TRh9MXrFtA7tYYRq4VDwH7mMw-W3jd-rNW-KSS8Afq54DHVF_g"
const key = ctx.vtex.adminUserAuthToken

const http=axios.create({
  headers:{
    VtexIdclientAutCookie: key,
    "REST-Range": `resources=0-1`,
    "Cache-Control": "no-cache",
    "X-Vtex-Use-Https": true
  }
})

// Desde masterdata sacamos primero el ID de nuestro registro, con el acronimo que creamos el dataentity (ORDERMONITOR = OM)
const searchID = await http.get(
  `http://${ctx.vtex.account}.myvtex.com/api/dataentities/OM/search`
)
const idEntity=searchID.data[0].id;
const estado = status.toString().replace("-","");
//Hacemos la consulta a MD que nos entregue el numero de notificaciones seteado para este status
const {data} = await http.get(
  `http://${ctx.vtex.account}.myvtex.com/api/dataentities/OM/documents/${idEntity}/?_fields=${estado}`
)
//Tratamiento para traer solo el valor sin necesidad de conocer el key, dado que sera variable
var dato=Object.values(data)
//Tratamiento del response para que su key sea notificaction y nos entregue el dato
const response={notification:dato[0]}
ctx.status=200
ctx.body=response
ctx.set('Cache-Control','no-cache')

await next()
}
