// Movies

export interface IMovie {
  id: number;
  title: string;
  original_title: string;
  poster_path?: string;
  overview?: string; // about
  vote_average?: number; //rating
  vote_count?: number;
  genres: Array<IGenre>;
  tagline: string; // Small catch phrase
  release_date: Date;
  runtime: number;
  rating?: number; // user rating
  vote_count: number;
}

export interface IGenre {
  id: number;
  name: string;
}
export interface ICast {
  cast_id: number;
  name: string;
  character: string;
  profile_path: string;
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

// Account

export interface IAddToWatchlist {
  media_type: string;
  media_id: number;
  watchlist: boolean;
}

export interface IMatchParameters {
  movieId: string;
}
