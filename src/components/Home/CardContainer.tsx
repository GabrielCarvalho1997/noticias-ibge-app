import React from "react";
import tailwind from "twrnc";
import { API_URL_IMAGE } from "../../constants";
import { News } from "../../interface/NewsInterface";
import { Card, CardContent, CardImage, CardText, CardTitle } from "../ui/card";

interface CardContainerProps {
  news: News;
}

const CardContainer = ({ news }: CardContainerProps) => {
  const images = news.imagens ? JSON.parse(news.imagens) : [];

  return (
    <Card style={tailwind`bg-purple-300 mx-4 my-8 `}>
      <CardContent style={tailwind`gap-4`}>
        <CardImage source={{ uri: API_URL_IMAGE + images.image_intro }} />
        <CardTitle style={tailwind`text-purple-950`}>{news.titulo}</CardTitle>
        <CardText style={tailwind` text-justify`}>{news.introducao}</CardText>
      </CardContent>
      <CardContent>
        <CardText>
          Data de publicação: {news.data_publicacao.split(" ")[0]}
        </CardText>
      </CardContent>
    </Card>
  );
};

export default CardContainer;
