import styled from "styled-components";

const StoreStyled = styled.div`
  background-color: ${props => props.theme.colors.background};

  .main {
    display: flex;
  }

  @media (max-width: 768px) {
    .main {
      align-items: center;
      flex-direction: column;
    }
  }
`;

export default StoreStyled;