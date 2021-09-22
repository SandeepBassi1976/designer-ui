import styled from "@emotion/styled";
import MainNode from "../MainNode";
export const NodeWrapper = styled(MainNode)`
  background-color: ${(props) => props.background || "#36096d"};
  border: 1px solid white;
  font-size: 16px;
  min-width: 200px;
  transition: all 0.3s ease;
  &:hover {
    transform: scale(1.2);
  }
`;

export const InputLabel = styled.div`
  color: ${(props) => props.color || "aqua"};
`;
