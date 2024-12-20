export interface Item {
  id: number;
  name: string;
  price: number;
}

export interface ItemState {
  items: Item[];
  loading: boolean;
  error: string | null;
} 
