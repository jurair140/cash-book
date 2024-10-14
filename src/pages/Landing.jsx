import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Landing() {

    const {income,expense} = useSelector((state)=>state.transactions)

    const totalIncome = income.reduce((sum, incomeItem) => sum + incomeItem.amount, 0);
    const totalExpense = expense.reduce((sum, expenseItem) => sum + expenseItem.amount, 0);
    const balance = totalIncome - totalExpense


  return (
    <>
        <div>
            <div className='d-flex justify-content-center align-items-center flex-column' style={{height:'100vh'}}>
               
                <div className='w-75 border  border-2 p-5 rounded-3 shadow d-flex justify-content-center flex-column '>
                    <div>
                        <h1 className='text-center fw-bold'><i className="fas fa-money-check-alt fa-xl" style={{color: "#1628ac",}} /> Your Balance Sheet</h1>
                    </div>
                    <div className='d-flex justify-content-center mt-3 flex-wrap'>
                            <div className='cards bg-primary text-light border border-3 rounded-3 p-5 m-2 '>
                                <h2  > Your balance :</h2>
                                <h1 className='text-center mt-3'>₹ {balance}</h1>
                            </div>
                            <div className='cards bg-success text-light border border-3 rounded-3 p-5 m-2' >
                                <h2  className='text-center'>Income :</h2>
                                <h1 className='text-center mt-3'>₹ {totalIncome}</h1>
                            </div>
                            <div className='cards bg-warning text-light border border-3 rounded-3 p-5 m-2' >
                                <h2 className='text-center'>Expence:</h2>
                                <h1 className='text-center mt-3'>₹ {totalExpense}</h1>
                            </div>
                        </div>
                    </div>

                    <div className='mt-5'>
                        <Link to={'/dash'}>
                    <button className='btn btn-info border rounded-3 align-center'>Go to Dashboard</button>
                      </Link>
                    </div>
                    

            </div>
            
        </div>
    </>
  )
}

export default Landing
