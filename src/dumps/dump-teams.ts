import { FitnessWorldBookingClient } from '../clients/fw-booking-client';
import { dumpTitle, printTeam } from '../helpers';

export const dumpTeams = async () => {
  const _fwBookingClient = new FitnessWorldBookingClient();
  const teamsResponse = await _fwBookingClient.getTeams();

  teamsResponse.map((date) => {
    dumpTitle(`Date: ${date.date}`);
    date.items
      .sort((a, b) => a.location.localeCompare(b.location))
      .map((team) => printTeam(team));
  });
};