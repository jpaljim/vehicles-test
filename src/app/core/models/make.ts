import { MakeResult } from "./make-result";

export interface Make {
  Count: number;
  Message: string;
  SearchCriteria: null;
  Results: MakeResult[];
}

