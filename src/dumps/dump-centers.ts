import { FitnessWorldBookingClient } from '../clients/fw-booking-client';
import { dumpTitle } from '../helpers';

export const dumpCenters = async () => {
  const _fwBookingClient = new FitnessWorldBookingClient();
  const activitiesResponse = await _fwBookingClient.getActivities();
  
  activitiesResponse.centers.map((region) => {
    dumpTitle(`Region: ${region.label}`);
    region.options
      .sort((a, b) => a.label.localeCompare(b.label))
      .map((center) => console.log(`${center.value} - ${center.label}`));
  });
};