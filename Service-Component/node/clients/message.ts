import { JanusClient, InstanceOptions, IOContext } from '@vtex/api'
import { pipe } from 'ramda'

interface EmailParameters {
  email: string
  additionalFields: any
}

const withCookieAsHeader = (context: IOContext) => (
  options: InstanceOptions
): InstanceOptions => ({
  ...options,
  headers: {
    VtexIdclientAutCookie: context.authToken,
    ...(options?.headers ?? {}),
  },
})

export default class Message extends JanusClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(context, options && pipe(withCookieAsHeader(context))(options))
  }

  public async sendMail(
    emailData: EmailParameters,
    emailTemplate: string
  ): Promise<string> {
    const data = {
      templateName: emailTemplate,
      jsonData: {
        ...emailData,
      },
    }

    return this.http.post(`/api/mail-service/pvt/sendmail`, data)
  }
}