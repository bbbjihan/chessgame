import styled from "styled-components";
import { size } from "../styles/macros";

export const AppWrap = styled.div`
  ${size(`100%`,`100%`)}
`

export const Header = styled.div`
  height: 4rem;
  width: 100%;
  background-color: var(--color-wdbl);
  z-index: 3;
  position: fixed;
  top: 0;
`

export const Body = styled.div`
  padding-top: 4rem;
  z-index: 1;
  background-color: var(--color-sh);
  width: 100%;
  min-height: 100vh;
`