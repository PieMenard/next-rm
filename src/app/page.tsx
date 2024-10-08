'use client';

import CharacterCard from '@/components/CharacterCard';
import Pagination from '@/components/Pagination';
import SearchBox from '@/components/SearchBox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Character } from '@/types/types';
import { LoaderPinwheelIcon } from 'lucide-react';
import { FormEvent, useEffect, useState } from 'react';

export default function Home() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, SetTotalPages] = useState(0);
  const [query, setQuery] = useState('');
  const [newSearch, setNewSearch] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchCharacters = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://rickandmortyapi.com/api/character?page=${page}&name=${newSearch}`
      );
      const data = await res.json();
      if (!data.error) {
        SetTotalPages(data.info.pages);

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
      } else {
        setCharacters([]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCharacters();
  }, [page, newSearch]);

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNewSearch(query);
  };

  return (
    <main className="text-center m-5">
      <div className="my-5 text-emerald-800">
        <h1 className="font-bold text-xl">The Characters of </h1>
        <h1 className="font-bold text-3xl">Rick and Morty</h1>
      </div>
      <SearchBox
        query={query}
        setQuery={setQuery}
        handleSearch={handleSearch}
      />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {characters.length === 0 && newSearch ? (
            <p>No results</p>
          ) : (
            <ul className="flex flex-wrap gap-4">
              {characters.map((character) => (
                <li key={character.id}>
                  <CharacterCard character={character} />
                </li>
              ))}
            </ul>
          )}
          <Pagination page={page} setPage={setPage} totalPages={totalPages} />
        </div>
      )}
    </main>
  );
}
