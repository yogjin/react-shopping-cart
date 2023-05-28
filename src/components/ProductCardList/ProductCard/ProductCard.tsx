import FlexBox from 'components/@common/FlexBox';
import { Stepper } from 'components/ProductCardList/ProductCard/Stepper';
import { useCart } from 'hooks/useCart';
import { useRecoilValue } from 'recoil';
import { filteredCartProductState } from 'state/CartAtom';
import styled from 'styled-components';
import type { Product } from 'types/product';
import { formatKoreanCurrency } from 'utils';
import { renderDefaultThumbnail } from 'utils/image';

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const { addCartProduct, deleteCartProduct, decreaseQuantity, increaseQuantity } = useCart();
  const { id, price, name, imageUrl } = product;
  const filteredCartProduct = useRecoilValue(filteredCartProductState(id));

  const filteredCartProductQuantity = filteredCartProduct?.quantity ?? 0;

  return (
    <FlexBox direction="column" justify="flex-start" gap="8px" width="200px" role="list">
      <ProductImgContainer>
        <ProductImage src={imageUrl} alt={name} onError={renderDefaultThumbnail} />
        <StepperWrapper>
          <Stepper
            value={filteredCartProductQuantity}
            onClickClosed={() => addCartProduct(product)}
            onClickDecreaseButton={() => {
              if (filteredCartProductQuantity > 1) {
                return decreaseQuantity(product.id);
              }
              deleteCartProduct(product);
            }}
            onClickIncreaseButton={() => increaseQuantity(product.id)}
          />
        </StepperWrapper>
      </ProductImgContainer>
      <FlexBox justify="flex-start" padding="0 4px">
        <FlexBox direction="column" align="flex-start">
          <Title>{name}</Title>
          <Price>{formatKoreanCurrency(price)}원</Price>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
};

const ProductImgContainer = styled.div`
  position: relative;
  width: 100%;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 4px;
  filter: brightness(96%);
`;

const StepperWrapper = styled.div`
  position: absolute;
  bottom: 12px;
  right: 8px;
`;

const Title = styled.span`
  font-size: 14px;
`;

const Price = styled.span`
  font-size: 18px;
  font-weight: 700;
  letter-spacing: -0.4px;
`;

export default ProductCard;
