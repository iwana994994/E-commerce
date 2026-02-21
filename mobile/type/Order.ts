import { Product } from "./ProductType";

export interface Order {
        _id: string;
		products: [
			{
				product: Product
					
				quantity: number
				price: number
			},
		],
		totalAmount: number;
	}