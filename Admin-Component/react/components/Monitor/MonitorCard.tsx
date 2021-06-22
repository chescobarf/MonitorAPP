import React, { ChangeEvent, SyntheticEvent, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { Toggle, Divider, Card, InputButton, Tag, Spinner } from 'vtex.styleguide'
import { emailsTestArray } from '../../constants'

type AppProps = {
  orderState: string;
  currentOrderCount: number;
  notificationTime: number;
  notificationsCallback: Function
}
function MonitorCard({ orderState, currentOrderCount, notificationTime, notificationsCallback }: AppProps) {
  const [toggle, setToggle] = useState(true);
  const [notificationUpdate, setNotificationUpdate] = useState<number>(0)

  //TODO
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    console.log("This should trigger component reload")
    notificationsCallback(notificationUpdate)
  }
  const handleEmailUpdate = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
  }

  const handleNotifyUpdate = (e: ChangeEvent<HTMLInputElement>) => {
    let newNotification = e.target.value
    setNotificationUpdate(parseInt(newNotification))
  }

  // Funcion para Eliminar email desde el listado de Tags
  const removeEmail = (email: string) => {
    console.log(email);
  }

  return (
    <Card className="statusCard">
      <div className="statusTitle">
        <h2>{orderState}</h2>
        <Toggle
          semantic
          checked={toggle}
          onChange={() => setToggle(!toggle)}
        />
      </div>
      <Divider orientation="horizontal" />
        <div className="statusNumbers">
          <h1 >{currentOrderCount ?? <Spinner color="#134CD8" size={25} />}</h1>
          <h3>Orders</h3>
        </div>
      <Divider orientation="horizontal" />
      <form onSubmit={handleSubmit}>
        <div className="statusNotificate">
          <InputButton placeholder="Orders" size="regular" label="Notify in" button="Update" type="number" onChange={handleNotifyUpdate}/>
          <div className="statusNotificate container">
            {<FormattedMessage id="order-monitor.current-notification" />}
            {!notificationTime ? (
                <Spinner color="#134CD8" size={25} />
              ) : (
                <Tag className="emailsTag" type="warning">
                  {notificationTime}
                  {<FormattedMessage id="order-monitor.orders" />}
                </Tag>
              )
            }
          </div>
        </div>
      </form>
      <form>
        <div className="statusEmails">
            <InputButton placeholder="Emails" size="regular" label="Emails to notify" button="Add" type="email" onChange={handleEmailUpdate} />
          <div className="statusEmails container">
            {emailsTestArray.map((email, i) => (
              <Tag key={i} className="emailsTag" bgColor="#134CD8" color="#ffffff" onClick={() => removeEmail(email.name)}>{email.name}</Tag>
            ))}
          </div>
        </div>
      </form>
    </Card>
  )
}

export default MonitorCard
