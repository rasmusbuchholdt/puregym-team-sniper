import { FitnessWorldBookingClient } from '../clients/fw-booking-client';
import { dumpTitle } from '../helpers';

const dumpActivities = async () => {
  const _fwBookingClient = new FitnessWorldBookingClient();
  const activitiesResponse = await _fwBookingClient.getActivities();
  
  activitiesResponse?.data.classes.map((category) => {
    dumpTitle(`Category: ${category.title}`);
    category.options
      .sort((a, b) => a.label.localeCompare(b.label))
      .map((activity) => console.log(`${activity.value} - ${activity.label}`));
  });
};
dumpActivities();
