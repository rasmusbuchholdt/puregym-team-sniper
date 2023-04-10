import { Command, Option } from 'commander';
import * as dotenv from 'dotenv';
import { exit } from 'process';

import { DiscordWebhookClient } from './clients/discord-webhook-client';
import { FitnessWorldAuthenticationClient } from './clients/fw-auth-client';
import { FitnessWorldBookingClient } from './clients/fw-booking-client';
import { dumpActivities } from './dumps/dump-activities';
import { dumpCenters } from './dumps/dump-centers';
import { dumpTeams } from './dumps/dump-teams';
import { dumpTitle, getActivitiesFromIds, getCentersFromIds, getTeamsFromIds, getTeamsFromKeyword, isWithinAllowedBookingDays } from './helpers';
import { ITeamWithDate } from './models/team-with-date';

dotenv.config();

type ProgramOptions = {
  dump?: 'activities' | 'centers' | 'teams';
  activities?: string[];
  centers?: string[];
  teams?: string[];
  show?: boolean;
  keywords?: string[];
  book?: boolean;
  unbook?: boolean;
}

const program = new Command();
program
  .name('fw-team-sniper')
  .description('CLI to snipe Fitness World teams')
  .addOption(new Option('-d, --dump <type>', 'dump type')
    .choices(['activities', 'centers', 'teams']))
  .addOption(new Option('-a, --activities <activities...>', 'specify activity ids - get them with -d activities'))
  .addOption(new Option('-c, --centers <centers...>', 'specify center ids - get them with -d centers'))
  .addOption(new Option('-t, --teams <teams...>', 'specify team ids - get them with -d teams'))
  .addOption(new Option('-s, --show', 'show the target teams'))
  .addOption(new Option('-k, --keywords <keywords...>', 'keywords that the team should include'))
  .addOption(new Option('-b, --book', 'book the teams flag'))
  .addOption(new Option('-u, --unbook', 'unbook the teams flag'));

const run = async () => {
  program.parse();
  const options = program.opts<ProgramOptions>();

  if (Object.values(options).length === 0) {
    program.help();
  }

  // Log in first
  const authCookie = await logIn();

  // Use the cookie whether its undefined or not, we can still look up teams 5 days ahead without authentication
  const fwBookingClient = new FitnessWorldBookingClient(authCookie);

  if (options.dump) {
    await handleDump(options, fwBookingClient);
    exit(1);
  }

  if (options.centers || options.activities || options.teams) {

    const activitiesResponse = await fwBookingClient.getActivities();
    if (!activitiesResponse) {
      console.log('Could not reach Fitness World API');
      exit(1);
    }

    const targetCenterIds: number[] = [];
    if (options.centers) {
      getCentersFromIds(options.centers, activitiesResponse)
        ?.map(e => targetCenterIds.push(+e.value));
    }

    const targetActivityIds: number[] = [];
    if (options.activities) {
      getActivitiesFromIds(options.activities, activitiesResponse)
        ?.map(e => targetActivityIds.push(+e.value));
    }

    if (options.teams) {
      const teamsResponse = await fwBookingClient.getTeams();
      getTeamsFromIds(options.teams, teamsResponse);
    }

    const teamsResponse = await fwBookingClient.getTeams(targetCenterIds, targetActivityIds);
    const targetTeams = getTeamsFromKeyword(options.keywords ?? [], teamsResponse, options.show);

    // We need an actual valid auth cookie to book or unbook
    if (!authCookie) return;

    const discordWebhookClient = new DiscordWebhookClient(process.env.DISCORD_WEBHOOK_URL);

    if (options.book) {
      await handleBooking(targetTeams, fwBookingClient, discordWebhookClient);
    }

    if (options.unbook) {
      await handleUnbooking(targetTeams, fwBookingClient, discordWebhookClient);
    }
  }
};

const handleBooking = async (teams: ITeamWithDate[], bookingClient: FitnessWorldBookingClient, webhookClient: DiscordWebhookClient) => {
  const searchDaysAllowed = await bookingClient.getSearchDaysAllowed();
  const notBookedTeams = teams.filter(e => e.team.participationId === null);
  dumpTitle(`Found ${teams.length} teams - (${teams.length - notBookedTeams.length}/${teams.length}) already booked`);
  for (let i = 0; i < notBookedTeams.length; i++) {
    const team = notBookedTeams[i];
    if (!isWithinAllowedBookingDays(team, searchDaysAllowed)) {
      console.log(`${team.team.bookingId} is not within the ${searchDaysAllowed} booking ahead limit`);
      continue;
    }
    const result = await bookingClient.bookTeam(team.team);
    if (result.status === 'success') {
      console.log(`Succesfully booked ${team.team.bookingId}`);
      await webhookClient.sendTeamMessage('Succesfully booked', '5763719', team);
    } else if (result.status === 'error') {
      console.log(`Could not book ${team.team.bookingId} (${result.description})`);
      await webhookClient.sendTeamMessage('Could not book', '15548997', team, result.description);
    }
  }
}

const handleUnbooking = async (teams: ITeamWithDate[], bookingClient: FitnessWorldBookingClient, webhookClient: DiscordWebhookClient) => {
  const bookedTeams = teams.filter(e => e.team.participationId !== null);
  dumpTitle(`Found ${bookedTeams.length} already booked teams`);
  for (let i = 0; i < bookedTeams.length; i++) {
    const team = bookedTeams[i];
    const result = await bookingClient.unbookTeam(team.team.participationId!);
    if (result.status === 'success') {
      console.log(`Succesfully unbooked ${team.team.bookingId}`);
      await webhookClient.sendTeamMessage('Succesfully unbooked', '5763719', team);
    } else if (result.status === 'error') {
      console.log(`Could not unbook ${team.team.bookingId}`);
      await webhookClient.sendTeamMessage('Could not unbook', '15548997', team);
    }
  }
}

const handleDump = async (options: ProgramOptions, bookingClient: FitnessWorldBookingClient) => {
  switch (options.dump) {
    case 'activities':
      await dumpActivities(bookingClient);
      break;
    case 'centers':
      await dumpCenters(bookingClient);
      break;
    case 'teams':
      await dumpTeams(bookingClient);
      break;
    default:
      console.log(`${options.dump} is not a valid type`);
      break;
  }
}

const logIn = async () => {
  const _fwAuthClient = new FitnessWorldAuthenticationClient();
  if (process.env.FITNESS_WORLD_EMAIL === undefined) {
    console.log("Missing email");
    return;
  }
  if (process.env.FITNESS_WORLD_PASSWORD === undefined) {
    console.log("Missing password");
    return;
  }
  const cookie = (await _fwAuthClient.logIn(
    process.env.FITNESS_WORLD_EMAIL,
    process.env.FITNESS_WORLD_PASSWORD)
  ) as string;
  if (cookie === undefined) return;
  const isValidCookie = await _fwAuthClient.checkLoggedin(cookie);

  if (isValidCookie) {
    console.log(`Logged in as ${process.env.FITNESS_WORLD_EMAIL}`);
  } else {
    console.log(`Could not log in as ${process.env.FITNESS_WORLD_EMAIL} - Booking is disabled and only able to query teams 5 days into the future`);
  }

  return isValidCookie ? cookie : undefined;
}

run();