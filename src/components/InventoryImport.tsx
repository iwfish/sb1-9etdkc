import React, { ChangeEvent } from 'react';
import Papa from 'papaparse';
import { InventoryProperty, CSVInventory } from '../types';
import { Upload } from 'lucide-react';

interface InventoryImportProps {
  onInventoryImported: (inventory: InventoryProperty[]) => void;
}

const InventoryImport: React.FC<InventoryImportProps> = ({ onInventoryImported }) => {
  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      Papa.parse(file, {
        complete: (results) => {
          const csvInventory = results.data as CSVInventory[];
          const inventory: InventoryProperty[] = csvInventory.map((csvProperty) => ({
            id: `inventory-${csvProperty.物件住所}-${Date.now()}`, // ユニークなIDを生成
            address: csvProperty.物件住所,
            coordinates: [
              35.3614 + (Math.random() - 0.5) * 0.1,
              136.6205 + (Math.random() - 0.5) * 0.1
            ] as [number, number]
          }));
          onInventoryImported(inventory);
        },
        header: true,
        encoding: 'Shift-JIS',
      });
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-xl font-semibold mb-4">在庫物件CSVインポート</h2>
      <label htmlFor="inventory-upload" className="flex items-center justify-center w-full px-4 py-2 bg-green-500 text-white rounded-md cursor-pointer hover:bg-green-600 transition duration-300">
        <Upload className="mr-2" size={20} />
        在庫CSVファイルを選択
      </label>
      <input
        id="inventory-upload"
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        className="hidden"
      />
    </div>
  );
};

export default InventoryImport;