import styled from "styled-components";

import * as Icons from "../../../../Icons";

export default styled(Icons.Like)`
  fill: ${props => (props.active ? "#e64855" : "none")};
  stroke: ${props => (props.active ? "#e64855" : "#262626")};
  height: 24px;
  cursor: pointer;
`;
