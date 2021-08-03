import type { ServiceContext, RecorderState } from '@vtex/api'
import { LRUCache, method, Service } from '@vtex/api'
import { Clients } from './clients'
import { orders } from './middlewares/orders'
import { totalOrders } from './middlewares/totalOrders'
import { notifications } from './middlewares/notifications'
import { notificationPatch } from './middlewares/notificationPatch'
import { emails } from './middlewares/emails'
import { emailsPatch } from './middlewares/emailsPatch'
import { sendEmail } from './middlewares/sendEmail'
import { updateTime } from './middlewares/updateTime'
import { setUpdateTime } from './middlewares/setUpdateTime'
import { updateMonitors } from './events/updateMonitors'
import { createSendEvent } from './routes/notify'
import {getCacheContext, setCacheContext, getUpdateTime} from './utils'

// Create a LRU memory cache for the Status client.
// The @vtex/api HttpClient respects Cache-Control headers and uses the provided cache.
const memoryCache = new LRUCache<string, any>({ max: 5000 })

metrics.trackCache('status', memoryCache)
declare global {
  // We declare a global Context type just to avoid re-writing ServiceContext<Clients, State> in every handler and resolver
  type Context = ServiceContext<Clients, State>

  // The shape of our State object found in `ctx.state`. This is used as state bag to communicate between middlewares.
  interface State extends RecorderState {
    code: number
  }
}

function getCache(){
  var intervalGetCache = setInterval(function(){
    const context = getCacheContext()
    if(!context){
      return console.log("*** NO CONTEXT ***");
    }
      clearInterval(intervalGetCache)
      update(context)
      return
  },60000)
}

async function update(context:any){
  const tiempo = await getUpdateTime(context)
  console.log(tiempo);
  setInterval(function(){
    updateMonitors(context)
    return createSendEvent(context)
  },tiempo ?? 60000)
}

getCache()


// Export a service that defines route handlers and client options.
export default new Service({
  clients: {
    implementation: Clients,
    options: {
      events: {
        exponentialTimeoutCoefficient: 2,
        exponentialBackoffCoefficient: 2,
        initialBackoffDelay: 50,
        retries: 1,
        timeout: 3000,
        concurrency: 10,
      },
      default: {
        retries: 2,
        timeout: 10000,
      },
      status:{
        memoryCache
      }
    },
  },
  events:{
    updateMonitors,
  },
  routes: {
    // Rutas creadas primer nombre es como fue creado en service.json
    //seguido de :method y dentro del verbo HTTP, con su respectivo middleware a usar una vez llamada la ruta
    ordersByStatus:method({
      GET:[orders]
    }),
    totalOrdersByStatus:method({
      GET:[totalOrders]
    }),
    notificationByStatus:method({
      GET:[notifications]
    }),
    setNotification:method({
      PATCH:[notificationPatch]
    }),
    emailsByStatus:method({
      GET:[emails]
    }),
    setEmails:method({
      PATCH:[emailsPatch]
    }),
    sendEmail:method({
      POST: [sendEmail]
    }),
    updateTime:method({
      GET: [updateTime]
    }),
    setUpdateTime:method({
      PATCH:[setUpdateTime]
    }),
    start:(ctx:any)=>{
      setCacheContext(ctx)
      ctx.set('Cache-Control','no-cache')
      ctx.status = 200
      ctx.body='ok'
    }
  },
})
