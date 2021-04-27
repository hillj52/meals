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

export type Action = AddItemAction | RemoveItemAction;
