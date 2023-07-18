export interface IHttpError {
  componentMessage: string;
  detailedMessage: string;
  statusCode: number;
  statusText: string;
  dataType: string;
}