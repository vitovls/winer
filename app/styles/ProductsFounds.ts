import styled from "styled-components";

const FoundProducts = styled.div`
  font-family: ${({ theme }) => theme.fonts.primary};
  font-weight: 400;
  margin: 20px 0;

  strong {
    font-weight: 700;
  }
`;

export default FoundProducts;