import { Command } from 'commander';
import { exit } from 'process';

import { FitnessWorldBookingClient } from './clients/fw-booking-client';
import { getActivitiesFromIds, getCentersFromIds } from './helpers';

const _fwBookingClient = new FitnessWorldBookingClient();

const program = new Command();
program
  .requiredOption('-c, --centers <centers...>', 'specify center ids - get them with npm run dump:centers')
  .requiredOption('-a, --activities <activities...>', 'specify activity ids - get them with npm run dump:activities');

const run = async () => {
  program.parse();
  const options = program.opts();
  const activitiesResponse = await _fwBookingClient.getActivities();

  if (!activitiesResponse) {
    console.log('Could not reach Fitness World API');
    exit(1);
  }

  const targetCenters = getCentersFromIds(options.centers as string[], activitiesResponse.data);
  const targetActivities = getActivitiesFromIds(options.activities as string[], activitiesResponse.data);
};

run();
