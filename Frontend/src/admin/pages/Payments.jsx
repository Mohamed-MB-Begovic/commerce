/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
// import { Modal, Notification } from '@shadcn/ui';
import {Button} from '../../components/ui/Button'
import {Input} from '../../components/ui/Input'
// import {Table} from '../../components/ui/Table'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/Table"

import {Form} from '../../components/ui/form'
import axios from 'axios';

const Payments = () => {
  const sampleData=[
    {
      "id": 1,
      "customerName": "John Doe",
      "amount": 150.75,
      "status": "Paid",
      "date": "2023-12-15"
    },
    {
      "id": 2,
      "customerName": "Jane Smith",
      "amount": 200.50,
      "status": "Pending",
      "date": "2023-12-18"
    },
    {
      "id": 3,
      "customerName": "Michael Brown",
      "amount": 120.00,
      "status": "Failed",
      "date": "2023-12-20"
    },
    {
      "id": 4,
      "customerName": "Emily Johnson",
      "amount": 300.00,
      "status": "Paid",
      "date": "2023-12-22"
    },
    {
      "id": 5,
      "customerName": "David Wilson",
      "amount": 85.00,
      "status": "Pending",
      "date": "2023-12-25"
    }
  ]
  
  const [payments, setPayments] = useState(sampleData);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentPayment, setCurrentPayment] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await axios.get('/api/payments'); // Replace with your API endpoint
      setPayments(response.data);
    } catch (error) {
      Notification.error('Failed to fetch payments.'+error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this payment?')) {
      try {
        await axios.delete(`/api/payments/${id}`); // Replace with your API endpoint
        setPayments(payments.filter((payment) => payment.id !== id));
        Notification.success('Payment deleted successfully.');
      } catch (error) {
        Notification.error('Failed to delete payment.'+error);
      }
    }
  };

  const handleEdit = (payment) => {
    setCurrentPayment(payment);
    setShowModal(true);
  };

  const handleAdd = () => {
    setCurrentPayment(null);
    setShowModal(true);
  };

  const handleSave = async (values) => {
    try {
      if (currentPayment) {
        // Update existing payment
        await axios.put(`/api/payments/${currentPayment.id}`, values); // Replace with your API endpoint
        setPayments(
          payments.map((payment) =>
            payment.id === currentPayment.id ? { ...payment, ...values } : payment
          )
        );
        Notification.success('Payment updated successfully.');
      } else {
        // Add new payment
        const response = await axios.post('/api/payments', values); // Replace with your API endpoint
        setPayments([...payments, response.data]);
        Notification.success('Payment added successfully.');
      }
    } catch (error) {
      Notification.error('Failed to save payment.'+error);
    } finally {
      setShowModal(false);
    }
  };

  const filteredPayments = payments.filter((payment) =>
    payment.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Payment Management</h1>
      <div className="flex justify-between items-center mb-4">
        <Input
          placeholder="Search by customer name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-1/3"
        />
        {/* <Button onClick={handleAdd}>Add Payment</Button> */}
      </div>
      {loading ? (
        <div>Loading payments...</div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Customer Name</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPayments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>{payment.id}</TableCell>
                <TableCell>{payment.customerName}</TableCell>
                <TableCell>${payment.amount}</TableCell>
                <TableCell>{payment.status}</TableCell>
                <TableCell>{new Date(payment.date).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Button variant="outline" onClick={() => handleEdit(payment)}>
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(payment.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      {/* <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Form
          initialValues={currentPayment || { customerName: '', amount: '', status: '', date: '' }}
          onSubmit={handleSave}
        >
          <Form.Field label="Customer Name" name="customerName" required />
          <Form.Field label="Amount" name="amount" type="number" required />
          <Form.Field label="Status" name="status" required />
          <Form.Field label="Date" name="date" type="date" required />
          <div className="flex justify-end gap-2 mt-4">
            <Button type="button" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </Form>
      </Modal> */}
    </div>
  );
};

export default Payments;
