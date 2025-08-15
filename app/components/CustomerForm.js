'use client';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addCustomer, updateCustomer } from '../features/customerSlice';
import { v4 as uuidv4 } from 'uuid';

import './CustomerForm.css';

export default function CustomerForm({ editingCustomer, setEditingCustomer }) {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    city: '',
    note: '',
  });

  const [editingId, setEditingId] = useState(null); // Güncellenecek müşteri id’si

  // Eğer düzenlenecek bir müşteri varsa formu doldur
  useEffect(() => {
    if (editingCustomer) {
      setFormData({
        name: editingCustomer.name,
        email: editingCustomer.email,
        city: editingCustomer.city,
        note: editingCustomer.note,
      });
      setEditingId(editingCustomer.id); // ID’yi ayrı tutuyoruz
    }
  }, [editingCustomer]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /*
e = input değiştiğinde gelen olay (event)
e.target.name = hangi alan değişti
e.target.value = ne yazıldı
...formData = diğer alanları silmeden yeni alanı ekle/güncelle
*/

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId) {
      // Eğer düzenleme yapılıyorsa
      const updatedCustomer = {
        id: editingId,
        ...formData,
      };
      dispatch(updateCustomer(updatedCustomer));
      setEditingId(null); // Düzenleme bitti
      setEditingCustomer(null); // Form tekrar “ekleme” moduna geçer
    } else {
      // Yeni müşteri ekleniyorsa
      const newCustomer = {
        id: uuidv4(),
        ...formData,
      };
      dispatch(addCustomer(newCustomer)); //Redux store'a bir değişiklik bildirimi gönderir
    }

    // Formu sıfırla
    setFormData({ name: '', email: '', city: '', note: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="formContainer">
      <h2 className="formTitle">
        {editingId ? 'Update Customer' : 'New Customer'}
      </h2>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
        className="inputField"
      />
      <input
        type="email"
        name="email"
        placeholder="E-mail"
        value={formData.email}
        onChange={handleChange}
        required
        className="inputField"
      />
      <input
        type="text"
        name="city"
        placeholder="City"
        value={formData.city}
        onChange={handleChange}
        required
        className="inputField"
      />
      <input
        type="text"
        name="note"
        placeholder="Note"
        value={formData.note}
        onChange={handleChange}
        className="inputField"
      />
      <button type="submit" className="submitButton">
        {editingId ? 'Update' : 'Add'}
      </button>
    </form>
  );
}
