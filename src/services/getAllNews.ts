import { api } from ".";
import { PaginatedResponse } from "../interface/NewsInterface";

interface Params {
  page: number;
  perPage: number;
}

export const getAllNews = async (
  params: Params
): Promise<PaginatedResponse> => {
  try {
    const { data } = await api.get<PaginatedResponse>("", {
      params: {
        page: params.page,
        qtd: params.perPage,
      },
    });
    return data;
  } catch (error) {
    console.error(`Failed to get all news: ${error}`);
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
