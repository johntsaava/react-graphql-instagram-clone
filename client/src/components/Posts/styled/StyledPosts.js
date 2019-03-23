import styled from "styled-components";

export default styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  & > :nth-child(3n + 1) {
    margin: 4.5% 6% 4.5% 0;
  }
  & > :nth-child(3n + 2) {
    margin: 4.5% 3%;
  }
  & > :nth-child(3n + 3) {
    margin: 4.5% 0 4.5% 6%;
  }
`;
