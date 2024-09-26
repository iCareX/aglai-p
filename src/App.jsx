import { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

import "./App.css";
import { ToastContainer } from "react-toastify";

import MainHeader from "./components/layouts/header";
import MainSidebar from "./components/layouts/sidebar";
import { Flex, useMantineColorScheme } from "@mantine/core";

function App() {
  const { colorScheme } = useMantineColorScheme();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/" || location.pathname === "") navigate("/pdf_upload");
  }, [navigate, location.pathname]);

  // useEffect(() => {
  //   if (userToken) {
  //     if (location.pathname === "/" || location.pathname === "") navigate("/fast_assessment");
  //   } else {
  //     navigate("/login");
  //   }
  // }, [userToken, navigate, location.pathname]);

  return (
    <>
      <div
        className="App h-screen"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <MainHeader />
        <Flex h={"100%"}>
          <MainSidebar />
          <Outlet />
        </Flex>
        {/* <MainFooter /> */}
      </div>
      <ToastContainer
        position="top-right"
        limit={5}
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={colorScheme}
      />
    </>
  );
}

export default App;
