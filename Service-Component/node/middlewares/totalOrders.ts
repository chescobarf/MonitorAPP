import { axiosCreateHttp } from "../utils"
export async function totalOrders(ctx: Context, next: () => Promise<any>) {

//Status es sacado desde el mismo context y saca el parametro enviado "status" por la URL
const status = ctx.vtex.route.params.status
const http=axiosCreateHttp(ctx)

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
