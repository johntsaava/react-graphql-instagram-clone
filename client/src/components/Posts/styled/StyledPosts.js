import styled from "styled-components";

export default styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 10px;
  @media (max-width: 550px) {
    padding: 5px;
  }
`;
