import React, { useState, useEffect } from 'react'
import { componentReloadTime } from '../../constants';
import { fetchTotalOrders, fetchTotalNotification, updateTotalNotification, fetchTotalEmails, updateTotalEmails } from '../../services'
import { cleanEmptyEmail } from '../../utils';
import MonitorCard from './MonitorCard'

type AppProps = {
  orderState: string;
}
function Monitor({ orderState }: AppProps) {
  const [currentOrderCount, setCurrentOrderCount] = useState<number>(0);
  const [notificationTime, setNotificationTime] = useState<number>(0);
  const [emailList, setEmailList] = useState<string[]>([]);

  useEffect(() => {
    if (!currentOrderCount || !notificationTime) {
      getOrderCount();
      getNotificationCount();
      getEmails();
    }

    const interval = setInterval(() => {
      getOrderCount();
      getNotificationCount();
      getEmails();
    }, componentReloadTime);

    return () => clearInterval(interval)

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
    setEmailList(cleanEmptyEmail(response))
  }

  const updateNotifications = async (newNotification: number) => {
    if (notificationTime !== newNotification) {
      await updateTotalNotification(orderState, newNotification)
      getNotificationCount()
    }
  }

  const updateEmails = (newEmail: string) => {
    if (emailList.includes(newEmail)) {
      return alert('El correo que has ingresado ya existe')
    }
    const updatedEmails = cleanEmptyEmail(emailList)
    const emailsJson = {
      "emails": [...updatedEmails, newEmail]
    }
    updateTotalEmails(orderState, emailsJson)
    setEmailList([...updatedEmails, newEmail])
  }

  const deleteEmails = (emailToDelete: string) => {
    const confirmAnswer = confirm(`¿Estás seguro de querer eliminar el correo ${emailToDelete}?`)
    if (confirmAnswer) {
      const updatedEmails = emailList.filter(email => email !== emailToDelete)
      const cleanEmails = cleanEmptyEmail(updatedEmails)
      const emailsJson = {
        "emails": [...cleanEmails]
      }
      updateTotalEmails(orderState, emailsJson)
      setEmailList([...cleanEmails])
    } else {
      return
    }
  }

  return (
    <div className="statusContainer">
      <MonitorCard orderState={orderState} currentOrderCount={currentOrderCount} notificationTime={notificationTime} notificationsCallback={updateNotifications} emailsList={emailList} updateEmailsCallback={updateEmails} deleteEmailsCallback={deleteEmails} />
    </div>
  )
}

export default Monitor
