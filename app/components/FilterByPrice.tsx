import styled from "styled-components";

const AsideFilterByPrice = styled.aside`
  display: flex;
  flex-direction: column;
  width: 20%;
  flex-shrink: 1;
  background-color: ${props => props.theme.colors.background};
  padding: 20px;
  margin-right: 20px;
  margin-left: 20px;

  h3, p, label {
    padding-bottom: 20px;
  }

  form {
    display: flex;
    flex-direction: column;
      
    div {
      display: flex;
      padding-bottom: 5px;
    }

    label {
      padding-left: 10px;
    }
  }

  @media (max-width: 768px) {
    display: none;
  }

  @media (max-width: 1024px) {
    width: 100%;
    margin-right: 0;
  }
`;


export default function FilterByPrice() {
  return (
    <AsideFilterByPrice>
      <h3>Refine sua busca</h3>
      <p>Por Preço</p>
      <form>
        <div>
          <input type="radio" id="40" name="filter_by_price" value="40" />
          <label htmlFor="40">Até 40</label>
        </div>
        <div>
          <input type="radio" id="60" name="filter_by_price" value="60" />
          <label htmlFor="60">De 40 até 60</label>
        </div>
        <div>
          <input type="radio" id="200" name="filter_by_price" value="200" />
          <label htmlFor="200">De 100 até 200</label>
        </div>
        <div>
          <input type="radio" id="500" name="filter_by_price" value="500" />
          <label htmlFor="500">De 200 até 500</label>
        </div>
        <div>
          <input type="radio" id="1000" name="filter_by_price" value="1000" />
          <label htmlFor="1000">Acima de R$500</label>
        </div>
      </form>
    </AsideFilterByPrice>
  );
}