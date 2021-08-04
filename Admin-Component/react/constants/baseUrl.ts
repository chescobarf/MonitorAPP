import { useRuntime } from 'vtex.render-runtime'

export const baseURLTEST = () => {
  const runtime = useRuntime()
  const userAccount = runtime.account;
  const userWorkspace = runtime.workspace;
  const url = `https://${userWorkspace}--${userAccount}.myvtex.com/_v/order_monitor/`
  return url
}
