export interface ICharacter {
  id: string;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  image: string;
  episode: IEpisode[];
}

interface IEpisode {
  id: string;
  name: string;
  episode: string;
}
