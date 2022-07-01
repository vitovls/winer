import styled from "styled-components";

const NotFoundProducts = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.primary};
  font-size: 2rem;
  font-weight: bold;
  margin-top: 20px;
  padding: 20px;
`;

export default NotFoundProducts;