import {regexEmails,axiosCreateHttp} from "../utils/index"
export async function emails(ctx: Context, next: () => Promise<any>) {

//Status es sacado desde el mismo context y saca el parametro enviado "status" por la URL
const  status = ctx.vtex.route.params.status
// Create headers with axios with the axiosCreateHttp function
const http=axiosCreateHttp(ctx)

// Desde masterdata sacamos primero el ID de nuestro registro, con el acronimo que creamos el dataentity (ORDERMONITOR = OM)
const searchID = await http.get(
  `http://${ctx.vtex.account}.myvtex.com/api/dataentities/OM/search`
)
const idEntity=searchID.data[0].id;
const estado = status.toString().replace(/-/g, "");
//Hacemos la consulta a MD que nos entregue el numero de notificaciones seteado para este status
const {data} = await http.get(
  `http://${ctx.vtex.account}.myvtex.com/api/dataentities/OM/documents/${idEntity}/?_fields=emails${estado}`
)
const response=regexEmails(data)
ctx.status=200
ctx.body=response
ctx.set('Cache-Control','no-cache')

await next()
}
