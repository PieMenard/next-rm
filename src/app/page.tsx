'use client';

import CharacterCard from '@/components/CharacterCard';
import { Character } from '@/types/types';
import { useEffect, useState } from 'react';

export default function Home() {
  const [characters, setCharacters] = useState<Character[]>([]);

  const fetchCharacters = async () => {
    try {
      const res = await fetch('https://rickandmortyapi.com/api/character');
      const data = await res.json();

      const fetchDetails = data.results.map(async (character: any) => {
        const fetchEpisodes = character.episode.map(async (episode: any) => {
          const episodeResponse = await fetch(episode);
          const episodeData = await episodeResponse.json();
          return episodeData.name;
        });
        const episode_names = await Promise.all(fetchEpisodes);
        return {
          id: character.id,
          name: character.name,
          image: character.image,
          episode: episode_names,
        };
      });

      const charactersInfo = await Promise.all(fetchDetails);

      setCharacters(charactersInfo);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  return (
    <main className="text-center m-5">
      <div className="my-5 text-emerald-800">
        <h1 className="font-bold text-xl">The Characters of </h1>
        <h1 className="font-bold text-3xl">Rick and Morty</h1>
      </div>
      <div>
        <ul className="flex flex-wrap gap-4">
          {characters.map((character) => (
            <li key={character.id}>
              <CharacterCard character={character} />
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
