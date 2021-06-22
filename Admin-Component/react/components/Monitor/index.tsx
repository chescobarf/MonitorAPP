import React, { useState, useEffect } from 'react'
import { fetchTotalOrders, fetchTotalNotification, updateTotalNotification, fetchTotalEmails, updateTotalEmails } from '../../services'
import MonitorCard from './MonitorCard'

type AppProps = {
  orderState: string;
}
function Monitor({ orderState }: AppProps) {
  const [currentOrderCount, setCurrentOrderCount] = useState<number>(0);
  const [notificationTime, setNotificationTime] = useState<number>(0);
  const [emailList, setEmailList] = useState<string[]>(['']);

  useEffect(() => {
    if (!currentOrderCount || !notificationTime) {
      getOrderCount();
      getNotificationCount();
      getEmails();
    }
  }, [orderState, notificationTime]);

  const getOrderCount = async () => {
    const response = await fetchTotalOrders(orderState);
    setCurrentOrderCount(response?.total)
  }

  const getNotificationCount = async () => {
    const response = await fetchTotalNotification(orderState);
    setNotificationTime(response?.notification)
  }

  const getEmails = async () => {
    const response = await fetchTotalEmails(orderState)
    setEmailList(response)
  }

  const updateNotifications = async (newNotification: number) => {
    if (notificationTime !== newNotification) {
      await updateTotalNotification(orderState, newNotification)
      getNotificationCount()
    }
  }

  const updateEmails = async (newEmail: string) => {
    const emailsJson = {
      "emails": [...emailList, newEmail]
    }
    await updateTotalEmails(orderState, emailsJson)
    getEmails()
  }

  return (
    <div className="statusContainer">
      <MonitorCard orderState={orderState} currentOrderCount={currentOrderCount} notificationTime={notificationTime} notificationsCallback={updateNotifications} emailsList={emailList} emailsCallback={updateEmails} />
    </div>
  )
}

export default Monitor
