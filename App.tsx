import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import HomeContainer from "./src/components/Home/HomeContainer";

export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <HomeContainer />
      <StatusBar style="auto" />
    </QueryClientProvider>
  );
}
