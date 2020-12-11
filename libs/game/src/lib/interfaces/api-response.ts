export interface ApiResponse {
    status: 'success' | 'fail' | 'error';
    data?: any;
    message?: string;
    code?: number;
}
