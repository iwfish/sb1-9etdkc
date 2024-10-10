import React, { useState } from 'react';
import { Customer } from '../types';
import { MapPin, User, Home } from 'lucide-react';

interface CustomerFormProps {
  onAddCustomer: (customer: Customer) => void;
}

const CustomerForm: React.FC<CustomerFormProps> = ({ onAddCustomer }) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [propertyAddress, setPropertyAddress] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCustomer: Customer = {
      id: Date.now().toString(),
      name,
      address,
      propertyAddress,
      coordinates: [35.6762, 139.6503], // Tokyo coordinates (replace with actual geocoding)
      propertyCoordinates: [35.6897, 139.6922], // Example property coordinates (replace with actual geocoding)
      isPropertyInInventory: false, // This will be updated in the parent component
    };
    onAddCustomer(newCustomer);
    setName('');
    setAddress('');
    setPropertyAddress('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-xl font-semibold mb-4">顧客情報入力</h2>
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          <User className="inline-block mr-2" size={16} />
          顧客名
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
          <Home className="inline-block mr-2" size={16} />
          顧客住所
        </label>
        <input
          type="text"
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="propertyAddress" className="block text-sm font-medium text-gray-700 mb-1">
          <MapPin className="inline-block mr-2" size={16} />
          物件住所
        </label>
        <input
          type="text"
          id="propertyAddress"
          value={propertyAddress}
          onChange={(e) => setPropertyAddress(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
      >
        追加
      </button>
    </form>
  );
};

export default CustomerForm;