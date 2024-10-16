import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#4D32A3",
    },
    background: {
      default: "#F9F9F9",
    },
    text: {
      primary: "#666666",
      // secondary: "#333333",
    },
  },
  typography: {
    fontFamily: "Roboto",
    h1: {
      fontSize: "2.4rem",
      color: "#4D32A3",
      fontWeight: "bold",
      fontFamily: "Comfortaa",
    },
    h2: {
      fontSize: "2.2rem",
      color: "#4D32A3",
      fontWeight: "bold",
      fontFamily: "Roboto",
    },
    h3: {
        fontSize: "2rem",
        color: "#4D32A3",
        fontWeight: "bold",
        fontFamily: "Roboto",
        },
    h4: {
      fontSize: "2rem",
      color: "#666666",
      fontFamily: "Roboto",
    },
    h5: {
      fontSize: "1.6rem",
      color: "#333333",
      fontFamily: "Roboto",
    },
    body1: {
      fontSize: "1.4rem",
      color: "#4D32A3",
      fontFamily: "Roboto",
    },
    body2: {
      fontSize: "1.4rem",
      color: "#666666",
      fontFamily: "Roboto",
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          padding: "12pxs",
          gap: "1rem",
          borderRadius: "1.2rem",
          border: "#B0B0B0",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontSize: "1.4rem",
          fontWeight: "bold",
          border: "0 0 1px 0 solid #4D32A3",
        },
      },
    },
    MuiButton: {
      variants: [
        {
          props: { variant: "contained" },
          style: {
            fontSize: "1.4rem",
            // fontFamily: "Roboto",
            // gap: "0.8rem",
            // "&:hover": {
            //   backgroundColor: "white",
            //   boxShadow: "0 0 0 0",
            // },
            // "&.Mui-disabled": {
            //   backgroundColor: "#FFCBA0",
            //   color: "white",
            //   border: "none",
            // },
          },
        },
        {
          props: { variant: "outlined" },
          style: {
            fontSize: "1.4rem",
            color: "#4D32A3",
            fontFamily: "Roboto",
            backgroundColor: "white",
            textTransform: "none",
            padding: "0.8rem 1.6rem",
            borderRadius: "0.5rem",
            border: "1px solid #4D32A3",
            "&:hover": {
              backgroundColor: "#F2F2F2",
              border: "none",
            },
          },
        },
        {
            props: { variant: "text" },
            style: {
              fontSize: "1.4rem",
              color: "#666666",
              fontFamily: "Roboto",
              backgroundColor: "white",
              textTransform: "none",
              padding: "0.8rem 1.6rem",
              borderRadius: "0.5rem",
              border: "none",
              "&:hover": {
                backgroundColor: "#F2F2F2",
                border: "none",
              },
            },
        }
      ],
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: "0.8rem",
          fontSize: "1.4rem",
          padding: "1rem 1.6rem",
          whiteSpace: "nowrap",
          marginRight: "auto",
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          color: "white",
          fontSize: "1.4rem",
          padding: "0.8rem 1rem",
          borderRadius: "0.8rem",
        },
        arrow: {
          color: "#3C2386",
        },
      },
    },
  },
});

export default theme;