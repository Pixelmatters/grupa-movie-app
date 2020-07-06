
export interface IMovie {
    id: number;
    title: string;
    original_title: string;
    poster_path?: string;
    overview?: string; // about
    vote_average?: number //rating
  }
  
export interface ICast {
    name: string;
    character: string;
  }