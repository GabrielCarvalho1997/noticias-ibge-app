import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./src/pages/Home";
import NewsPage from "./src/pages/News";

export default function App() {
  const queryClient = new QueryClient();
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="News" component={NewsPage} />
        </Stack.Navigator>
      </QueryClientProvider>
    </NavigationContainer>
  );
}
