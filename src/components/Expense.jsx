import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { addExpense, editExpense, deleteExpense } from '../redux/slice/transactionSlice';
import { toast } from 'react-toastify';


function Expense() {
    const [show, setShow] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    const [expense, setExpense] = useState({ date: '', title: '', amount: 0 });
    const [editIndex, setEditIndex] = useState(null);

    const dispatch = useDispatch();
    const expenseList = useSelector((state) => state.transactions.expense);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setExpense({ date: '', title: '', amount: 0 });
        setShow(true);
    };
    const handleEditClose = () => setShowEdit(false);
    const handleEditShow = (index) => {
        setExpense(expenseList[index]);
        setEditIndex(index);
        setShowEdit(true);
    };

    const handleAddExpense = () => {
        if (!expense.date || !expense.title || !expense.amount) {
            toast.warning("Please fill all the fields");
        } else {
            dispatch(addExpense({ ...expense, id: Date.now(), amount: parseFloat(expense.amount) }));
            handleClose();
            toast.success("expense added")
           
        }
    };
    const handleEditExpense = () => {
        if (!expense.date || !expense.title || !expense.amount) {
            toast.warning('Please fill all fields');
        } else {
            dispatch(editExpense({ id: expenseList[editIndex].id, updatedExpense: { ...expense, amount: parseFloat(expense.amount) } }));
            handleEditClose();
            toast.success('Expense updated');
        }
    };

    const handleDeleteExpense = (index) => {
        const id = expenseList[index].id;
        dispatch(deleteExpense(id));
        toast.success('Expense deleted');
    };

    const totalExpense = expenseList.reduce((total, item) => total + item.amount, 0);

    return (
        <>
            <div>
                <h3 className='text-center mt-2'>Expense</h3>
                <button className="btn btn-danger mb-2" onClick={handleShow}>Add Expense</button>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Date</th>
                            <th>Title</th>
                            <th>₹ Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expenseList.map((item, index) => (
                            <tr key={item.id}>
                                <td>{index + 1}</td>
                                <td>{item.date}</td>
                                <td>{item.title}</td>
                                <td>₹ {item.amount}</td>
                                <td>
                                    <button className='btn' onClick={() => handleEditShow(index)}>
                                        <i className="fa-solid fa-pen-to-square fa-xl" style={{ color: "#d68b0a" }} />
                                    </button>
                                    <button className='btn' onClick={() => handleDeleteExpense(index)}>
                                        <i className="fa-solid fa-trash-can fa-xl" style={{ color: "#dc1818" }} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th colSpan={3}>Total Expense</th>
                            <th>₹ {totalExpense}</th>
                        </tr>
                    </tfoot>
                </table>
            </div>

            {/* Add Expense Modal */}
            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Expense</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FloatingLabel controlId="floatingDate" label="Date" className="mb-3">
                        <Form.Control type="date" placeholder="Select the date" value={expense.date} onChange={(e) => setExpense({ ...expense, date: e.target.value })} />
                    </FloatingLabel>

                    <FloatingLabel controlId="floatingTitle" label="Title" className="mb-3">
                        <Form.Control type="text" placeholder="Expense title" value={expense.title} onChange={(e) => setExpense({ ...expense, title: e.target.value })} />
                    </FloatingLabel>

                    <FloatingLabel controlId="floatingAmount" label="Amount">
                        <Form.Control type="text" placeholder="Amount" value={expense.amount} onChange={(e) => setExpense({ ...expense, amount: e.target.value })} />
                    </FloatingLabel>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary" onClick={handleAddExpense}>Add</Button>
                </Modal.Footer>
            </Modal>

            {/* Edit Expense Modal */}
            <Modal show={showEdit} onHide={handleEditClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Expense</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FloatingLabel controlId="floatingDate" label="Date" className="mb-3">
                        <Form.Control type="date" placeholder="Select the date" value={expense.date} onChange={(e) => setExpense({ ...expense, date: e.target.value })} />
                    </FloatingLabel>

                    <FloatingLabel controlId="floatingTitle" label="Title" className="mb-3">
                        <Form.Control type="text" placeholder="Expense title" value={expense.title} onChange={(e) => setExpense({ ...expense, title: e.target.value })} />
                    </FloatingLabel>

                    <FloatingLabel controlId="floatingAmount" label="Amount">
                        <Form.Control type="text" placeholder="Amount" value={expense.amount} onChange={(e) => setExpense({ ...expense, amount: e.target.value })} />
                    </FloatingLabel>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleEditClose}>Close</Button>
                    <Button variant="primary" onClick={handleEditExpense}>Edit</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Expense;
