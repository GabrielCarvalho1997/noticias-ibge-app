import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FlatList, View } from "react-native";
import tailwind from "twrnc";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "../../constants";
import { Params } from "../../interface/NewsInterface";
import { getAllNews } from "../../services/getAllNews";
import { getFilteredNews } from "../../services/getFilteredNews";
import { Button } from "../ui/button";
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

  console.log(data);
  return (
    <View style={tailwind`flex justify-center items-center w-full`}>
      <FlatList
        data={data?.items}
        ListHeaderComponent={() => <FilterContainer />}
        renderItem={({ item }) => {
          return <CardContainer key={item.id} news={item} />;
        }}
        keyExtractor={(item) => item.id.toString()}
        ListFooterComponent={() =>
          data &&
          data?.count > 12 && (
            <Button onTouchEnd={() => setPerPage(perPage + 12)}>
              Ver mais
            </Button>
          )
        }
      />
    </View>
  );
};

export default HomeContainer;
