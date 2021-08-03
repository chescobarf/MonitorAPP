export const emailValidation = async (http:any, workspace:any, account:any, status:any) => {

  const send = (json:any) =>{
    http.post(`http://${workspace}--${account}.myvtex.com/_v/order_monitor/sendEmail/`,json)
  }
    
  const totalOrders = await http.get(`http://${workspace}--${account}.myvtex.com/_v/order_monitor/totalOrders/${status}`)
  
  const notifyOrder = await http.get(`http://${workspace}--${account}.myvtex.com/_v/order_monitor/getNotification/${status}`)

  if (totalOrders && notifyOrder) {

    const ordersData = totalOrders.data
    let totalOrdersNumber:any = Object.values(ordersData)
    totalOrdersNumber = totalOrdersNumber[0]

    const notifyData=notifyOrder.data
    let totalNotifyNumber:any=Object.values(notifyData)
    totalNotifyNumber=totalNotifyNumber[0]
    
    if (totalOrdersNumber > totalNotifyNumber) {
      var emails = await http.get(`http://${workspace}--${account}.myvtex.com/_v/order_monitor/getEmails/${status}`)
      emails = emails.data.toString()
      var jsonToEmail = {
        "email": `${emails}`,
        "template": "monitor-order",
        "additionalFields": {  
          "totalOrders":`${totalOrdersNumber}`,
          "ordersNotify":`${totalNotifyNumber}`,
          "status":`${status}`
        }
      }
      return send(jsonToEmail)
     } else {
        return console.log("***** Email not sent ******");
     }
  }
}
