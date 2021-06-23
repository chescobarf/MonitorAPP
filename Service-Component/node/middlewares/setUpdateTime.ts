import { axiosCreateHttp } from "../utils" 
export async function setUpdateTime(ctx: Context, next: () => Promise<any>) {

 const  time = ctx.vtex.route.params.time
const http=axiosCreateHttp(ctx)

// Desde masterdata sacamos primero el ID de nuestro registro, con el acronimo que creamos el dataentity (ORDERMONITOR = OM)
const searchID = await http.get(
  `http://${ctx.vtex.account}.myvtex.com/api/dataentities/OM/search`
)
const idEntity=searchID.data[0].id;

//Hacemos el Patch a MD para actualizar los el numero de notificaciones para el status
const {data} = await http.patch(
  `http://${ctx.vtex.account}.myvtex.com/api/dataentities/OM/documents/${idEntity}`,{"updatetime":time}
)
console.log(data);
const response={
"updatetime":time
}
ctx.status=200
ctx.body=response
ctx.set('Cache-Control','no-cache')

await next()
}
