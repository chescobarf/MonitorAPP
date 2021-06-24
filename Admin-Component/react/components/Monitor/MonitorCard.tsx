import React, { ChangeEvent, SyntheticEvent, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { Toggle, Divider, Card, InputButton, Tag, Spinner } from 'vtex.styleguide'
import { cleanEmptyEmail } from '../../utils';

type AppProps = {
  orderState: string;
  currentOrderCount: number;
  notificationTime: number;
  notificationsCallback: Function;
  emailsList: string[];
  updateEmailsCallback: Function;
  deleteEmailsCallback: Function;
}
function MonitorCard({ orderState, currentOrderCount, notificationTime, notificationsCallback, emailsList, updateEmailsCallback, deleteEmailsCallback }: AppProps) {
  const [toggle, setToggle] = useState(true);
  const [notificationUpdate, setNotificationUpdate] = useState<any>()
  const [emailUpdate, setEmailUpdate] = useState<any>()

  const handleNotificationSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    notificationsCallback(notificationUpdate)
    setNotificationUpdate('')
  }

  const handleNotifyUpdate = (e: ChangeEvent<HTMLInputElement>) => {
    let newNotification = e.target.value
    if (parseInt(newNotification) < 1) {
      return alert("No puedes ingresar un valor menor a 0")
    }
    setNotificationUpdate(parseInt(newNotification))
  }

  const handleEmailsSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    updateEmailsCallback(emailUpdate)
    setEmailUpdate('')
  }

  const handleEmailUpdate = (e: ChangeEvent<HTMLInputElement>) => {
    let newEmail = e.target.value
    setEmailUpdate(newEmail)
  }

  const removeEmail = (email: string) => {
    deleteEmailsCallback(email)
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
      <form onSubmit={handleNotificationSubmit}>
        <div className="statusNotificate">
          <InputButton placeholder="Orders" size="regular" label="Notify in" button="Update" type="number" value={notificationUpdate} onChange={handleNotifyUpdate}/>
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
      <form onSubmit={handleEmailsSubmit}>
        <div className="statusEmails">
            <InputButton placeholder="Emails" size="regular" label="Emails to notify" button="Add" type="email" value={emailUpdate} onChange={handleEmailUpdate} />
          <div className="statusEmails container">
            {!emailsList ? (
              <Spinner color="#134CD8" size={25} />
            ) : (cleanEmptyEmail(emailsList).map((email, i) => (
              <Tag key={i} className="emailsTag" bgColor="#134CD8" color="#ffffff" onClick={() => removeEmail(email)}>{email}</Tag>
            )))}
          </div>
        </div>
      </form>
    </Card>
  )
}

export default MonitorCard
