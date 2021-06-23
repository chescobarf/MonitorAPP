import { axiosCreateHttp } from "../utils";
export async function updateTime(ctx: Context, next: () => Promise<any>) {

const http=axiosCreateHttp(ctx)
// Desde masterdata sacamos primero el ID de nuestro registro, con el acronimo que creamos el dataentity (ORDERMONITOR = OM)
const searchID = await http.get(
  `http://${ctx.vtex.account}.myvtex.com/api/dataentities/OM/search`
)
const idEntity=searchID.data[0].id;
//Hacemos la consulta a MD que nos entregue el numero de notificaciones seteado para este status
const {data} = await http.get(
  `http://${ctx.vtex.account}.myvtex.com/api/dataentities/OM/documents/${idEntity}/?_fields=updatetime`
)
//Tratamiento del response para que su key sea notificaction y nos entregue el dato
const response=data
ctx.status=200
ctx.body=response
ctx.set('Cache-Control','no-cache')

await next()
}
