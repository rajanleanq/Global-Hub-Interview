import { QueryClient, QueryClientProvider, keepPreviousData } from "@tanstack/react-query";

const fiveMinutesinMs = 1000 * 60 * 5;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: fiveMinutesinMs,
      gcTime: fiveMinutesinMs,
      refetchOnWindowFocus: false,
      retry: false,
      placeholderData: keepPreviousData,
    },
  },
});

export default function ReactQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
