import ROUTE_PATH from 'Router';
import { ReactComponent as CartIcon } from 'assets/header-cart-icon.svg';
import HeaderLogo from 'assets/header-logo.png';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { cartProductsCountState } from 'state/CartAtom';
import styled from 'styled-components';
import { flexColumn } from 'styles/mixin';

const Header = () => {
  const cartProductCount = useRecoilValue(cartProductsCountState);

  return (
    <HeaderContainer>
      <HeaderContentContainer>
        <FlexLink to={ROUTE_PATH.root}>
          <img src={HeaderLogo} width="260px" height="60px" alt="remove-button" />
        </FlexLink>
        <FlexLink to={ROUTE_PATH.cart}>
          <CartIconWrapper>
            <CartIcon />
            <CartTitle>장바구니</CartTitle>
            <CartProductCount>{cartProductCount}</CartProductCount>
          </CartIconWrapper>
        </FlexLink>
      </HeaderContentContainer>
    </HeaderContainer>
  );
};

const FlexLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const HeaderContainer = styled.header`
  position: sticky;
  top: 0px;
  display: flex;
  width: 100%;
  height: var(--header-height);
  align-items: center;
  background-color: ${({ theme }) => theme.colors.gray_0};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray_2};
  z-index: 2;
`;

const HeaderContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 40px;
  max-width: 1080px;
  margin: 0 auto;
`;

const CartIconWrapper = styled.div`
  ${flexColumn};

  position: relative;
  width: 55px;
  padding: 8px;
  text-align: center;
  transition: 300ms;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray_2};
    border-radius: 4px;
  }
`;

const CartTitle = styled.span`
  border: none;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.gray_10};
  font-size: 10px;
  letter-spacing: -0.2px;
`;

const CartProductCount = styled.span`
  position: absolute;
  right: 8px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.gray_0};
  font-size: 10px;
  text-align: center;
`;

export default Header;
