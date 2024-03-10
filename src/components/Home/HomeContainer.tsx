import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import tailwind from "twrnc";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "../../constants";
import { Params } from "../../interface/NewsInterface";
import { getAllNews } from "../../services/getAllNews";
import { getFilteredNews } from "../../services/getFilteredNews";
import CardContainer from "./CardContainer";
import FilterContainer from "./FilterContainer";

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

  return (
    <View style={tailwind`flex justify-center items-center w-full`}>
      <FlatList
        data={data?.items}
        ListHeaderComponent={() => <FilterContainer setFilters={setFilters} />}
        renderItem={({ item }) => {
          return <CardContainer key={item.id} news={item} />;
        }}
        keyExtractor={(item) => item.id.toString()}
        ListFooterComponent={() =>
          data &&
          data?.count > 12 && (
            <Pressable
              style={tailwind`bg-purple-950 w-full h-12 justify-center items-center mt-4`}
              onPress={() => setPerPage(perPage + 12)}
            >
              <Text style={tailwind`text-white text-lg font-bol`}>
                Carregar mais
              </Text>
            </Pressable>
          )
        }
      />
    </View>
  );
};

export default HomeContainer;
