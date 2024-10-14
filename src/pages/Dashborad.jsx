import React from 'react'
import Header from '../components/Header'
import { Row,Col } from 'react-bootstrap'
import Income from '../components/Income'
import Expense from '../components/Expense'
import { useSelector } from 'react-redux'


function Dashborad() {

    const {income,expense} = useSelector((state)=>state.transactions)

    const totalIncome = income.reduce((sum, incomeItem) => sum + incomeItem.amount, 0);
    const totalExpense = expense.reduce((sum, expenseItem) => sum + expenseItem.amount, 0);
    const balance = totalIncome - totalExpense
  return (
    <>
    <Header />
     <div className="container-fluid">
      <h2 className='text-center mt-3'>Track Your Income and Expense</h2>
        <div className=' p-2 mt-3'> 
            <Row>
                <Col sm={12} md={6}>
                    <div className='w-100 border border-2'>
                        <Income/>
                    </div>                
                </Col >
                <Col sm={12} md={6}>    
                    <div className='w-100 border border-2'>
                        <Expense/>
                    </div>  
                
                </Col>
            </Row>
            <div className='container-fluid d-flex  justify-content-center mt-3'>
                <div className='d-flex  p-2'>
                    <h3>Balance : </h3>
                    <h3 className='text-primary fw-bold'style={{display:'inline-block'}}>{balance}</h3>
                </div>

            </div>

        </div>
     </div>













    
    


    </>
  )
}

export default Dashborad
