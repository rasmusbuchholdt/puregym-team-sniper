
// https://www.fitnessworld.com/dk/api/v1.0.0/bookings/book
export interface BookingsBookRequest {
  activityId: number;
  bookingId: string;
}

export interface BookingsBookResponse {
  status: 'error' | 'success';
  participationId?: string;
  description?: string;
}
