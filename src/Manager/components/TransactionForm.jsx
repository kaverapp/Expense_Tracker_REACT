import { useState } from "react"
import "./form.css"
 export const TransactionForm = () => {


    const [takeinp, setTakeinp] = useState({
        description: "",
        amount: 0,
        category: "",
        type: ""
    });

    const onChangehandler = (e) => {
        e.preventDefault();
        let { name, value } = e.target;
        setTakeinp({});
    }

    const submitHandler=(e)=>{
        e.preventDefault();
        let { name,value} =e.target
        setStorevalue((prev)=>({...prev,[name]:value}))

        
    }

    return (
        <>
            <div className="form-container">
                <h2>Add New Transaction</h2>
                <form action="" onSubmit={submitHandler}>
                    <input type="text" placeholder="Enter the description" name="description" value={takeinp.description} onChange={onChangehandler} />
                    <input type="number" placeholder="Amount" value={takeinp.amount} name="amount" onChange={onChangehandler} />
                    <input type="text" placeholder="Enter the category" value={takeinp.category} name="category" onChange={onChangehandler} />
                    <div className="radio-group" >
                        <label>
                            <input
                                type="radio"
                                name="transactionType"
                                value="income"
                                onChange={onChangehandler}


                            />
                            Income
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="transactionType"
                                value="expense"
                                onChange={onChangehandler}
                            />
                        </label>
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </>
    )
}