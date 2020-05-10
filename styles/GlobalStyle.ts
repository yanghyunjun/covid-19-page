import reset from "styled-reset";
import { createGlobalStyle, css } from "styled-components";

const globalstyles = css`
  ${reset}
  body {
    min-height: 100vh;
    line-height: 1.2;
    margin: 0px;
  }
  li {
    list-style-type: disc;
    list-style-position: inside;
  }
`;

const GlobalStyle = createGlobalStyle`
    ${globalstyles}
`;

export default GlobalStyle;
