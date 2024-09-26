import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { MantineProvider, createTheme } from "@mantine/core";
import { RouterProvider } from "react-router-dom";

import "./index.css";
import "@mantine/core/styles.css";
import "@mantine/dropzone/styles.css";
import "react-toastify/dist/ReactToastify.css";
import "@mantine/notifications/styles.css";
import router from "./router/router.jsx";
import { RecoilRoot } from "recoil";

const theme = createTheme({
  breakpoints: {
    xs: "30em",
    sm: "48em",
    md: "64em",
    lg: "74em",
    xl: "90em",
  },
  autoContrast: true,
  luminanceThreshold: 0.7,
  // colors: {
  //   light: {
  //     body: "#ffffff",
  //   },
  //   dark: {
  //     body: "#000000", // Dark mode body color
  //   },
  // },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RecoilRoot>
      <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
        <RouterProvider router={router}>
          <App />
        </RouterProvider>
      </MantineProvider>
    </RecoilRoot>
  </React.StrictMode>
);
