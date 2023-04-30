# Fitness World Team Sniper
Are you tired of missing out on popular Fitness World Teams? Well fear no more! 
This tool can be run with specific filters to automatically book teams for you, so you always have a spot.

## Getting started
The sniper only works as intended if it has access to your Fitness World account. Rename the ``.env.example`` to ``.env`` and fill in your login details, so it has access to your bookings.

## CLI Usage
Run the following command to get started with using the CLI:
``npm run cli``
This command should prompt you with the helper if you prefer that over this documentation.

### Dumping IDs
The CLI is able to drop 3 kinds of data from the Fitness World API:
```
npm run cli -- -d activities
npm run cli -- -d centers
npm run cli -- -d teams
```
You will be needing the activity and center IDs in your booking later.

### Booking
All these dumps contains IDs which are used in the sniper. Once you have gathered all the IDs for your favorite activities in your favorite centers, you can double check them with the following CLI commands:
```
# Get activities with IDs 64 and 131
npm run cli -- -a 64 131
# Get centers with IDs 115 and 116
npm run cli -- -c 115
# Get teams with ID 153b181168 (This one can take a while)
npm run cli -- -t 153b181168
# Getting centers and activities at the same time
npm run cli -- -c 115 -a 34941
```

If you want to see what teams these queries would resolve to then add the ``-s`` argument to your command. You can also use the optional ``-k`` keywords argument include teams matching all the keywords passed. If you don't want to risk booking a team within x hours then you can use the ``-g`` grace period argument to skip teams within the amount of hours specified:

```
# This will show all teams in center 115
npm run cli -- -c 115 -s
# This will show all teams in center 115 with activity id 34941
npm run cli -- -c 115 -a 34941 -s
# This will show all teams in center 115 with activity id 34941 containing Hans and 18:00
npm run cli -- -c 115 -a 34941 -s -k Hans 18:00
# This will show all teams in center 115 with activity id 34941 that are not within the next 72 hours
npm run cli -- -c 115 -a 34941 -s -g 72
```

The list printed out is all the teams that matches your query. If you actually want to commit to this list and book all the teams then you add the ``-b`` argument to your command like this:
```
# This will show all teams in center 115 with activity id 34941 and then book them
npm run cli -- -c 115 -a 34941 -s -b
```

You should now be signed up for all the teams!

If you happen to change your mind there is also a ``-u`` argument which unbooks the teams you are signed up for matching the query:
```
# This will show all teams in center 115 with activity id 34941 and then unbook them
npm run cli -- -c 115 -a 34941 -s -u
```

## Discord Webhooks
The sniper also supports sending out messages through Discord webhooks, simply fill out the ``DISCORD_WEBHOOK_URL`` in the ``.env`` file and it will submit bookings and unbookings directly to your Discord webhook. You do not have to use this, if you remove the variable it will simply not use Discord webhooks.