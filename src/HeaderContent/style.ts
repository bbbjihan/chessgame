import { TbLogout } from "react-icons/tb";
import styled from "styled-components";
import { alignCenter, responsive, size } from "../styles/macros";

export const HeaderWrap = styled.div`
  color: white;
  font-weight: bold;
  font-size: 1.5rem;
  ${size(`100%`,`100%`)}
  ${alignCenter()}
`

export const LogOutButtonWrap = styled.div`
  position: fixed;
  top: 1rem;
  right: 5%;
  height: 2rem;
  width: 2rem;
  border: 1px solid rgba(0,0,0,0);
  border-radius: 50%;
  cursor: pointer;
  ${alignCenter()}
  ${responsive('large')}{
    right: 10%;
    width: 7rem;
    border-radius: 0.5rem;
  }
  background-color: var(--color-sh);
  &:hover{
    background-color: var(--color-wdbl);
    color: var(--color-sh);
    border: 1px solid var(--color-sh);
    transition: 0.3s;
  }
`

export const LogOutButton = styled(TbLogout)`
  height: 1.5rem;
  width: 1.5rem;
`

export const LogOutButtonContent = styled.div`
  display: flex;
`

export const LogOutButtonString = styled.div`
  display: none;
  line-height: 1.5rem;
  font-weight: bold;
  margin-left: 0.5rem;
  ${responsive('large')}{
    display: inline;
  }
`