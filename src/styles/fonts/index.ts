import { createGlobalStyle } from "styled-components";
import NotoSansKRBold from "./NotoSansKRBold.otf";
import NotoSansKRRegular from "./NotoSansKRRegular.otf";
import RobotoBold from "./RobotoBold.ttf";
import RobotoRegular from "./RobotoRegular.ttf";

export const GlobalFonts = createGlobalStyle`
  @font-face {
    font-family: "Noto Sans KR";
    src: url(${NotoSansKRBold}) format("otf");
    font-style: normal;
    font-wieght: bold;
  }

  @font-face {
    font-family: "Noto Sans KR";
    src: url(${NotoSansKRRegular}) format("otf");
    font-style: normal;
    font-weight: normal;
  }

  @font-face {
    font-family: "Roboto";
    src: url(${RobotoRegular}) format("truetype");
    font-style: normal;
    font-weight: normal;
  }

  @font-face {
    font-family: "Roboto";
    src: url(${RobotoBold}) format("truetype");
    font-style: normal;
    font-weight: bold;
  }
`