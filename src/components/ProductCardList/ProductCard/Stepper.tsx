import { ReactComponent as MiniCartIcon } from 'assets/mini-cart-icon.svg';
import { useState } from 'react';
import styled from 'styled-components';

type Props = {
  value: number;
  onClickClosed: () => void;
  onClickDecreaseButton: () => void;
  onClickIncreaseButton: () => void;
};

export const Stepper = ({ value, onClickClosed, onClickDecreaseButton, onClickIncreaseButton }: Props) => {
  const [isActive, setIsActive] = useState(false);

  const hasPositiveValue = value > 0;

  const openStepper = () => {
    setIsActive(true);
  };

  const closeStepper = () => {
    setIsActive(false);
  };

  const handleCloseStepperOnBlur = (e: React.FocusEvent) => {
    if (e.relatedTarget === e.currentTarget || e.currentTarget.contains(e.relatedTarget)) return;

    closeStepper();
  };

  const handleClickDecreaseButton = () => {
    onClickDecreaseButton();
    if (value === 1) closeStepper();
  };

  const handleClickIncreaseButton = () => {
    onClickIncreaseButton();
  };

  const handleClickAddCartButton = () => {
    openStepper();

    onClickClosed();
  };

  return (
    <>
      {isActive ? (
        <StepperContainer tabIndex={0} onBlur={handleCloseStepperOnBlur}>
          <DecreaseButton onClick={handleClickDecreaseButton}>-</DecreaseButton>
          <Quantity tabIndex={0}>{value}</Quantity>
          <IncreaseButton autoFocus onClick={handleClickIncreaseButton}>
            +
          </IncreaseButton>
        </StepperContainer>
      ) : hasPositiveValue ? (
        <AddCartButton onClick={openStepper}>
          <Quantity>{value}</Quantity>
        </AddCartButton>
      ) : (
        <AddCartButton onClick={handleClickAddCartButton}>
          <MiniCartIcon />
        </AddCartButton>
      )}
    </>
  );
};

const AddCartButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 12px;
  right: 8px;
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 50%;
  background-color: #2ac1bc;
  cursor: pointer;
`;

const StepperContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 12px;
  right: 8px;
  width: 100px;
  height: 36px;
  padding: 5px;
  border: none;
  border-radius: 9999px;
  background-color: #2ac1bc;
`;

const DecreaseButton = styled.button`
  width: 24px;
  height: 24px;
  border: none;
  border-radius: 50%;
  background-color: #2ac1bc;
  color: #ffffff;
  font-size: 26px;
  line-height: 20px;

  :hover {
    filter: brightness(0.9);
  }
`;

const Quantity = styled.span`
  margin: 0 auto;
  font-size: 16px;
  color: #ffffff;
`;

const IncreaseButton = styled.button`
  width: 24px;
  height: 24px;
  border: none;
  border-radius: 50%;
  background-color: #2ac1bc;
  color: #ffffff;
  font-size: 26px;
  line-height: 20px;

  :hover {
    filter: brightness(0.9);
  }
`;