import { useContext } from "react";
import styled from "styled-components";
import AppContext from "../utils/AppContext";

const PaginationStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;

  .btn-page { 
    margin: 0 10px;
    padding: 10px;
    border: 1px solid ${props => props.theme.colors.primary};
    border-radius: 5px;
    color: ${props => props.theme.colors.primary};
    font-size: 1.2rem;
    font-weight: bold;
    cursor: pointer;
  }

  .active {
    background-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.background};
    cursor: default;
  }

  .deactive {
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.primary};
    cursor: default;
  }

  @media (max-width: 768px) {
    .active {
      color: ${props => props.theme.colors.primary};
      background-color: ${props => props.theme.colors.white};
    }
    .number-page-btn {
      display: none;
    }
  }
`;


export default function Pagination() {

  const { pagination: { page, totalPages }, setPagination } = useContext(AppContext);

  const nextPage = () => {
    setTimeout(() => {
      if (page < totalPages) {
        setPagination({
          page: page + 1,
          totalPages,
        });
      }
    }, 500);
  }

  const prevPage = () => {
    setTimeout(() => {
      if (page > 1) {
        setPagination({
          page: page - 1,
          totalPages,
        });
      }
    }, 500);
  }

  const renderButtonPages = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => setPagination({
            page: i,
            totalPages,
          })}
          className={page === i ? "btn-page active" : "btn-page number-page-btn"}
        >
          {i}
        </button>
      );
    }
    return buttons;
  }


  return (
    <PaginationStyled className=".pagination">
      {
        page > 1 ? (
          <button className="btn-page" onClick={prevPage}>
            Anterior
          </button>
        ) :
          <button className="btn-page deactive" onClick={prevPage}>
            Anterior
          </button>
      }
      {
        renderButtonPages()
      }
      {
        page < totalPages ? (
          <button className="btn-page" onClick={nextPage}>
            Próximo
          </button>
        ) :
          <button className="btn-page deactive" onClick={nextPage}>
            Próximo
          </button>
      }
    </PaginationStyled>
  );
}