'use client'; // tarayıcıda çalışması için
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'; // state okuma ve action gönderme
import { deleteCustomer, setCustomers } from '../features/customerSlice';

import './CustomerList.css';

// TanStack Table
import {
  useReactTable,              // Ana tablo oluşturucu hook
  getCoreRowModel,            // Tablonun temel veri yapısı
  getFilteredRowModel,        // Filtrelenmiş tablo
  getSortedRowModel,          // Sıralanmış tablo
  getPaginationRowModel,      // Sayfalama verisi
  flexRender,
  createColumnHelper,         // Kolon tanımlama
} from '@tanstack/react-table';

// İkonlar
import { FaSortUp, FaSortDown } from 'react-icons/fa';

export default function CustomerList({ onEdit }) {
  const dispatch = useDispatch(); // Redux'a action göndermek için

  // Sayfa ilk açıldığında localStorage'dan veriyi yükle
  useEffect(() => {
    // İlk yüklemede localStorage'dan veri çek
    const stored = localStorage.getItem('customers');

    if (stored && stored !== '[]') {
      dispatch(setCustomers(JSON.parse(stored)));
    } else {
      // Eğer hiç veri yoksa mock data’yı yükle
      const mockData = [
        {
          id: '1',
          name: 'Alice Johnson',
          email: 'alice.johnson@example.com',
          city: 'New York',
          note: 'Important client',
        },
        {
          id: '2',
          name: 'Bob Smith',
          email: 'bob.smith@example.com',
          city: 'Los Angeles',
          note: 'Interested in premium package',
        },
        {
          id: '3',
          name: 'Carol Davis',
          email: 'carol.davis@example.com',
          city: 'Chicago',
          note: 'Follow up next week',
        },
        {
          id: '4',
          name: 'David Wilson',
          email: 'david.wilson@example.com',
          city: 'Houston',
          note: '',
        },
        {
          id: '5',
          name: 'Eva Martinez',
          email: 'eva.martinez@example.com',
          city: 'Miami',
          note: 'Prefers email contact',
        },
        {
          id: '6',
          name: 'Frank Brown',
          email: 'frank.brown@example.com',
          city: 'Seattle',
          note: 'Potential lead',
        },
      ];
      dispatch(setCustomers(mockData));
      localStorage.setItem('customers', JSON.stringify(mockData));
    }
  }, [dispatch]);

  const customers = useSelector((state) => state.customers.customers); // Redux'tan müşteri listesini al

  const [globalFilter, setGlobalFilter] = useState(''); // Arama inputu için state
  const [sorting, setSorting] = useState([]); // a-z sıralaması için

  const handleDelete = (id) => {
    dispatch(deleteCustomer(id)); // Silme işlemi
  };

  const columnHelper = createColumnHelper(); // Kolon tanımlamak

  const columns = [
    columnHelper.accessor('name', {
      header: ({ column }) => (
        <button
          className="sortableHeader"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === 'asc')
          }
        >
          Name
          {column.getIsSorted() === 'asc' ? (
            <FaSortUp className="icon" />
          ) : column.getIsSorted() === 'desc' ? (
            <FaSortDown className="icon" />
          ) : null}
        </button>
      ),
      cell: (info) => info.getValue(),
      enableSorting: true,
    }),
    columnHelper.accessor('email', {
      header: ({ column }) => (
        <button
          className="sortableHeader"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === 'asc')
          }
        >
          Email
          {column.getIsSorted() === 'asc' ? (
            <FaSortUp className="icon" />
          ) : column.getIsSorted() === 'desc' ? (
            <FaSortDown className="icon" />
          ) : null}
        </button>
      ),
      cell: (info) => info.getValue(),
      enableSorting: true,
    }),
    columnHelper.accessor('city', {
      header: ({ column }) => (
        <button
          className="sortableHeader"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === 'asc')
          }
        >
          City
          {column.getIsSorted() === 'asc' ? (
            <FaSortUp className="icon" />
          ) : column.getIsSorted() === 'desc' ? (
            <FaSortDown className="icon" />
          ) : null}
        </button>
      ),
      cell: (info) => info.getValue(),
      enableSorting: true,
    }),
    columnHelper.accessor('note', {
      header: ({ column }) => (
        <button
          className="sortableHeader"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === 'asc')
          }
        >
          Note
          {column.getIsSorted() === 'asc' ? (
            <FaSortUp className="icon" />
          ) : column.getIsSorted() === 'desc' ? (
            <FaSortDown className="icon" />
          ) : null}
        </button>
      ),
      cell: (info) => info.getValue(),
      enableSorting: true,
    }),
    columnHelper.display({
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <div className="actionsWrapper">
          <button onClick={() => onEdit(row.original)} className="editButton">
            Edit
          </button>
          <button
            onClick={() => handleDelete(row.original.id)}
            className="deleteButton"
          >
            Delete
          </button>
        </div>
      ),
    }),
  ];

  const table = useReactTable({
    data: customers, // Gösterilecek veriler
    columns,
    state: { globalFilter, sorting },
    onSortingChange: setSorting, // A-Z sıralama
    onGlobalFilterChange: setGlobalFilter, // Input değişince filtreyi güncelle
    getCoreRowModel: getCoreRowModel(), // Temel tablo verisi
    getFilteredRowModel: getFilteredRowModel(), // Filtrelenmiş hali
    getSortedRowModel: getSortedRowModel(), // Sıralanmış hali
    getPaginationRowModel: getPaginationRowModel(), // Sayfalama
    filterFns: {
      fuzzy: (row, columnId, filterValue) => {
        return row
          .getAllCells()
          .some((cell) =>
            String(cell.getValue())
              .toLowerCase()
              .includes(filterValue.toLowerCase())
          );
      },
    },
    globalFilterFn: 'fuzzy', // Yukarıdaki filtre fonksiyonunu kullanmak için ekledi
    initialState: {
      pagination: {
        pageSize: 6, // Her sayfada 6 müşteri göster
      },
    },
  });

  return (
    <div className="container">
      <div className="headerWrapper">
        {/* Başlık solda */}
        <h2 className="title">Customer List</h2>

        {/* Arama kutusu sayfanın sağında olacak */}
        <input
          type="text"
          placeholder="Search by name, email, city, note..."
          value={globalFilter ?? ''}
          onChange={(e) => setGlobalFilter(e.target.value)} // Kullanıcı yazınca filtreyi güncelle
          className="searchInput"
        />
      </div>

      <table
        border="1"
        cellPadding="5"
        cellSpacing="0"
        className="table"
      >
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="th">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.length === 0 && (
            <tr>
              <td colSpan={columns.length} className="noData">
                No Customers Found
              </td>
            </tr>
          )}

          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="td">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Sayfalama kontrolleri */}
      <div className="paginationWrapper">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="paginationButton"
        >
          ‹ Prev
        </button>

        <span className="paginationInfo">
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </span>

        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="paginationButton"
        >
          Next ›
        </button>
      </div>
    </div>
  );
}
