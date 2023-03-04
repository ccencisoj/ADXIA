import "../styles/globalStyles.scss";
import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "@fontsource/poppins/800.css";
import "@fontsource/poppins/900.css";
import 'react-loading-skeleton/dist/skeleton.css'

import { QueryClient, QueryClientProvider } from "react-query";
import { SkeletonTheme } from "react-loading-skeleton";
import { OrderProvider } from "~/contexts/orderContext";
import { SearchProvider } from "~/contexts/searchContext";
import { EmployeeProvider } from "~/contexts/employeeContext";

const MyApp = ({ Component, pageProps }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
        refetchOnWindowFocus: false
      }
    }
  });

  return (
    <QueryClientProvider client={queryClient}>
      <SkeletonTheme baseColor="#e5e5ee" highlightColor="#fff">
        <SearchProvider>
          <OrderProvider>
            <EmployeeProvider>
              <img src="/image/background1.svg" alt="background" className="background" />
              <div className="app">
                <Component {...pageProps} />
              </div>
            </EmployeeProvider>
          </OrderProvider>
        </SearchProvider>
      </SkeletonTheme>
    </QueryClientProvider>
  );
};

export default MyApp;
