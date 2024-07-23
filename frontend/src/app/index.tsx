import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { MantineProvider } from "@mantine/core";

export const QLDHApp = () => {
  document.body.style.margin = "0";
  document.body.style.padding = "0";
  return (
    <MantineProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
};
