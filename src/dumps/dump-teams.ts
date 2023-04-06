import { FitnessWorldBookingClient } from '../clients/fw-booking-client';
import { dumpTitle, printTeam } from '../helpers';

export const dumpTeams = async (bookingClient: FitnessWorldBookingClient) => {
  const teamsResponse = await bookingClient.getTeams();

  teamsResponse.map((date) => {
    dumpTitle(`Date: ${date.date}`);
    date.items
      .sort((a, b) => a.location.localeCompare(b.location))
      .map((team) => printTeam({
        date: date.date,
        team
      }));
  });
};