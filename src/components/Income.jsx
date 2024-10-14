import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useDispatch,useSelector } from 'react-redux';
import { addIncome,editIncome,deleteIncome } from '../redux/slice/transactionSlice';
import { toast } from 'react-toastify';




function Income() {

    const [show, setShow] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    const  [income, setIncome] = useState({date: '', title:'', amount: 0});
    const [editIndex, setEditIndex] = useState(null);
    
    const dispatch = useDispatch()
    const incomeList = useSelector((state)=> state.transactions.income)




    const handleClose = () => setShow(false);
    const handleShow = () => {
          setIncome({ date: '', title: '', amount: 0 })
          setShow(true)
        }
    const handleEditClose = () => setShowEdit(false);
    const handleEditShow = (index) => {
        setIncome(incomeList[index]); 
        setEditIndex(index); 
        setShowEdit(true);
    }

    const handleAddIncome = () => {
      if (!income.date || !income.title || !income.amount){
        toast.warning('Please fill all fields')
      }
      else{
      dispatch(addIncome({ ...income, id: Date.now(), amount: parseFloat(income.amount) }))
      handleClose()
      toast.success("Income added")
    }
    }
    const handleEditIncome = () => {
      if (!income.date || !income.title || !income.amount){
        toast.warning("please fill all feilds")
      }
      else{
      dispatch(editIncome({ id: incomeList[editIndex].id, updatedIncome: { ...income, amount: parseFloat(income.amount) } }));
      handleEditClose();
      toast.success("Income updated");
    }
    }
    const handleDeleteIncome = (index) => {
      const id = incomeList[index].id; 
      dispatch(deleteIncome(id));
      toast.success("Income deleted");
  }; 
  const totalIncome = incomeList.reduce((total, item) => total + item.amount, 0);
  

  return (
    <>
        
        <div>
            <h3 className='text-center mt-2'>Income</h3>
            <button className="btn btn-primary mb-2" onClick={handleShow}>Add Income</button>
            <table className='table '>
                <thead>
                    <tr >
                        <th>No.</th>
                        <th>Date</th>
                        <th>Title</th>
                        <th>₹ amount</th>
                        </tr>
                </thead>
                <tbody>
                    {incomeList.map((item, index) => (
                        <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.date}</td>
                        <td>{item.title}</td>
                        <td>₹ {item.amount}</td>
                        <td>
                        <button className='btn' onClick={() => handleEditShow(index)}>
                             <i className="fa-solid fa-pen-to-square fa-xl" style={{color: "#d68b0a",}} />
                             </button>
                             <button className='btn' onClick={() => handleDeleteIncome(index)}>
                             <i className="fa-solid fa-trash-can fa-xl" style={{color: "#dc1818",}} />
                             </button>
                            
                        </td>
                    </tr>
                    ))}
                    
                </tbody>
                <tfoot>
                  <tr>
                    <th colSpan={3} > Total income</th>
                    <th>₹ {totalIncome}</th>
                  </tr>
                </tfoot>
                
            </table>      
              
        </div>   
        







         <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} >
        <Modal.Header closeButton>
          <Modal.Title>Add Income</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         
        <FloatingLabel controlId="floatingDate" label="date" className="mb-3">
        <Form.Control type="date" placeholder="Select the date" value={income.date} onChange={(e)=> setIncome({...income, date: e.target.value})} />

      </FloatingLabel>

      <FloatingLabel controlId="floatingTitle" label="Title">
        <Form.Control type="text" placeholder="title of the income" onChange={(e)=>setIncome({...income,title: e.target.value})} />
        </FloatingLabel>

        <FloatingLabel controlId="floatingIncome" label="Income">
        <Form.Control type="text" placeholder="imcome" onChange={(e)=>setIncome({...income,amount: e.target.value})}/>
        
      </FloatingLabel>


        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddIncome}>Add</Button>
        </Modal.Footer>
      </Modal> 






      
      <Modal show={showEdit} onHide={handleEditClose} backdrop="static" keyboard={false} >
        <Modal.Header closeButton>
          <Modal.Title>Edit Income</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         
        <FloatingLabel controlId="floatingDate" label="date" className="mb-3">
        <Form.Control type="date" placeholder="Select the date" value={income.date} onChange={(e)=> setIncome({...income, date: e.target.value})} />

      </FloatingLabel>

      <FloatingLabel controlId="floatingTitle" label="Title">
        <Form.Control type="text" placeholder="title of the income" value={income.title} onChange={(e)=>setIncome({...income,title: e.target.value})} />
        </FloatingLabel>

        <FloatingLabel controlId="floatingIncome" label="Income">
        <Form.Control type="text" placeholder="imcome" value={income.amount} onChange={(e)=>setIncome({...income,amount: e.target.value})}/>
        
      </FloatingLabel>


        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleEditClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditIncome}>Edit</Button>
        </Modal.Footer>
      </Modal> 
    </>
  )
}

export default Income
