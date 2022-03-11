import * as React from "react";
import * as ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import "./index.css";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Example from "./Example";
import { GITHUB_REPO_PATH } from "./constants";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false
    }
  }
});

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path={`${GITHUB_REPO_PATH}`} element={<App />} />
          <Route path={`${GITHUB_REPO_PATH}/example`} element={<Example />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
