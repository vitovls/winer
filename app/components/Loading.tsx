import styled from "styled-components";

const LoadingStyles = styled.div`
.loading {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  .circle-loading {
    width: 75px;
    height: 75px;
    border-radius: 50%;
    border: 5px solid ${props => props.theme.colors.primary};
    border-top: 5px solid ${props => props.theme.colors.secondary};
    border-bottom: 5px solid ${props => props.theme.colors.secondary};
    animation: spin 1s linear infinite;
    margin-top: 20px;

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  }
}
`;

export default function Loading({height, width}: {height: string, width: string}) {

  return (
    <LoadingStyles>
      <section style={{
      height: height,
      width: width,
    }} className="loading">
        <h3>Carregando...</h3>
        <div className="circle-loading" />
      </section>
    </LoadingStyles>
  )
}