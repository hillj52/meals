import { Reducer } from 'react';
import { ActionType } from '../actions/action-types';
import { Action } from '../actions/actions';
import { CartItem } from '../types';

interface CartState {
  items: CartItem[];
  totalPrice: number;
  totalNumberOfItems: number;
}

export const initialCartState: CartState = {
  items: [],
  totalPrice: 0,
  totalNumberOfItems: 0,
};

const cartReducer: Reducer<CartState, Action> = (
  state = initialCartState,
  action
) => {
  switch (action.type) {
    case ActionType.ADD_ITEM: {
      const { item } = action;
      const existingItemIndex = state.items.findIndex(
        ({ id }) => id === item.id
      );
      const existingItem = state.items[existingItemIndex];
      if (existingItem) {
        const updatedItem = {
          ...existingItem,
          amount: existingItem.amount + item.amount,
        };
        const items = [...state.items];
        items[existingItemIndex] = updatedItem;
        return {
          ...state,
          items,
          totalPrice: state.totalPrice + item.amount * item.price,
          totalNumberOfItems: state.totalNumberOfItems + item.amount,
        };
      }
      return {
        ...state,
        items: state.items.concat(action.item),
        totalPrice: state.totalPrice + action.item.price * action.item.amount,
        totalNumberOfItems: state.totalNumberOfItems + action.item.amount,
      };
    }
    case ActionType.REMOVE_ITEM: {
      const existingItemIndex = state.items.findIndex(
        ({ id }) => id === action.id
      );
      const existingItem = state.items[existingItemIndex];
      if (existingItem) {
        const updatedItem = {
          ...existingItem,
          amount: existingItem.amount - 1,
        };
        const items = [...state.items];
        items[existingItemIndex] = updatedItem;
        return {
          ...state,
          items: items.filter(({ amount }) => amount > 0),
          totalPrice: state.totalPrice - existingItem.price,
          totalNumberOfItems: state.totalNumberOfItems - 1,
        };
      }
      return {
        ...state,
      };
    }
    default:
      return state;
  }
};

export default cartReducer;
