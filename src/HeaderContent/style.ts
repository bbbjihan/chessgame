import { TbArrowBack, TbLogout } from "react-icons/tb";
import styled from "styled-components";
import { alignCenter, responsive, size } from "../styles/macros";

export const HeaderWrap = styled.div`
  ${size(`100%`,`100%`)}
  ${alignCenter()}
`

export const HeaderContents = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  ${responsive('large')}{
    width: 46rem;
  }
`

export const HeaderLogo = styled.div`
  position:fixed;
  left: 40%;
  width: 20%;
  font-weight: bold;
  color: white;
  font-size: 1.5rem;
  ${alignCenter()}
`

export const BackButtonWrap = styled.div`
  position:fixed;
  left: 10%;
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

export const LogOutButtonWrap = styled.div`
  position:fixed;
  right: 10%;
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

export const BackButton = styled(TbArrowBack)`
  height: 1.5rem;
  width: 1.5rem;
`

export const LogOutButton = styled(TbLogout)`
  height: 1.5rem;
  width: 1.5rem;
`

export const HeaderButtonContent = styled.div`
  display: flex;
`

export const HeaderButtonString = styled.div`
  display: none;
  line-height: 1.5rem;
  font-weight: bold;
  margin-left: 0.5rem;
  ${responsive('large')}{
    display: inline;
  }
`