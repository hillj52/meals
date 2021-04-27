import { createContext, useReducer } from 'react';
import { CartContextState, CartItem } from './types';
import { ActionType } from './actions/action-types';
import cartReducer, { initialCartState } from './reducers/cart-reducer';

const cartContextDefaultValues: CartContextState = {
  items: [],
  getTotal: () => (0),
  getNumberOfItems: () => (0),
  addItem: () => {},
  removeItem: () => {},
}

export const CartContext = createContext<CartContextState>(cartContextDefaultValues);

const CartProvider: React.FC = ({ children }) => {
  const [cartState, dispatch] = useReducer(cartReducer, initialCartState);

  const getTotal = () => cartState.totalPrice;

  const getNumberOfItems = () => cartState.totalNumberOfItems;

  const addItem = (item: CartItem) => {
    dispatch({ type: ActionType.ADD_ITEM, item });
  }

  const removeItem = (id: string) => {
    dispatch({ type: ActionType.REMOVE_ITEM, id });
  }

  return (
    <CartContext.Provider value={{
      items: cartState.items,
      getTotal,
      getNumberOfItems,
      addItem,
      removeItem,
    }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider;