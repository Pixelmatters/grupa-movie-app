// Movies

export interface IMovie {
  id: number;
  title: string;
  original_title: string;
  poster_path?: string;
  overview?: string; // about
  vote_average?: number; //rating
}

export interface ICast {
  name: string;
  character: string;
}

// Authentication

export interface IRequestToken {
  success?: boolean;
  expires_at?: string;
  request_token?: string;
}

export interface ICreateSession {
  success?: boolean;
  session_id?: string;
}

export interface IDeleteSession {
  success?: boolean;
}
