import { json } from 'co-body'

interface sendEmail {
  email: string
  template: string
  additionalFields: any
}

export async function sendEmail(ctx: Context, next: () => Promise<any>) {
  const {
    clients: { message: message },
  } = ctx

  const body:sendEmail = await json(ctx.req)

  await message.sendMail(
    {
      email: body.email,
      additionalFields: body.additionalFields,
    },
    body.template
  )

  ctx.status = 200
  ctx.body = 'ok'
  ctx.set('Cache-Control','no-cache')

  await next()
}