export interface CartItem {
  id: string;
  name: string;
  amount: number;
  price: number;
}

export type CartContextState = {
  items: CartItem[];
  getTotal: () => number;
  getNumberOfItems: () => number;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
};
