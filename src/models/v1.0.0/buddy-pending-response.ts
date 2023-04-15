// https://www.fitnessworld.com/dk/api/v1.0.0/buddies/pending
interface BuddyPendingResponse {
  data: Data;
  status: string;
}

interface Data {
  list: List[];
  list_outgoing: Listoutgoing[];
}

interface Listoutgoing {
  id: number;
  firstname: string;
  lastname: string;
  facebook_picture?: any;
  showUserPicture: boolean;
  uniqueid: number;
  created_at: string;
}

interface List {
  id: number;
  firstname: string;
  lastname: string;
  facebook_picture: string;
  showUserPicture: boolean;
  uniqueid: number;
  created_at: string;
}