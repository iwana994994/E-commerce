import { Product } from "./ProductType";

export type CartLine = {
  _id: string;
  product: Product;
  quantity: number;
};