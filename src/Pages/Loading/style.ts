import { FaSpinner } from "react-icons/fa6";
import styled, { keyframes } from "styled-components";
import { alignCenter, responsive } from "../../styles/macros";

export const LoadingBG = styled.div`
  position: fixed;
  top: 0;
  background-color: rgba(0,0,0,0.6);
  width: 100%;
  height: 100%;
  z-index: 3;
  ${alignCenter()}
`

const rotation = keyframes`
    from{
        transform: rotate(0deg);
    }

    to{
        transform: rotate(360deg);
    }
`;

export const LoadingIcon = styled(FaSpinner)`
  width: 13%;
  height: 13%;
  color: white;
	animation: ${rotation} 2s linear infinite;
  ${responsive('large')}{
    width: 3rem;
    height: 3rem;
  }
`