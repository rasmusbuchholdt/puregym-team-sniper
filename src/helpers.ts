import { InvalidArgumentError } from 'commander';
import { differenceInMinutes } from 'date-fns';

import { IActivitiesResponse } from './models/activities-reponse';
import { ITeamWithDate } from './models/team-with-date';
import { ITeamsResponse } from './models/teams-response';

export function parseCookieHeaders(cookieHeaders: string[]) {
  // Input example:
  // [
  //   'fw_member=1; path=/',
  //   'LONG_STRING=ANOTHER_LONG_STRING; expires=Fri, 10-Feb-2023 01:10:28 GMT; Max-Age=2000000; path=/; domain=.www.fitnessworld.com; secure; HttpOnly'
  // ]
  // console.log(cookieHeaders);
  
  return (
    cookieHeaders
      // Cookie that contains "expires="
      .filter((e) => e.includes('expires='))[0]
      // We only want the first part (LONG_STRING and ANOTHER_LONG_STRING)
      .split(';')[0]
  );
  // Results in: LONG_STRING=ANOTHER_LONG_STRING
}

export function getFakeHeaders() {
  return {
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:108.0) Gecko/20100101 Firefox/108.0',
    Accept:
      'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.5',
    'Accept-Encoding': 'gzip, deflate, br',
    'Content-Type': 'application/x-www-form-urlencoded',
    Origin: 'https://www.puregym.dk',
    Connection: 'keep-alive',
    Referer: 'https://www.puregym.dk/dk2/',
    'Upgrade-Insecure-Requests': '1',
    'Sec-Fetch-Dest': 'document',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-Site': 'same-origin',
    'Sec-Fetch-User': '?1',
    DNT: '1',
    'Sec-GPC': '1',
    Pragma: 'no-cache',
    'Cache-Control': 'no-cache',
    TE: 'trailers',
  };
}

export function dumpTitle(title: string) {
  console.log('#############################');
  console.log(title);
  console.log('#############################');
}

export function getCentersFromIds(ids: string[], activitiesResponse: IActivitiesResponse) {
  const allCenters = activitiesResponse.centers.flatMap((region) =>
    region.options.map((center) => center)
  );

  const selectedCenters = allCenters
    .filter((center) => ids.includes(center.value))
    .map((center) => center);

  if (selectedCenters === undefined || selectedCenters.length === 0) {
    console.log('Did not find any centers matching', ids);
    return;
  }

  dumpTitle('Target centers');
  selectedCenters.map((center) =>
    console.log(`${center.value}: ${center.label}`)
  );

  return selectedCenters;
}

export function getActivitiesFromIds(ids: string[], activitiesResponse: IActivitiesResponse) {
  const allActivities = activitiesResponse.classes.flatMap((category) =>
    category.options.map((activity) => activity)
  );

  const selectedActivities = allActivities
    .filter((activity) => ids.includes(activity.value))
    .map((activity) => activity);

  if (selectedActivities === undefined || selectedActivities.length === 0) {
    console.log('Did not find any activities matching', ids);
    return;
  }

  dumpTitle('Target activities');
  selectedActivities.map((activity) =>
    console.log(`${activity.value}: ${activity.label}`)
  );

  return selectedActivities;
}

export function getTeamsFromIds(ids: string[], teamsResponse: ITeamsResponse[]) {
  const allTeams = teamsResponse.flatMap((date) =>
    date.items.map((team) => <ITeamWithDate>{
      date: date.date,
      team
    })
  );

  const selectedTeams = allTeams
    .filter((team) => ids.includes(team.team.bookingId))
    .map((team) => team);

  if (selectedTeams === undefined || selectedTeams.length === 0) {
    console.log('Did not find any teams matching', ids);
    return;
  }

  dumpTitle('Target teams');
  selectedTeams.map((team) =>
    printTeam(team)
  );

  return selectedTeams;
}

export function getTeamsFromKeyword(keywords: string[], teamsResponse: ITeamsResponse[], showResult?: boolean) {
  const allTeams = teamsResponse.flatMap((date) =>
    date.items.map((team) => <ITeamWithDate>{
      date: date.date,
      team
    })
  );

  const selectedTeams = allTeams
    .filter((teams) => keywords.every(e => JSON.stringify(teams).includes(e)))
    .map((teams) => teams);

  if (selectedTeams === undefined || selectedTeams.length === 0) {
    console.log(`Did not find any teams matching conditions`);
    return [];
  }

  if (showResult) {
    dumpTitle(`Target teams for booking ${keywords ? `matching keywords '${keywords}'` : ''}`);
    selectedTeams.map((team) =>
      printTeam(team)
    );
  }

  return selectedTeams;
}

export const printTeam = (team: ITeamWithDate) => {
  console.log(`${team.team.bookingId} - ${team.team.location} - ${team.team.title} /w ${team.team.instructor} @ ${team.date} ${team.team.startTime}-${team.team.endTime}`);
}

export const isWithinAllowedBookingDays = (team: ITeamWithDate, daysAllowed: number) => {
  const daysAllowedInMin = daysAllowed * 1440;
  const diffInMin = differenceInMinutes(new Date(`${team.date} ${team.team.startTime}`), new Date());
  return diffInMin < daysAllowedInMin;
}

export const parseIntOption = (input: string) => {
  const parsedValue = parseInt(input, 10);
  if (isNaN(parsedValue)) {
    throw new InvalidArgumentError('Not a number.');
  }
  return parsedValue;
}