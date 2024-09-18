export const TransactionHistory=()=>{
    return(
        <>
         <div className="transaction-history">
            <h2>Transaction History</h2>
            <table>
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Category</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                   
                        <tr >
                            <td>transaction.description</td>
                            <td className="transaction" >
                                Math.abs(transaction.amount)
                            </td>
                            <td>transaction.category</td>
                            <td>transaction.date</td>
                            <td>
                                <button className="edit">Edit</button>
                                <button className="delete">Delete</button>
                            </td>
                        </tr>
                    
                </tbody>
            </table>
        </div>
        </>
    )
}