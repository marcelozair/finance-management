export interface MetaDataPaginationDto {
  page: number;
  total: number;
  nextPage: number | null;
  prevPage: number | null;
}
