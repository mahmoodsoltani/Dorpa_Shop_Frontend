export interface QueryOptions {
  pageNumber: number | null;
  pageSize: number | null;
  sortBy: string ;
  isAscending: boolean ;
  searchTerm: string | null;
  searchBy: string | null;
}
