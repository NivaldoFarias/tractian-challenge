import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { theme, StyledResets } from "./../styles";
import BundleProviders from "../contexts";
import Home from "../Pages/Home";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <StyledResets />
      <BundleProviders>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </BundleProviders>
    </ThemeProvider>
  );
}
