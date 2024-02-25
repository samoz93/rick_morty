export interface ICharacter {
  id: string;
  name: string;
  image: string;
  episode: IEpisode[];
}

interface IEpisode {
  id: string;
  name: string;
  episode: string;
}
