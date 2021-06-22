import React, { useState, useEffect } from 'react'
import { fetchTotalOrders, fetchTotalNotification, updateTotalNotification } from '../../services'
import MonitorCard from './MonitorCard'

type AppProps = {
  orderState: string;
}
function Monitor({ orderState }: AppProps) {
  const [currentOrderCount, setCurrentOrderCount] = useState<number>(0);
  const [notificationTime, setNotificationTime] = useState<number>(0)

  useEffect(() => {
    if (!currentOrderCount || !notificationTime) {
      getOrderCount();
      getNotificationCount();
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

  const updateNotifications = async (newNotification: number) => {
    if (notificationTime !== newNotification) {
      await updateTotalNotification(orderState, newNotification)
      getNotificationCount()
    }
  }

  return (
    <div className="statusContainer">
      <MonitorCard orderState={orderState} currentOrderCount={currentOrderCount} notificationTime={notificationTime} notificationsCallback={updateNotifications} />
    </div>
  )
}

export default Monitor
