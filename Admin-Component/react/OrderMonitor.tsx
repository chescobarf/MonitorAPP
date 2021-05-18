import { EEXIST } from 'constants'
import React, { ChangeEvent, FC, FormEvent, SyntheticEvent, useState} from 'react'
import { FormattedMessage } from 'react-intl'
import { Layout, PageHeader,Toggle,Divider,Card,InputButton,Tag} from 'vtex.styleguide'
import './styles.global.css'


const OrderMonitor: FC = () => {

  const [toggle,setToggle] = useState(true);
	const handleSubmit = (e:SyntheticEvent) =>{
		e.preventDefault();
		console.log("Click desde Formulario")
	}
	const handleOnChange = (e:ChangeEvent<HTMLInputElement>)=>{
		console.log(e.target.value)
	}
const array = [
	{name:"juan@gmail.com"},
	{name:"pepe@gmail.com"},
	{name:"lolo@gmail.com"}
]
const [emails,setEmails]=useState(array);
  return (
    <Layout
      pageHeader={
        <PageHeader
          title={<FormattedMessage id="order-monitor.hello-world" />}
        />
      }
    >
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
              <h1>100</h1>
              <h3>Orders</h3>
        </div>
        <Divider orientation="horizontal" />
        <div className="statusNotificate">
          <InputButton placeholder="Orders" size="regular" label="Notify in" button="Update" type="number"/>
		  <div className="statusNotificate container">
			  	<Tag  className="emailsTag" type="warning">
					{<FormattedMessage id="order-monitor.notification-actually" />}
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
				{array.map((email)=>(	
					<Tag  className="emailsTag" bgColor="#134CD8" color="#ffffff">{email.name}</Tag>	
				))}
			</div>
	  		{/* <div className="statusEmails container">
			  <Tag  className="emailsTag" bgColor="#134CD8" color="#ffffff" onClick={() => console.log('callback')}>christian.escobar@vtex.com.br</Tag>
			</div> */}
        </div>
      </Card>
      </div>
    </Layout>
  )
}

export default OrderMonitor
