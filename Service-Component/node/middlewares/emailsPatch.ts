import { axiosCreateHttp } from "../utils"
import { json } from 'co-body'
export async function emailsPatch(ctx: Context, next: () => Promise<any>) {

  //Status es sacado desde el mismo context y saca el parametro enviado "status" por la URL
  const status = ctx.vtex.route.params.status
  //Status es sacado desde el mismo context y saca el parametro enviado "number" por la URL
  const http = axiosCreateHttp(ctx)

  const emails = await json(ctx.req)
  var arrayEmails: any = Object.values(emails)
  arrayEmails = arrayEmails.reduce((acc: any, val: any) => acc.concat(val), [])
  arrayEmails = arrayEmails.toString();

  // Desde masterdata sacamos primero el ID de nuestro registro, con el acronimo que creamos el dataentity (ORDERMONITOR = OM)
  const searchID = await http.get(
    `http://${ctx.vtex.account}.myvtex.com/api/dataentities/OM/search`
  )
  const idEntity = searchID.data[0].id;
  const estado = status.toString().replace(/-/g, "");
  const emailsEstado = "emails".concat(estado)
  //Hacemos el Patch a MD para actualizar los el numero de notificaciones para el status
  await http.patch(
    `http://${ctx.vtex.account}.myvtex.com/api/dataentities/OM/documents/${idEntity}`, { [emailsEstado]: arrayEmails }
  )

  const response = {
    [emailsEstado]: arrayEmails
  }
  ctx.status = 200
  ctx.body = response
  ctx.set('Cache-Control', 'no-cache')

  await next()
}
