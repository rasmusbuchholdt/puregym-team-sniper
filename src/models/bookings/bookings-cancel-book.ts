
// https://www.fitnessworld.com/dk/api/v1.0.0/bookings/cancelBook
export interface BookingsCancelBookRequest {
  participationId: string;
}

export interface BookingsCancelBookResponse {
  status: 'error' | 'success';
}