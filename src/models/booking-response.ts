interface IBookingResponse {
  status: 'error' | 'success';
  participationId?: string;
  description?: string;
}
