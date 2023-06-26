import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
  }

  body{
    --color-wsh: #f0d9b5;
    --color-wdk: #b58863;
    --color-sh: rgb(238,238,210);
    --color-dk: rgb(118,150,86);
  }
`