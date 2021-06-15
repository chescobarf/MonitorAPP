import React, { ChangeEvent, FC, SyntheticEvent, useState, useEffect} from 'react'
import axios from "axios"
import { FormattedMessage } from 'react-intl'
import { Layout, PageHeader,Toggle,Divider,Card,InputButton,Tag} from 'vtex.styleguide'
import './styles.global.css'
import Monitor from "./components/Monitor"
const OrderMonitor: FC = () => {

  return (
    <Layout pageHeader={<PageHeader title={<FormattedMessage id="order-monitor.hello-world" />} />}>
      <div className="gridOrders">
        <Monitor estado="payment-pending"/>
        <Monitor estado="payment-approved"/>
        <Monitor estado="window-to-cancel"/>
        <Monitor estado="ready-for-handling"/>
      </div>
    </Layout>
  )

}

export default OrderMonitor
