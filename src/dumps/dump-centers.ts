import { PureGymBookingClient } from '../clients/pg-booking-client';
import { dumpTitle } from '../helpers';

export const dumpCenters = async (bookingClient: PureGymBookingClient) => {
  const activitiesResponse = await bookingClient.getActivities();
  
  activitiesResponse.centers.map((region) => {
    dumpTitle(`Region: ${region.label}`);
    region.options
      .sort((a, b) => a.label.localeCompare(b.label))
      .map((center) => console.log(`${center.value} - ${center.label}`));
  });
};