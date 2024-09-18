import { useState } from "react"
import { TransactionForm } from "../components/TransactionForm"
import { TransactionHistory } from "../components/TransactionHistory"

export const DashBoard = () => {

    const [storevalue,setStorevalue]=useState([]);

   const handleStoreValue=(e)=>{
    //let { name, value } = value;
      // setTakeinp(prevValue => [ ...prevValue, {}]);

   }


    return (
        <>
           <div className="dashboard">
      <section className="header">
        <div className="header-container">
          <h1 className="income">INCOME</h1>
          <h1 className="expenses">EXPENSES</h1>
          <h1 className="balance">BALANCE</h1>
        </div>
      </section>
      <main>
        <div className="transaction-form">
          <TransactionForm handleStore={handleStoreValue}/>
        </div>
        <div className="transaction-history">
            <ul>
                {
                    storevalue.map((transaction)=>{
                       return <TransactionHistory />
                    })
                }
            </ul>
          
        </div>
      </main>
      </div>
        </>
    )
}