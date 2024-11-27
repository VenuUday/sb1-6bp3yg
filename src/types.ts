export interface Candidate {
  id: number;
  name: string;
  party: string;
  votes: number;
  image: string;
}

export interface User {
  id: string;
  email: string;
  user_metadata: {
    name: string;
  };
  hasVoted?: boolean;
}