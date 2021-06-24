import React, { ChangeEvent, FC, useState, useEffect } from 'react'
import { FormattedMessage } from 'react-intl'
import { Layout, PageHeader, Dropdown } from 'vtex.styleguide'
import Monitor from "./components/Monitor"
import './styles.global.css'
import { orderStates, reloadTimes } from './constants'
import { fetchReloadTime, updateReloadTime } from './services'

const OrderMonitor: FC = () => {
  const [reloadingSchedule, setReloadingSchedule] = useState<number>(0)

  useEffect(() => {
    getTimeToReload()
  }, [reloadingSchedule])

  const getTimeToReload = async () => {
    const response = await fetchReloadTime();
    setReloadingSchedule(response.updatetime)
  }

  const handleReload = async (e: ChangeEvent<HTMLInputElement>) => {
    const reloadInterval = parseInt(e.target.value);
    await updateReloadTime(reloadInterval)
    getTimeToReload()
  }

  return (
    <Layout pageHeader={
      <PageHeader
        title={<FormattedMessage id="order-monitor.title" />}>
          <span className="headerDropdown">
            <h3>Actualizar monitores cada: </h3>
            <Dropdown
              className="dropdown"
              variation="inline"
              size="large"
              options={reloadTimes}
              value={reloadingSchedule}
              onChange={handleReload}
            />
            <h3>minutos</h3>
          </span>
      </PageHeader>
    }>
      <div className="gridOrders">
        {orderStates.map((state, i) => <Monitor key={i} orderState={state} />)}
      </div>
    </Layout>
  )
}

export default OrderMonitor
