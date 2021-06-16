import axios from "axios"
export async function notificationPatch(ctx: Context, next: () => Promise<any>) {

//Status es sacado desde el mismo context y saca el parametro enviado "status" por la URL
 const  status = ctx.vtex.route.params.status
 //Status es sacado desde el mismo context y saca el parametro enviado "number" por la URL
  const  number = ctx.vtex.route.params.number

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

const bodyJson =`{
  "${estado}": ${number}
}`
//Hacemos el Patch a MD para actualizar los el numero de notificaciones para el status
const data = await http.patch(
  `http://${ctx.vtex.account}.myvtex.com/api/dataentities/OM/documents/${idEntity}`,
  bodyJson
)

const response=data
ctx.status=200
ctx.body=response
ctx.set('Cache-Control','no-cache')

await next()
}
