import styled from "styled-components";
import { Input } from "antd";

export const CustomInput = styled(Input)`
  height: 37px; 
  font-size: 17px !important; 
  &::placeholder { color: rgba(164, 169, 178, 1) !important; 
  opacity: 1; }
`;