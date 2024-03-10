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
    <Card style={tailwind`w-full max-w-sm`}>
      <CardContent style={tailwind`gap-1`}>
        <CardImage source={{ uri: API_URL_IMAGE + images.image_intro }} />
        <CardTitle>{news.titulo}</CardTitle>
        <CardText>{news.introducao}</CardText>
      </CardContent>
      <CardContent style={tailwind`gap-1`}>
        <CardText>
          Data de publicação: {news.data_publicacao.split(" ")[0]}
        </CardText>
      </CardContent>
    </Card>
  );
};

export default CardContainer;
