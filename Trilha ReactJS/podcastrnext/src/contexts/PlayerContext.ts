import { createContext } from 'react';
//Pegando as informações do episodio para o player
type Episode = {
  title: string;
  members: string;
  thumbnail: string;
  duration: number;
  url: string;
};
type PlayerContextData = {
  episodeList: Episode[];
  currentEpisodeIndex: number;
  isPlaying: boolean;
  play: (episode: Episode) => void;
  togglePlay: () => void;
  setPlayingState: (state: boolean) => void;
};
export const PlayerContext = createContext({} as PlayerContextData);
