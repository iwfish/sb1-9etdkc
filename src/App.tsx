import React, { useState, useEffect } from 'react';
import CustomerForm from './components/CustomerForm';
import Map2D from './components/Map2D';
import CustomerList from './components/CustomerList';
import CSVImport from './components/CSVImport';
import InventoryImport from './components/InventoryImport';
import { Customer, InventoryProperty } from './types';

function App() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [inventory, setInventory] = useState<InventoryProperty[]>([]);
  const [showInventory, setShowInventory] = useState(false);

  const addCustomer = (customer: Customer) => {
    const isPropertyInInventory = inventory.some(prop => prop.address === customer.propertyAddress);
    const newCustomer = { ...customer, isPropertyInInventory };
    setCustomers([...customers, newCustomer]);

    if (!isPropertyInInventory) {
      sendNotificationEmail(newCustomer);
    }
  };

  const addCustomers = (newCustomers: Customer[]) => {
    const updatedCustomers = newCustomers.map(customer => ({
      ...customer,
      isPropertyInInventory: inventory.some(prop => prop.address === customer.propertyAddress)
    }));
    setCustomers([...customers, ...updatedCustomers]);

    updatedCustomers.forEach(customer => {
      if (!customer.isPropertyInInventory) {
        sendNotificationEmail(customer);
      }
    });
  };

  const addInventory = (newInventory: InventoryProperty[]) => {
    setInventory([...inventory, ...newInventory]);
    // Update existing customers
    setCustomers(customers.map(customer => ({
      ...customer,
      isPropertyInInventory: [...inventory, ...newInventory].some(prop => prop.address === customer.propertyAddress)
    })));
  };

  const toggleInventoryDisplay = () => {
    setShowInventory(!showInventory);
  };

  const sendNotificationEmail = (customer: Customer) => {
    // This is a mock function to simulate sending an email
    console.log(`Sending email to iwasaki@projects-u.co.jp for new property: ${customer.propertyAddress}`);
    // In a real application, you would use an API or email service to send the actual email
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">顧客情報マップ</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/3">
          <CustomerForm onAddCustomer={addCustomer} />
          <CSVImport onCustomersImported={addCustomers} />
          <InventoryImport onInventoryImported={addInventory} />
          <button
            onClick={toggleInventoryDisplay}
            className="w-full mb-4 bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
          >
            {showInventory ? '在庫物件を非表示' : '在庫物件を表示'}
          </button>
          <CustomerList customers={customers} />
        </div>
        <div className="w-full lg:w-2/3">
          <Map2D customers={customers} inventory={inventory} showInventory={showInventory} />
        </div>
      </div>
    </div>
  );
}

export default App;