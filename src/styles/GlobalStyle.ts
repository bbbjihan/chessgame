import { createGlobalStyle } from "styled-components";
import { responsive } from "./macros";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    font-family: "Roboto";
  }
  html{
    ${responsive("small")} {
      font-size: 12px;
    }
    ${responsive("medium")} {
      font-size: 14px;
    }  
    ${responsive("large")} {
      font-size: 16px;
    }
  }

  body{
    height: 100vh;
    --color-wsh: #f0d9b5;
    --color-wdk: #b58863;
    --color-sh: rgb(238,238,210);
    --color-dk: rgb(118,150,86);
    --color-wddk: #341a0e;
    --color-wdnm: #4e2a1b;
    --color-wdsh: #ce8757;
    --color-wdbl: #040404;
    --font-size-xl: 1.5rem;
    --font-size-lg: 1.25rem;
    --font-size-md: 1rem;
    --font-size-sm: 0.875rem;
    --font-size-xs: 0.75rem;
    --font-size-xxs: 0.5rem;
  }
`