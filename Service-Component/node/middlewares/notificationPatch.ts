import { axiosCreateHttp } from "../utils" 
export async function notificationPatch(ctx: Context, next: () => Promise<any>) {

//Status es sacado desde el mismo context y saca el parametro enviado "status" por la URL
//Status es sacado desde el mismo context y saca el parametro enviado "number" por la URL
const {status,number}=ctx.vtex.route.params

const http=axiosCreateHttp(ctx)

// Desde masterdata sacamos primero el ID de nuestro registro, con el acronimo que creamos el dataentity (ORDERMONITOR = OM)
const searchID = await http.get(
  `http://${ctx.vtex.account}.myvtex.com/api/dataentities/OM/search`
)
const idEntity=searchID.data[0].id;
const estado = status.toString().replace(/-/g,"");

//Hacemos el Patch a MD para actualizar los el numero de notificaciones para el status
await http.patch(
  `http://${ctx.vtex.account}.myvtex.com/api/dataentities/OM/documents/${idEntity}`,{[estado]:number}
)

const response={
  [estado]:number
}
ctx.status=200
ctx.body=response
ctx.set('Cache-Control','no-cache')

await next()
}
