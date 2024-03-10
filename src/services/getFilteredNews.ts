import { api } from ".";
import { PaginatedResponse } from "../interface/NewsInterface";

// Adicionando novos parâmetros de consulta
export interface Params {
  page: number;
  perPage: number;
  de?: string;
  ate?: string;
  destaque?: number;
  introsize?: number;
  busca?: string;
}

export const getFilteredNews = async (
  params: Params
): Promise<PaginatedResponse> => {
  const { page, perPage, de, ate, destaque, introsize, busca } = params;

  try {
    const { data } = await api.get<PaginatedResponse>("", {
      params: {
        page: page,
        qtd: perPage,
        de: de,
        ate: ate,
        destaque: destaque,
        introsize: introsize,
        busca: busca,
      },
    });
    return data;
  } catch (error) {
    console.error(`Failed to get filtered news: ${error}`);
    return {
      count: 0,
      page: 0,
      totalPages: 0,
      nextPage: 0,
      previousPage: 0,
      showingFrom: 0,
      showingTo: 0,
      items: [],
    };
  }
};
