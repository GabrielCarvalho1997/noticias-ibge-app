import { useNavigation, useRoute } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import {
  Linking,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tailwind from "twrnc";
import {
  Card,
  CardContent,
  CardImage,
  CardText,
  CardTitle,
} from "../components/ui/card";
import { API_URL_IMAGE } from "../constants";
import { News } from "../interface/NewsInterface";
import { getAllNews } from "../services/getAllNews";

const NewsPage = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { id, page, perPage } = route.params as {
    id: number;
    page: number;
    perPage: number;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["filteredNews", id, page, perPage],
    queryFn: () => filterdNews(),
  });

  const filterdNews = async () => {
    const result = await getAllNews({
      page: Number(page),
      perPage: Number(perPage),
    });

    return result.items.find((news: News) => news.id === Number(id));
  };

  const images = data?.imagens ? JSON.parse(data.imagens) : [];

  const handlePress = () => {
    navigation.goBack();
  };

  if (!data) {
    return (
      <View style={tailwind`flex-1 justify-center items-center`}>
        <Pressable
          style={tailwind`bg-purple-950 p-4 rounded-md`}
          onPress={handlePress}
        >
          <Text style={tailwind`text-white text-lg font-bold`}>
            Erro ao carregar notícia, volte para a lista
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={tailwind`w-full`}>
        <Card style={tailwind`h-ful bg-purple-300 mx-4 mb-6 pb-2`}>
          <CardContent style={tailwind`gap-4`}>
            <CardImage
              style={tailwind`w-full rounded-lg`}
              source={{ uri: API_URL_IMAGE + images.image_fulltext }}
            />
            <CardTitle style={tailwind`text-purple-950`}>
              {data.titulo}
            </CardTitle>
            <CardText>
              Data de publicação: {data.data_publicacao.split(" ")[0]}
            </CardText>
            <CardText style={tailwind` text-justify`}>
              {data.introducao}
            </CardText>
            <TouchableOpacity onPress={() => Linking.openURL(data.link)}>
              <Text style={{ color: "blue", textDecorationLine: "underline" }}>
                Confira do site do IBGE
              </Text>
            </TouchableOpacity>
          </CardContent>
        </Card>
      </View>
    </SafeAreaView>
  );
};

export default NewsPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
