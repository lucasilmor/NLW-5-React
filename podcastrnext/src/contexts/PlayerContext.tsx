import {createContext, ReactNode, useContext, useState} from 'react';


type Episode = {
    title:string;
    members:string;
    duration:number;
    thumbnail:string;
    url:string;
}

type PlayerContextData = {
    episodeList: Episode[];
    currentEpisodeIndex: number;
    isPlaying: boolean;
    play: (episode: Episode) => void;
    playList: (list: Episode[], index: number) => void;
    togglePlay: () => void;
    playNext: () => void;
    playPrevious: () => void;
    clearPlayerState: () => void;
    setPlayingState:(state: boolean) => void;
    hasNext: boolean,
    hasPrevious: boolean,
    isLooping,
    toggleLoop,
    isShuffling,
    toggleShuffle,
};


export const PlayerContext = createContext({} as PlayerContextData);

type PlayerContextProvider = {
    children: ReactNode;
}


export function PlayerContextProvider ({children}: PlayerContextProvider){
  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);

  
  function play(episode: Episode){
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  }

  function playList(list: Episode[], index: number){
      setEpisodeList(list);
      setCurrentEpisodeIndex(index);
      setIsPlaying(true);
  }

  const hasPrevious = currentEpisodeIndex > 0;
  const hasNext = isShuffling || (currentEpisodeIndex + 1) < episodeList.length

  function playNext(){
      if(isShuffling){
          const nextRandonEpisodeIndex = Math.floor(Math.random() * episodeList.length)

          setCurrentEpisodeIndex(nextRandonEpisodeIndex);
      }else if (hasNext){
        setCurrentEpisodeIndex(currentEpisodeIndex + 1);
      }
  }

  function clearPlayerState(){
      setEpisodeList([]);
      setCurrentEpisodeIndex(0);
  }

  function playPrevious(){
      if(hasPrevious){
          setCurrentEpisodeIndex(currentEpisodeIndex -1);
      }
  }

  function togglePlay(){
    setIsPlaying(!isPlaying); 
  }

  function toggleLoop(){
    setIsLooping(!isLooping); 
  }

  function toggleShuffle(){
    setIsShuffling(!isShuffling); 
  }

  function setPlayingState(state: boolean){
      setIsPlaying(state);
  }
  
  return (

    <PlayerContext.Provider value={{ 
        episodeList,
        currentEpisodeIndex, 
        playList,
        play, 
        isPlaying, 
        togglePlay,
        playNext,
        playPrevious, 
        setPlayingState,
        hasNext,
        hasPrevious,
        isLooping,
        toggleLoop,
        isShuffling,
        toggleShuffle,
        clearPlayerState,
        }}
     >
        {children}
    </PlayerContext.Provider>
    )
}

export const usePlayer = () =>{
    return useContext(PlayerContext);
}
