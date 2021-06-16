import axios from "axios"
export async function totalOrders(ctx: Context, next: () => Promise<any>) {

//Status es sacado desde el mismo context y saca el parametro enviado "status" por la URL
const  status = ctx.vtex.route.params.status
const key = ctx.vtex.adminUserAuthToken

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
