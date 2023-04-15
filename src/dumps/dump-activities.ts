import { FitnessWorldBookingClient } from '../clients/fw-api-client';
import { dumpTitle } from '../helpers';

export const dumpActivities = async (bookingClient: FitnessWorldBookingClient) => {
  const activitiesResponse = await bookingClient.getActivities();

  activitiesResponse.classes.map((category) => {
    dumpTitle(`Category: ${category.title}`);
    category.options
      .sort((a, b) => a.label.localeCompare(b.label))
      .map((activity) => console.log(`${activity.value} - ${activity.label}`));
  });
};
