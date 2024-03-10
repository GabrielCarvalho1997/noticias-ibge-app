import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SafeAreaView, StyleSheet } from "react-native";
import HomeContainer from "./src/components/Home/HomeContainer";

export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={styles.container}>
        <HomeContainer />
        {/* <StatusBar style="auto" /> */}
      </SafeAreaView>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
