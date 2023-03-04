import { QueryClient } from "react-query";

export default new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      refetchOnWindowFocus: false
    }
  }
});
