import { ApiResponse } from '@blitz-basic-script/api-interfaces';

export interface DocCache {
  route: string;
  params: object;
  data: ApiResponse<any>;
}
