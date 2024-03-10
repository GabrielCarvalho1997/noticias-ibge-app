export interface News {
  id: number;
  tipo: string;
  titulo: string;
  introducao: string;
  data_publicacao: string;
  produto_id: number;
  produtos: string;
  editorias: string;
  imagens: string;
  produtos_relacionados: string;
  destaque: boolean;
  link: string;
}

export interface PaginatedResponse {
  count: number;
  page: number;
  totalPages: number;
  nextPage: number;
  previousPage: number;
  showingFrom: number;
  showingTo: number;
  items: News[];
}

// Parametros de pesquisa
export interface Params {
  page: number;
  perPage: number;
  de?: string;
  ate?: string;
  destaque?: number;
  introsize?: number;
  busca?: string;
}
