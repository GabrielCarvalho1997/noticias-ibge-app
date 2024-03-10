import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { Pressable } from "react-native";
import tailwind from "twrnc";
import { API_URL_IMAGE } from "../../constants";
import { News } from "../../interface/NewsInterface";
import { Card, CardContent, CardImage, CardText, CardTitle } from "../ui/card";

interface CardContainerProps {
  news: News;
  page: number;
  perPage: number;
}

type RootStackParamList = {
  News: { id: number; page: number; perPage: number };
  // outros nomes de tela aqui...
};

const CardContainer = ({ news, page, perPage }: CardContainerProps) => {
  const images = news.imagens ? JSON.parse(news.imagens) : [];
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, "News">>();

  const handlePress = () => {
    navigation.navigate("News", {
      id: news.id,
      page: page,
      perPage: perPage,
    });
  };

  return (
    <Pressable
      onPress={handlePress}
      style={tailwind`flex justify-center items-center`}
    >
      <Card style={tailwind`w-8/10 bg-purple-300 mx-4 my-8`}>
        <CardContent style={tailwind`gap-4 flex justify-center items-center`}>
          <CardImage
            resizeMode="contain"
            style={tailwind`w-60 h-40`}
            source={{ uri: API_URL_IMAGE + images.image_intro }}
          />
          <CardTitle style={tailwind`text-purple-950 text-sm`}>
            {news.titulo}
          </CardTitle>
          <CardText style={tailwind`text-justify text-xs`}>
            {news.introducao}
          </CardText>
          <CardText style={tailwind`text-justify text-xs`}>
            Data de publicação: {news.data_publicacao.split(" ")[0]}
          </CardText>
        </CardContent>
      </Card>
    </Pressable>
  );
};

export default CardContainer;
