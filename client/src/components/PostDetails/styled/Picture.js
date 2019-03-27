import styled from "styled-components";

export default styled.img`
  height: 100%;
  min-width: 50%;
  max-width: calc(100% - 300px);
  object-fit: contain;
  @media (max-width: 800px) {
    max-width: 100%;
    max-height: calc(100% - 200px);
  }
`;
