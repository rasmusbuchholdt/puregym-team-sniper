import { IActivitiesResponse } from './models/activities-reponse';

export function parseCookieHeaders(cookieHeaders: string[]) {
  // Input example:
  // [
  //   'fw_member=1; path=/',
  //   'LONG_STRING=ANOTHER_LONG_STRING; expires=Fri, 10-Feb-2023 01:10:28 GMT; Max-Age=2000000; path=/; domain=.www.fitnessworld.com; secure; HttpOnly'
  // ]
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
    Origin: 'https://www.fitnessworld.com',
    Connection: 'keep-alive',
    Referer: 'https://www.fitnessworld.com/dk2/',
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
    ?.filter((center) => ids.includes(center.value))
    .map((center) => center);

  if (selectedCenters === undefined || selectedCenters.length === 0) {
    console.log('Did not find any centers matching', ids);
    return;
  }

  dumpTitle('Target centers');
  selectedCenters?.map((center) =>
    console.log(`${center.value}: ${center.label}`)
  );

  return selectedCenters;
}

export function getActivitiesFromIds(ids: string[], activitiesResponse: IActivitiesResponse) {
  const allActivities = activitiesResponse.classes.flatMap((category) =>
    category.options.map((activity) => activity)
  );

  const selectedActivities = allActivities
    ?.filter((activity) => ids.includes(activity.value))
    .map((activity) => activity);

  if (selectedActivities === undefined || selectedActivities.length === 0) {
    console.log('Did not find any activities matching', ids);
    return;
  }

  dumpTitle('Target activities');
  selectedActivities?.map((activity) =>
    console.log(`${activity.value}: ${activity.label}`)
  );

  return selectedActivities;
}

export const useGetDates = () => {
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  return {
    today, tomorrow
  }
}