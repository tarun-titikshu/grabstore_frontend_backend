export class Cart {
  cartId: number;
  productId: number;
  productName: string;
  quantity: number;
  gstId: number;
  products: CartProduct[]; // Array of CartProduct, representing individual items
}

export class CartProduct {
  productId: number;
  productName: string;
  quantity: number;
  gstId: number;
}
