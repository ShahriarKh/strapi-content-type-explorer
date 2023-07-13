import styled from "styled-components";

export const RelationIndicator = styled.span`
  height: 20px;
  width: 20px;
  font-size: 12px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.theme.colors.neutral0};
  position: absolute;
  right: -32px;
  top: 0;
  bottom: 0;
  margin: auto;

  svg path {
    fill: ${(props) => props.theme.colors.buttonPrimary500};
  }
`;
