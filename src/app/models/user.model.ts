import { Address } from './address.model';
import { CreditCard } from './credit-card.model';
import { Order } from './order.model';
import { WishList } from './wish-list.model';

export interface User {
  readonly uid?: string;
  readonly firstname?: string;
  readonly lastname?: string;
  readonly email?: string;
  readonly address?: Address;
  readonly phoneNumber?: number;
  readonly profession?: string;
  readonly birthday?: string;
  readonly nationality?: string;
  readonly siret?: number;
  readonly tvaNumber?: string;
  readonly creditCards?: CreditCard[];
  readonly orders?: Order[];
  readonly wishList?: WishList;
}
