import { Command, Option } from 'commander';
import * as dotenv from 'dotenv';
import { exit } from 'process';

import { FitnessWorldAuthenticationClient } from './clients/fw-auth-client';
import { FitnessWorldBookingClient } from './clients/fw-booking-client';
import { dumpActivities } from './dumps/dump-activities';
import { dumpCenters } from './dumps/dump-centers';
import { dumpTeams } from './dumps/dump-teams';
import { dumpTitle, getActivitiesFromIds, getCentersFromIds, getTeamsFromIds, getTeamsFromKeyword } from './helpers';

dotenv.config()

type ProgramOptions = {
  dump?: 'activities' | 'centers' | 'teams';
  activities?: string[];
  centers?: string[];
  teams?: string[];
  show?: boolean;
  book?: boolean;
  keyword?: string;
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
  .addOption(new Option('-b, --book', 'book the teams flag'))
  .addOption(new Option('-k, --keyword <keyword>', 'keyword for the team to include'));

const run = async () => {
  program.parse();
  const options = program.opts<ProgramOptions>();

  if (Object.values(options).length === 0) {
    program.help();
  }

  if (options.dump) {
    await handleDump(options);
    exit(1);
  }

  if (options.centers || options.activities || options.teams) {
    // Log in first
    const authCookie = await logIn();

    // Use the cookie whether its undefined or not, we can still look up teams 5 days ahead without authentication
    const _fwBookingClient = new FitnessWorldBookingClient(authCookie);

    const activitiesResponse = await _fwBookingClient.getActivities();
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
      const teamsResponse = await _fwBookingClient.getTeams();
      getTeamsFromIds(options.teams, teamsResponse);
    }

    const teamsResponse = await _fwBookingClient.getTeams(targetCenterIds, targetActivityIds);
    const targetTeams = getTeamsFromKeyword(options.keyword ?? '', teamsResponse, options.show);

    // We need an actual valid auth cookie to book
    if (options.book && authCookie) {
      dumpTitle(`Booking ${targetTeams.length} teams`);
      targetTeams.forEach(async team => {
        const result = await _fwBookingClient.bookTeam(team);
        if (result.status === 'success') {
          console.log(`Succesfully booked ${team.bookingId}`);
        } else if (result.status === 'error') {
          console.log(`Could not book ${team.bookingId} (${result.description})`);
        }
      });
    }
  }
};

const handleDump = async (options: ProgramOptions) => {
  switch (options.dump) {
    case 'activities':
      // TODO: Maybe pass cookie here so we get more than 5 days
      await dumpActivities()
      break;
    case 'centers':
      await dumpCenters()
      break;
    case 'teams':
      await dumpTeams()
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
