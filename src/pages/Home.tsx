import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tailwind from "twrnc";
import CardContainer from "../components/Home/CardContainer";
import FilterContainer from "../components/Home/FilterContainer";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "../constants";
import { Params } from "../interface/NewsInterface";
import { getAllNews } from "../services/getAllNews";
import { getFilteredNews } from "../services/getFilteredNews";

const Home = () => {
  const [page, setPage] = useState<number>(DEFAULT_PAGE);
  const [perPage, setPerPage] = useState<number>(DEFAULT_PAGE_SIZE);
  const [filters, setFilters] = useState<Params>();

  const queryFn = filters
    ? () =>
        getFilteredNews({
          page: page,
          perPage: perPage,
          de: filters.de,
          ate: filters.ate,
          destaque: filters.destaque ? 1 : 0,
          introsize: filters.introsize,
          busca: filters.busca,
        })
    : () => getAllNews({ page: page, perPage: perPage });

  const { data, isLoading, isError } = useQuery({
    queryKey: ["news", page, perPage, filters],
    queryFn: queryFn,
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={tailwind`flex justify-center items-center w-full`}>
        <FlatList
          style={tailwind`w-full`}
          data={data?.items}
          ListHeaderComponent={() => (
            <FilterContainer setFilters={setFilters} />
          )}
          renderItem={({ item }) => {
            return (
              <CardContainer
                key={item.id}
                news={item}
                page={page}
                perPage={perPage}
              />
            );
          }}
          keyExtractor={(item) => item.id.toString()}
          ListFooterComponent={() => {
            return (
              data &&
              data?.count > 12 && (
                <Pressable
                  style={tailwind`bg-purple-950 w-full h-12 justify-center items-center mt-4`}
                  onPress={() => setPerPage(perPage + 12)}
                >
                  <Text style={tailwind`text-white text-lg font-bold`}>
                    Carregar mais
                  </Text>
                </Pressable>
              )
            );
          }}
        />
      </View>
      {/* <StatusBar style="auto" /> */}
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
