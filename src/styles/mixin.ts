import { css } from 'styled-components';

const flexRow = css`
  display: flex;
`;

const flexColumn = css`
  display: flex;
  flex-direction: column;
`;

const sizes = {
  mobile: '320px',
  tablet: '768px',
  desktop: '1024px',
};

const device = {
  mobile: `(max-width: ${sizes.mobile})`,
  tablet: `(max-width: ${sizes.tablet})`,
  desktop: `(max-width: ${sizes.desktop})`,
};

export { flexRow, flexColumn, device };
