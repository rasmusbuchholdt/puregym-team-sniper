import { FitnessWorldBookingClient } from '../clients/fw-booking-client';
import { dumpTitle } from '../helpers';

const dumpTeams = async () => {
  const _fwBookingClient = new FitnessWorldBookingClient();
  const teamsResponse = await _fwBookingClient.getTeams();

  teamsResponse?.data.map((date) => {
    dumpTitle(`Date: ${date.date}`);
    date.items
      .sort((a, b) => a.location.localeCompare(b.location))
      .map((team) => console.log(`${team.location} - ${team.title} /w ${team.instructor} @ ${team.startTime}-${team.endTime}`));
  });
};
dumpTeams();
