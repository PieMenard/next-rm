import { Character, Episode } from '@/types/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import Image from 'next/image';

const CharacterCard = ({ character }: { character: Character }) => {
  return (
    <Card className="w-[350px] h-[380px] bg-zinc-100">
      <CardHeader className="border-2 uppercase">
        <CardTitle>
          {character.id}. {character.name}
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
          {character.episode.map((episode: string) => (
            <option>{episode}</option>
          ))}
        </select>
      </CardFooter>
    </Card>
  );
};

export default CharacterCard;
