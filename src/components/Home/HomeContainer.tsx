import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "../../constants";
import { Params } from "../../interface/NewsInterface";
import { getAllNews } from "../../services/getAllNews";
import { getFilteredNews } from "../../services/getFilteredNews";
import CardContainer from "./CardContainer";

const HomeContainer = () => {
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

  console.log(data);
  return (
    <View style={styles.container}>
      <Text>Leslye linda e xerosa</Text>
      <FlatList
        data={data?.items}
        renderItem={({ item }) => <CardContainer key={item.id} news={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default HomeContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
