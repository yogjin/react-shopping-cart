import { get, patch, post, remove } from 'apis/http';
import {
  CreateCartProductResponse,
  DeleteCartProductResponse,
  GetCartProductsResponse,
  GetProductsResponse,
  UpdateCartProductResponse,
} from 'apis/types';
import { CartProduct, Product } from 'types/product';

export const API_BASE = 'api';

export const api = {
  // 상품 목록 조회
  async getProducts(): Promise<GetProductsResponse> {
    const response = await get(`${API_BASE}/products`);

    return response.json();
  },

  // 장바구니 아이템 목록 조회
  async getCartProducts(): Promise<GetCartProductsResponse> {
    const response = await get(`${API_BASE}/cart-items`);

    return response.json();
  },

  // 장바구니 아이템 추가
  createCartProduct(productId: Product['id']) {
    const response = post(`${API_BASE}/cart-items`, {
      body: JSON.stringify({ productId }),
    });

    return response;
  },

  // 장바구니 아이템 변경
  updateCartProduct(cartProduct: CartProduct) {
    const { id, quantity, checked } = cartProduct;

    const response = patch(`${API_BASE}/cart-items/${id}`, {
      body: JSON.stringify({ quantity, checked }),
    });

    return response;
  },

  // 장바구니 아이템 삭제
  deleteCartProduct(cartProductId: CartProduct['id']) {
    const response = remove(`${API_BASE}/cart-items/${cartProductId}`);

    return response;
  },
};
