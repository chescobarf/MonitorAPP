import { EVENT_EXAMPLE } from '../constants'

export async function createSendEvent(ctx: Context){
  await ctx.clients.events.sendEvent('', EVENT_EXAMPLE)
  return ctx
}