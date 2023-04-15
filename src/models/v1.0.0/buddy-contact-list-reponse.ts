// fetch('https://www.fitnessworld.com/dk/api/v1.0.0/buddies/contactlistphone', {
//   method: 'POST',
//   headers: {
//     'Accept': 'application/json, text/plain, */*',
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({ contacts: ['phonenumber'] })
// })
//   .then(response => response.json())
//   .then(data => { console.log(data); })

interface BuddyContactListResponse {
  data: Data;
  status: string;
}

interface Data {
  fwUsersUsingApp: FwUsersUsingApp[];
  fwUsersNeverLoggedIn: any[];
  notFwMember: any[];
}

interface FwUsersUsingApp {
  phone: string;
  friend_id: number;
  status: number;
}