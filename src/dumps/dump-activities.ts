import { PureGymBookingClient } from '../clients/pg-booking-client';
import { dumpTitle } from '../helpers';

export const dumpActivities = async (bookingClient: PureGymBookingClient) => {
  const activitiesResponse = await bookingClient.getActivities();

  activitiesResponse.classes.map((category) => {
    dumpTitle(`Category: ${category.title}`);
    category.options
      .sort((a, b) => a.label.localeCompare(b.label))
      .map((activity) => console.log(`${activity.value} - ${activity.label}`));
  });
};
