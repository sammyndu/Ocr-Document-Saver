export class ApiResponse<T> {
    content: T;
    error: Error
    requestId: string = "";
    isSuccess: boolean;
    responseTime: Date;
}