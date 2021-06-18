import React, { ChangeEvent, SyntheticEvent, useState, useEffect } from 'react'
import { FormattedMessage } from 'react-intl'
import { Toggle, Divider, Card, InputButton, Tag } from 'vtex.styleguide'
import { emailsTestArray } from '../constants'
import { fetchTotalOrders, fetchTotalNotification } from '../services'

type AppProps = {
  orderState: string;
}
function Monitor({ orderState }: AppProps) {
  const [toggle, setToggle] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [currentOrderCount, setCurrentOrderCount] = useState<number>();
  const [notificationTime, setNotificationTime] = useState<number>()

  //TODO
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    console.log("Click desde Formulario")
  }
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
  }

  // Funcion para Eliminar email desde el listado de Tags
  const removeEmail = (email: string) => {
    console.log(email);
  }

  useEffect(() => {
    if (!currentOrderCount || !notificationTime) {
      setLoading(true);
      getOrderCount();
      getNotificationCount();
    }
    return setLoading(false)
  }, [orderState]);

  const getOrderCount = async () => {
    const response = await fetchTotalOrders(orderState);
    setCurrentOrderCount(response?.total)
  }

  const getNotificationCount = async () => {
    const response = await fetchTotalNotification(orderState);
    setNotificationTime(response?.notification)
  }



  if (!isLoading) {
    return (
      <div className="statusContainer">
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
            <h1 >{currentOrderCount}</h1>
            <h3>Orders</h3>
          </div>
          <Divider orientation="horizontal" />
          <div className="statusNotificate">
            <InputButton placeholder="Orders" size="regular" label="Notify in" button="Update" type="number" />
            <div className="statusNotificate container">
              {<FormattedMessage id="order-monitor.current-notification" />}
              <Tag className="emailsTag" type="warning">
                {notificationTime}
                {<FormattedMessage id="order-monitor.orders" />}
              </Tag>
            </div>
          </div>
          <div className="statusEmails">
            <form onSubmit={handleSubmit}>
              <InputButton placeholder="Emails" size="regular" label="Emails to notify" button="Add" type="email" onChange={handleOnChange} />
            </form>
            <div className="statusEmails container">
              {emailsTestArray.map((email, i) => (
                <Tag key={i} className="emailsTag" bgColor="#134CD8" color="#ffffff" onClick={() => removeEmail(email.name)}>{email.name}</Tag>
              ))}
            </div>
          </div>
        </Card>
      </div>
    )
  } else {
    return (
      <div className="statusContainer">
        <Card className="statusCard">
          <div className="statusTitle">
            <h2>Payments Pending</h2>
            <Toggle
              semantic
              checked={toggle}
              onChange={() => setToggle(!toggle)}
            />
          </div>
          <Divider orientation="horizontal" />
          <div className="statusNumbers">
            <h1 >Loading Orders</h1>
            <h3>Orders</h3>
          </div>
          <Divider orientation="horizontal" />
          <div className="statusNotificate">
            <InputButton placeholder="Orders" size="regular" label="Notify in" button="Update" type="number" />
            <div className="statusNotificate container">
              {<FormattedMessage id="order-monitor.current-notification" />}
              <Tag className="emailsTag" type="warning">
                200
                {<FormattedMessage id="order-monitor.orders" />}
              </Tag>
            </div>
          </div>
          <div className="statusEmails">
            <form onSubmit={handleSubmit}>
              <InputButton placeholder="Emails" size="regular" label="Emails to notify" button="Add" type="email" onChange={handleOnChange} />
            </form>
            <div className="statusEmails container">
              {emailsTestArray.map((email, i) => (
                <Tag key={i} className="emailsTag" bgColor="#134CD8" color="#ffffff" onClick={() => removeEmail(email.name)}>{email.name}</Tag>
              ))}
            </div>
          </div>
        </Card>
      </div>
    );
  }
}

export default Monitor
