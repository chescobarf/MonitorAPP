import axios from "axios"
export async function totalOrders(ctx: Context, next: () => Promise<any>) {

//Status es sacado desde el mismo context y saca el parametro enviado "status" por la URL
const  status = ctx.vtex.route.params.status
const key = ctx.vtex.adminUserAuthToken
// const key="eyJhbGciOiJFUzI1NiIsImtpZCI6IkE3MDZFRDdEMjBDQ0RCMDk0M0ZFMzc0OUVDQTUwQkY1NENDNzFCMTgiLCJ0eXAiOiJqd3QifQ.eyJzdWIiOiJjaHJpc3RpYW4uZXNjb2JhckB2dGV4LmNvbS5iciIsImFjY291bnQiOiJjaHJpc3RpYW5lc2NvYmFyIiwiYXVkaWVuY2UiOiJhZG1pbiIsInNlc3MiOiI1M2RlZjIxNy0yNDFhLTRiN2MtODgzNS04MmQ2YTg4NGI2ZGEiLCJleHAiOjE2MjM0MTg1NDMsInVzZXJJZCI6IjdkMjFjNDg3LWZmMDEtNDE5MS04MGVlLTFjZjY2MDhmMzViNyIsImlhdCI6MTYyMzMzMjE0MywiaXNzIjoidG9rZW4tZW1pdHRlciIsImp0aSI6IjQ0OGI0YWU5LWUwNjktNDY5OC05NmJhLTRhNmI2ZjA3YjkxNiJ9.7m0Tv6e56jK8x6gjKsFFZypBnd0pCmVEhIs7TRh9MXrFtA7tYYRq4VDwH7mMw-W3jd-rNW-KSS8Afq54DHVF_g"

const http=axios.create({
  headers:{
    VtexIdclientAutCookie: key,
    "REST-Range": `resources=0-1`,
    "Cache-Control": "no-cache",
    "X-Vtex-Use-Https": true
  }
})
const {data} = await http.get(
  `http://${ctx.vtex.account}.myvtex.com/api/oms/pvt/orders?f_status=${status}`
)
const totalOrder=data.paging.total
const response=
{
  total:totalOrder
}

ctx.status=200
ctx.body=response
ctx.set('Cache-Control','no-cache')

await next()
}
