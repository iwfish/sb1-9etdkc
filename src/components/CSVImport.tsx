import React, { ChangeEvent } from 'react';
import Papa from 'papaparse';
import { Customer, CSVCustomer } from '../types';
import { Upload } from 'lucide-react';

interface CSVImportProps {
  onCustomersImported: (customers: Customer[]) => void;
}

const CSVImport: React.FC<CSVImportProps> = ({ onCustomersImported }) => {
  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      Papa.parse(file, {
        complete: (results) => {
          const csvCustomers = results.data as CSVCustomer[];
          const customers: Customer[] = csvCustomers.map((csvCustomer, index) => ({
            id: `csv-${index}`,
            name: csvCustomer.顧客名,
            address: csvCustomer.顧客住所,
            propertyAddress: csvCustomer.需要物件,
            coordinates: [35.6762 + Math.random() * 0.1, 139.6503 + Math.random() * 0.1],
            propertyCoordinates: [35.6897 + Math.random() * 0.1, 139.6922 + Math.random() * 0.1],
          }));
          onCustomersImported(customers);
        },
        header: true,
        encoding: 'Shift-JIS',
      });
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-xl font-semibold mb-4">CSVインポート</h2>
      <label htmlFor="csv-upload" className="flex items-center justify-center w-full px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600 transition duration-300">
        <Upload className="mr-2" size={20} />
        CSVファイルを選択
      </label>
      <input
        id="csv-upload"
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        className="hidden"
      />
    </div>
  );
};

export default CSVImport;