export interface MetaDataPaginationOptionsDto {
  page: number;
  total: number;
  nextPage: number | null;
  prevPage: number | null;
}

export interface PaginationOptionsDto {
  page: number;
  limit: number;
}
