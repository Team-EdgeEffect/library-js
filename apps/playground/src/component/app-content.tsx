import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactNode } from "react";
import { Outlet } from "react-router";

const queryClient = new QueryClient();
export const AppContent = ({ children }: { children?: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <Outlet />
      {children}
    </QueryClientProvider>
  );
};
