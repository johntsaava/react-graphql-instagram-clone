import styled from "styled-components";

export default styled.div`
  position: fixed;
  display: flex;
  top: 15%;
  bottom: 15%;
  left: 20%;
  right: 20%;
  z-index: 1;
  background-color: #fff;

  @media (max-width: 1000px) {
    top: 5%;
    bottom: 5%;
    left: 5%;
    right: 5%;
  }
  @media (max-width: 800px) {
    flex-direction: column;
  }
`;
