export interface BookingsShowUpRequest {
  participationId: string;
}

export interface BookingsShowUpResponse {
  status: 'error' | 'success';
}
