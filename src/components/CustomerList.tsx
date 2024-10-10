import React from 'react';
import { Customer } from '../types';
import { User, Home, MapPin } from 'lucide-react';

interface CustomerListProps {
  customers: Customer[];
}

const CustomerList: React.FC<CustomerListProps> = ({ customers }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">顧客リスト</h2>
      {customers.length === 0 ? (
        <p className="text-gray-500">顧客情報がありません。</p>
      ) : (
        <ul className="space-y-4">
          {customers.map((customer) => (
            <li key={customer.id} className="border-b pb-4 last:border-b-0 last:pb-0">
              <div className="flex items-center mb-1">
                <User className="mr-2" size={16} />
                <span className="font-medium">{customer.name}</span>
              </div>
              <div className="flex items-center mb-1 text-sm text-gray-600">
                <Home className="mr-2" size={16} />
                <span>{customer.address}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="mr-2" size={16} />
                <span>{customer.propertyAddress}</span>
                <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                  customer.isPropertyInInventory ? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800'
                }`}>
                  {customer.isPropertyInInventory ? '在庫あり' : '在庫なし'}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomerList;