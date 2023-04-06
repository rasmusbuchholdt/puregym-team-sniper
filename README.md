# Fitness World Team Sniper
Are you tired of missing out on popular Fitness World Teams? Well fear no more! 
This tool can be run with specific filters to automatically book teams for you, so you always have a spot.

## CLI Usage
Run the following command to get started with using the CLI:
``npm run cli``
This command should prompt you with the helper if you prefer that over this documentation.

### Dumping IDs
The CLI is able to drop 3 kinds of data from the Fitness World API:
```bash
npm run cli -- -d activities
npm run cli -- -d centers
npm run cli -- -d teams
```
You will be needing the activity and center IDs in your booking later.

### Booking
All these dumps contains IDs which are used in the sniper. Once you have gathered all the IDs for your favorite activities in your favorite centers, you can double check them with the following CLI commands:
```bash
# Get activities with IDs 64 and 131
npm run cli -- -a 64 131
# Get centers with IDs 115 and 116
npm run cli -- -c 115
# Get teams with ID 153b181168 (This one can take a while)
npm run cli -- -t 153b181168
# Getting centers and activities at the same time
npm run cli -- -c 115 -a 34941
```

If you want to see what teams these queries would resolve to then add the ``-s`` argument to your command. You can also use the optional ``-k`` keyword argument to filter all the teams not containing the keyword:

```bash
# This will show all teams in center 115
npm run cli -- -c 115 -s
# This will show all teams in center 115 with activity id 34941
npm run cli -- -c 115 -a 34941 -s
# This will show all teams in center 115 with activity id 34941 containing 18:00
npm run cli -- -c 115 -a 34941 -s -k 18:00
```

The list printed out is all the teams that matches your query. If you actually want to commit to this list and book all the teams then you add the ``-b`` argument to your command like this:
```bash
# This will show all teams in center 115 with activity id 34941 and then book them
npm run cli -- -c 115 -a 34941 -s -b
```

You should now be signed up for all the teams!