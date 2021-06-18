import React, { FC } from 'react'
import { FormattedMessage } from 'react-intl'
import { Layout, PageHeader} from 'vtex.styleguide'
import Monitor from "./components/Monitor"
import './styles.global.css'
import { orderStates } from './constants'

const OrderMonitor: FC = () => {
  return (
    <Layout pageHeader={<PageHeader title={<FormattedMessage id="order-monitor.title" />} />}>
      <div className="gridOrders">
        {orderStates.map((state, i) => <Monitor key={i} orderState={state}/>)}
      </div>
    </Layout>
  )
}

export default OrderMonitor
