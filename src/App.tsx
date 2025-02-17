import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import "./App.css";
import { DialogProvider } from "./context/dialogContext";
import { Routes } from "./router/routes";

const queryClient = new QueryClient();
const App: React.FC = () => {
  const router = createBrowserRouter(Routes);
  return (
    <DialogProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </DialogProvider>
  );
};

export default App;
