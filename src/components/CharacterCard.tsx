import { Character, Episode } from '@/types/types';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import Image from 'next/image';

import DeleteCharacter from './DeleteCharacter';

type CharacterCardProps = {
  character: Character;
  refetchCharacters: () => void;
};

const CharacterCard = ({
  character,
  refetchCharacters,
}: CharacterCardProps) => {
  return (
    <Card className="relative w-[350px] h-[400px] bg-zinc-100">
      <CardHeader className="border-b-2 uppercase">
        <CardTitle className="flex gap-3 justify-between items-center">
          {character.id}. {character.name}
          <DeleteCharacter
            id={character.id}
            refetchCharacters={refetchCharacters}
          />
        </CardTitle>
      </CardHeader>
      <CardContent className="mt-4">
        <Image
          src={character.image}
          alt={character.name}
          width={0}
          height={0}
          sizes="100vw"
          className="w-full max-h-[200px] object-cover rounded-md px-1 "
        />
      </CardContent>
      <CardFooter className="flex flex-col">
        <p>Episodes</p>
        <select>
          {/* {character.episode.map((episode: string) => (
            <option key={episode}>{episode}</option> */}
          {character.episodes.map((episode: Episode) => (
            <option key={episode.id}>{episode.name}</option>
          ))}
        </select>
      </CardFooter>
    </Card>
  );
};

export default CharacterCard;
