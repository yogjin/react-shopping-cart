import { useMutation } from './useMutation';
import { api } from 'apis/products/api';
import { useRecoilState } from 'recoil';
import { cartState } from 'state/CartAtom';
import { CartProduct, Product } from 'types/product';

export const useCart = () => {
  const [cart, setCart] = useRecoilState(cartState);

  const { mutate: addCartProduct } = useMutation<Product, CartProduct>(
    async (product) => {
      await api.createCartProduct(product.id);

      return { id: product.id, quantity: 1, checked: true, product };
    },
    {
      onSuccess: (cartProduct) => {
        setCart((prev) => [...prev, cartProduct]);
      },
    }
  );

  const { mutate: deleteCartProduct } = useMutation<Product, CartProduct[]>(
    async (product) => {
      const cartProduct = cart.find((cartProduct) => cartProduct.id === product.id);

      if (!cartProduct) {
        throw new Error('장바구니에 상품이 없어요! 먼저 상품을 등록해주세요.');
      }

      await api.deleteCartProduct(cartProduct.id);

      return cart.filter((cartProduct) => cartProduct.id !== product.id);
    },
    {
      onSuccess: (updatedCart) => {
        setCart(updatedCart);
      },
    }
  );

  const { mutate: updateQuantity } = useMutation<
    { cartProductId: CartProduct['id']; quantity: CartProduct['quantity'] },
    CartProduct[]
  >(
    async ({ cartProductId, quantity }) => {
      const cartProduct = cart.find((cartProduct) => cartProduct.id === cartProductId);

      if (!cartProduct) {
        throw new Error('장바구니에 상품이 없어요! 먼저 상품을 등록해주세요.');
      }

      const updatedCartProduct = { ...cartProduct, quantity: quantity };

      const updatedCart = cart.map((cartProduct) => {
        if (cartProduct.id !== cartProductId) return cartProduct;
        return updatedCartProduct;
      });

      await api.updateCartProduct(updatedCartProduct);

      return updatedCart;
    },
    {
      onSuccess: (updatedCart) => {
        setCart(updatedCart);
      },
    }
  );

  const decreaseQuantity = (cartProductId: CartProduct['id']) => {
    const cartProduct = cart.find((cartProduct) => cartProduct.id === cartProductId);

    if (!cartProduct) {
      throw new Error('장바구니에 상품이 없어요! 먼저 상품을 등록해주세요.');
    }

    updateQuantity({ cartProductId, quantity: cartProduct.quantity - 1 });
  };

  const increaseQuantity = (cartProductId: CartProduct['id']) => {
    const cartProduct = cart.find((cartProduct) => cartProduct.id === cartProductId);

    if (!cartProduct) {
      throw new Error('장바구니에 상품이 없어요! 먼저 상품을 등록해주세요.');
    }

    updateQuantity({ cartProductId, quantity: cartProduct.quantity + 1 });
  };

  const { mutate: toggleChecked } = useMutation<CartProduct['id'], CartProduct[]>(
    async (cartProductId) => {
      const cartProduct = cart.find((cartProduct) => cartProduct.id === cartProductId);

      if (!cartProduct) {
        throw new Error('장바구니에 상품이 없어요! 먼저 상품을 등록해주세요.');
      }

      const updatedCartProduct = { ...cartProduct, checked: !cartProduct.checked };

      const updatedCart = cart.map((product) => {
        if (product.id !== cartProductId) return product;
        return updatedCartProduct;
      });

      await api.updateCartProduct(updatedCartProduct);

      return updatedCart;
    },
    {
      onSuccess: (updatedCart) => {
        setCart(updatedCart);
      },
    }
  );

  return { addCartProduct, deleteCartProduct, updateQuantity, decreaseQuantity, increaseQuantity, toggleChecked };
};
