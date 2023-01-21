import { dumpActivities } from './dumps/dump-activities';
import { dumpTeams } from './dumps/dump-teams';
import { Command, Option } from 'commander';
import { exit } from 'process';

import { FitnessWorldBookingClient } from './clients/fw-booking-client';
import { dumpCenters } from "./dumps/dump-centers";
import { getActivitiesFromIds, getCentersFromIds } from './helpers';

const _fwBookingClient = new FitnessWorldBookingClient();

const program = new Command();
program
  .name('fw-team-sniper')
  .description('CLI to snipe Fitness World teams')
  .addOption(new Option('-d, --dump <type>', 'dump type')
    .choices(['activities', 'centers', 'teams']))
  .addOption(new Option('-c, --centers <centers...>', 'specify center ids - get them -d centers'))
  .addOption(new Option('-c, --activities <activities...>', 'specify center ids - get them with -d activities'))

const run = async () => {
  program.parse();
  const options = program.opts();

  if (options.dump === 'activities') {
    dumpActivities()
  } else if (options.dump === 'centers') {
    dumpCenters();
  } else if (options.dump === 'teams') {
    dumpTeams();
  }

  if (options.centers || options.activities) {
    const activitiesResponse = await _fwBookingClient.getActivities();
    if (!activitiesResponse) {
      console.log('Could not reach Fitness World API');
      exit(1);
    }

    if (options.centers) {
      const targetCenters = getCentersFromIds(options.centers as string[], activitiesResponse.data);
    }
    if (options.activities) {
      const targetActivities = getActivitiesFromIds(options.activities as string[], activitiesResponse.data);
    }
  }
};

run();
