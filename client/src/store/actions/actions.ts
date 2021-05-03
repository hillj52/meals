import { CartItem } from '../types';
import { ActionType } from './action-types';

interface AddItemAction {
  type: ActionType.ADD_ITEM;
  item: CartItem;
}

interface RemoveItemAction {
  type: ActionType.REMOVE_ITEM;
  id: string;
}

interface ClearCartAction {
  type: ActionType.CLEAR_CART;
}

export type Action = AddItemAction | RemoveItemAction | ClearCartAction;
