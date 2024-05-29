import type {Except} from 'type-fest';

export * from './create-order.action';
export * from './create-order-notes.action';
export * from './get-shipping.action';
export * from './update-order.action';

type PaymentMethod = 'bacs' | 'paypal';

export interface Order {
  id: number;
  currency: string;
  customer_id: number;
  discount_tax: string;
  discount_total: string;
  number: string;
  order_key: string;
  parent_id: number;
  created_via: string;
  payment_method: PaymentMethod;
  payment_method_title: string;
  payment_url: string;
  prices_include_tax: boolean;
  shipping_tax: string;
  shipping_total: string;
  cart_tax: string;
  status:
    | 'pending'
    | 'processing'
    | 'on-hold'
    | 'completed'
    | 'cancelled'
    | 'refunded'
    | 'failed'
    | 'trash';
  total: string;
  total_tax: string;
  transaction_id: string;
  version: string;
  shipping: Shipping;
}

interface Billing {
  first_name?: string;
  last_name?: string;
  address_1?: string;
  address_2?: string;
  city?: string;
  state?: string;
  postcode?: string;
  country?: string;
  email?: string;
  phone?: string;
}

type Shipping = Except<Billing, 'email' | 'phone'>;

export interface CreateOrder {
  payment_method: PaymentMethod;
  payment_method_title: string;
  set_paid: boolean;
  line_items: LineItem[];
  billing?: Billing;
  shipping?: Shipping;
  shipping_lines: LineShipping[];
}

export interface UpdateOrder {
  billing: Billing;
  shipping: Shipping;
  set_paid: boolean;
}

interface LineItem {
  product_id: number;
  quantity: number;
  variation_id?: number;
}
interface LineShipping {
  method_id: string;
  total: string;
}

export interface CreateOrderNotes {
  note: string;
}

export interface OrderNotes {
  id: number;
  note: string;
}

export interface ShippingMethod {
  id: number;
  instance_id: number;
  title: string;
  order: number;
  enabled: boolean;
  method_id: string;
  method_title: string;
  method_description: string;
  settings: {
    [key: string]: SettingBase | SettingWithOptions;
  };
}

interface SettingBase {
  id: string;
  label: string;
  description: string;
  type: string;
  value: string | null;
  default: string;
  tip: string;
  placeholder: string;
}

interface SettingWithOptions extends SettingBase {
  options?: {
      [key: string]: string;
  };
}