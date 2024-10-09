import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

async function seedDatabase() {
    const page = 1
    try {

        const res = await fetch(
            `https://rickandmortyapi.com/api/character?page=${page}`
        );
        const data = await res.json();
        const characters = data.results;

        for (const character of characters) {
            const fetchEpisodes = character.episode.map(async (episodeUrl: string) => {
                const episodeResponse = await fetch(episodeUrl);
                const episodeData = await episodeResponse.json();
                return {
                    id: episodeData.id,
                    name: episodeData.name,
                }
            })
            const episodes = await Promise.all(fetchEpisodes)

            await prisma.character.create({
                data: {
                    id: character.id,
                    name: character.name,
                    image: character.image,
                    episodes: {
                        connectOrCreate: episodes.map((episode) => ({
                            where: { id: episode.id },
                            create: {
                                id: episode.id,
                                name: episode.name
                            }
                        }))
                    }
                }
            })
        }
        console.log('database seeded succesfully')
    } catch (error) {
        console.log('Error seeding database :', error)
    }
    finally {
        await prisma.$disconnect();
    }
}

seedDatabase();