export interface Message {
  message: string;
}

export interface ApiResponse<T> {
  status: string;
  data?: T;
  message?: string;
  code?: number;
}

export const STATUS_SUCCESS = 'success';
export const STATUS_FAIL = 'fail';
export const STATUS_ERROR = 'error';
