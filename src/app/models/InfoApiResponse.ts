import { Movie } from "./Movie";

export interface InfoApiResponse {
    Provider: string;
    Movies: Movie[];
}