export interface Customer {
  id: string;
  name: string;
  address: string;
  propertyAddress: string;
  coordinates: [number, number];
  propertyCoordinates: [number, number];
  isPropertyInInventory: boolean;
}

export interface CSVCustomer {
  顧客名: string;
  顧客住所: string;
  需要物件: string;
}

export interface InventoryProperty {
  id: string;
  address: string;
  coordinates: [number, number];
}

export interface CSVInventory {
  物件住所: string;
}