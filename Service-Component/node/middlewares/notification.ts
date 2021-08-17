const paginationV2: PaginationArgs = { page: 1, pageSize: 1 }
​
interface PaginationArgs {
	page: number
	pageSize: number
}
​
export async function notification(ctx: Context, next: () => Promise<any>) {
	const { clients: { masterdata, licenseManager }, } = ctx

  const key:any = ctx.vtex.adminUserAuthToken

	const search = await masterdata.searchDocuments({
		dataEntity: "OM",
		fields: ["readyforhandling", "paymentapproved", "dataEntityId"],
		pagination: paginationV2
	})

  const users = await licenseManager.getAccountData(key)
​
	console.log("New Data:")
  console.log(search);
  console.log(users?.contact?.name);


	next()
}
