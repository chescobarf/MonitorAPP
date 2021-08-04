import React, { ChangeEvent, FC, useState, useEffect } from 'react'
import { FormattedMessage } from 'react-intl'
import { Layout, PageHeader, Dropdown } from 'vtex.styleguide'
import Monitor from "./components/Monitor"
import './styles.global.css'
import { orderStates, reloadTimes } from './constants'
import { fetchReloadTime, updateReloadTime, apiClient, startMonitoring } from './services'
import { baseURLTEST } from './constants/baseUrl'

const OrderMonitor: FC = () => {
  const [reloadingSchedule, setReloadingSchedule] = useState<number>(0)

  const baseUrl = baseURLTEST()
  const api = apiClient(baseUrl)

  useEffect(() => {
    getTimeToReload()
  }, [reloadingSchedule])

  useEffect(() => {
    startMonitoring(api);
  }, [])

  const getTimeToReload = async () => {
    const response = await fetchReloadTime(api);
    setReloadingSchedule(response.updatetime)
  }

  const handleReload = async (e: ChangeEvent<HTMLInputElement>) => {
    const reloadInterval = parseInt(e.target.value);
    await updateReloadTime(reloadInterval, api)
    getTimeToReload()
  }

  return (
    <Layout pageHeader={
      <PageHeader
        title={<FormattedMessage id="order-monitor.title" />}>
          <span className="headerDropdown">
            <h3>{<FormattedMessage id="order-monitor.update-monitor" />}</h3>
            <Dropdown
              className="dropdown"
              variation="inline"
              size="large"
              options={reloadTimes}
              value={reloadingSchedule}
              onChange={handleReload}
            />
            <h3>{<FormattedMessage id="order-monitor.update-minutes" />}</h3>
          </span>
      </PageHeader>
    }>
      <div className="gridOrders">
        {orderStates.map((state, i) => <Monitor key={i} orderState={state} api={api} />)}
      </div>
    </Layout>
  )
}

export default OrderMonitor
