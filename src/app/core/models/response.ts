
export interface Response<T> {
  Count: number;
  Message: string;
  Results: T;
  SearchCriteria?: string;
}