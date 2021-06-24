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
import {getCacheContext, setCacheContext} from './utils'

// const TIMEOUT_MS = 10000

// Create a LRU memory cache for the Status client.
// The @vtex/api HttpClient respects Cache-Control headers and uses the provided cache.
const memoryCache = new LRUCache<string, any>({ max: 5000 })

metrics.trackCache('status', memoryCache)

// This is the configuration for clients available in `ctx.clients`.
// const clients: ClientsConfig<Clients> = {
//   // We pass our custom implementation of the clients bag, containing the Status client.
//   implementation: Clients,
//   options: {
//     events:{
//       exponentialTimeoutCoefficient: 2,
//         exponentialBackoffCoefficient: 2,
//         initialBackoffDelay: 50,
//         retries: 1,
//         timeout: 3000,
//         concurrency: 10,
//     },
//     // All IO Clients will be initialized with these options, unless otherwise specified.
//     default: {
//       retries: 2,
//       timeout: TIMEOUT_MS,
//     },
//     // This key will be merged with the default options and add this cache to our Status client.
//     status: {
//       memoryCache,
//     },
//   },
// }

declare global {
  // We declare a global Context type just to avoid re-writing ServiceContext<Clients, State> in every handler and resolver
  type Context = ServiceContext<Clients, State>

  // The shape of our State object found in `ctx.state`. This is used as state bag to communicate between middlewares.
  interface State extends RecorderState {
    code: number
  }
}


//HERE CODE NEW

function update(){
  setInterval(function(){
    const context = getCacheContext()
    if (!context) {
      console.log('no context in memory')
      return
    }
    updateMonitors(context)
    return createSendEvent(context)
  },5000)
}

update()

//TO HERE

// Export a service that defines route handlers and client options.
export default new Service({
  clients: {
    options: {
      events: {
        exponentialTimeoutCoefficient: 2,
        exponentialBackoffCoefficient: 2,
        initialBackoffDelay: 50,
        retries: 1,
        timeout: 3000,
        concurrency: 10,
      },
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
