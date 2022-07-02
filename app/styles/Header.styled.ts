import styled from "styled-components";

const HeaderStyled = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background-color: ${props => props.theme.colors.white};
  border-bottom: 1px solid ${props => props.theme.colors.grey};
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  height: 80px;
  overflow: hidden;

  a {
    cursor: pointer;
  }

  .links-header-mobile-show-btn {
    display: none;
  }


  .links-header {
    height: 100%;
    width: 70%;
    display: flex;
    cursor: pointer;
    
    
    a {
      padding: 10px;
    }

    .selected-link {
      border-bottom: 2px solid ${props => props.theme.colors.primary};
      color: ${props => props.theme.colors.primary};
    }
  }

  .links-user {
    width: 30%;
    display: flex;
    justify-content: space-between;
    padding: 10px 20px 10px;

    .cart {
      position: relative;

      .cart-icon {
        position: absolute;
        bottom: 0px;
        right: 0px;
        background-color: ${props => props.theme.colors.white};
        border-radius: 50%;
        padding: 5px;
        font-size: 12px;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
      }
    }
  }

  @keyframes fadeOut {
    0% {
      width: 60%;
      opacity: 0;
    }
    20% {
      opacity: 0.2;
    }
    40% {
      opacity: 0.4;
    }
    60% {
      opacity: 0.6;
    }
    80% {
      opacity: 0.8;
    }
    100% {
      width: 30%;
      opacity: 1;
    }
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
      width: 0;
    }
    100% {
      opacity: 1;
      width: 50%;
    }
  }

  .search-disabled {
    border: none;
    cursor: pointer;
    animation: fadeOut 0.5s linear;
  }

  .container-search {
    display: flex;
    align-items: center;
    justify-content: center;
    animation: fadeIn 0.5s linear;

    input {
      border: none;
      outline: none;
      background-color: ${props => props.theme.colors.white};
      width: 100%;
      font-size: 14px;
      color: ${props => props.theme.colors.grey};
      padding: 10px;

      &::placeholder {
        color: ${props => props.theme.colors.grey};
      }
    }

    button {
      border: none;
      color: ${props => props.theme.colors.white};
      border-radius: 50%;
      height: 30px;
      width: 30px;
      cursor: pointer;
      transition: all 0.3s ease-in-out;
      padding: 5px;
      &:hover {
        background-color: ${props => props.theme.colors.primary};
      }
    }
  }


  @media (max-width: 768px) {
    justify-content: center;
    align-items: center;

    .links-header {
      display: none;
    }

    .links-user-search {
      display: none;
    }

    .links-user-person {
      display: none;
    }

    .links-header-mobile-show-btn {
      display: flex;
      border: none;
      background-color: transparent;
      cursor: pointer;
      box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
    }

    .links-user {
      width: 35%;
      padding: 10px;
    }

    .links-user-cart {
      width: 5rem;
    }

    .links-user-personcart {
      position: relative;
    }
    
    .cart-icon {
      position: absolute;
      bottom: 0px;
      right: 0px;
      background-color: ${props => props.theme.colors.white};
      border-radius: 50%;
      padding: 5px;
      font-size: 12px;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
      color: ${props => props.theme.colors.secondary};
      font-weight: bold;
    }

    @keyframes slide-down {
      0% {
        transform: translateY(-100%);
      }
      100% {
        transform: translateY(0);
      }
    }

    .container-search {
      display: flex;
      position: absolute;
      top: 0px;
      right: 0px;
      width: 100%;
      background-color: ${props => props.theme.colors.primary};
      animation: slide-down 0.5s ease-in-out;
      animation-fill-mode: forwards;
      padding: 10px;
      z-index: 1;
      height: 140px;
      
      input {
        border-radius: 5px;
        width: 80%;
        margin: 10px;

        &:focus {
          outline: none;
        }
      }

      button {
        padding: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 20%;
        border-radius: 20%;
      }
    }
  }
`;

export default HeaderStyled;