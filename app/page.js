'use client';
import { useState } from 'react';
import CustomerForm from './components/CustomerForm';
import CustomerList from './components/CustomerList';

export default function Home() {
  const [editingCustomer, setEditingCustomer] = useState(null);

  return (
    <main>
      <CustomerForm
        editingCustomer={editingCustomer}
        setEditingCustomer={setEditingCustomer}
      />
      <CustomerList onEdit={setEditingCustomer} />
    </main>
  );
}
