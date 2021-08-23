import NexaLight from "../assets/fonts/Nexa-Light.woff2";
import NexaBold from "../assets/fonts/Nexa-Bold.woff2";
import { createMuiTheme } from "@material-ui/core/styles";

const nexaLight = {
  fontFamily: "Nexa",
  fontStyle: "normal",
  fontDisplay: "swap",
  fontWeight: "400",
  src: `
   local('Nexa'),
   local('Nexa-Light'),
   url(${NexaLight}) format('woff2')
 `,
  unicodeRange:
    "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF",
};

const nexaBold = {
  fontFamily: "Nexa",
  fontStyle: "bold",
  fontDisplay: "swap",
  fontWeight: "800",
  src: `
   local('Nexa'),
   local('Nexa-Bold'),
   url(${NexaBold}) format('woff2')
 `,
  unicodeRange:
    "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF",
};

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#E86406",
      contrastText: "#fff ",
    },
    secondary: {
      main: "#FBBA00",
      contrastText: "#fff ",
    },
  },
  typography: {
    fontFamily: "Nexa",
    body1: {
      fontSize: 18,
    },
    body2: {
      fontSize: 16,
    },
    button: {
      fontSize: 18,
    },
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "@font-face": [nexaLight, nexaBold],
      },
    },
  },
});

export default theme;