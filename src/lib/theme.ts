import { createGlobalStyle } from "styled-components";

export const theme = {
  background: "#E6E9ED",
  primary: "#ef6c00",
  light: "#e2e2e2",
  text: "#0A2463",
  error: "#FB3640",
  border: "#0A2463",
  button: "#ef6c00",
  white: "#fff",
};

export const GlobalStyle = createGlobalStyle`

* {
  margin: 0;
    padding: 0;
};
@font-face {
  font-family: "Overpass";
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url("/fonts/overpass/overpass-regular.woff2") format("woff2");
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB,
    U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
  body {
    box-sizing: border-box;
    font-family: 'Overpass', sans-serif;
    background-color: ${theme.background};
  }

  h1 {
    font-family: 'Overpass';
  }
`;
