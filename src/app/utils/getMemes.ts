export default async function getMemes() {
  const memes: Meme[] = await fetch(`http://localhost:3000/api/memes`, {
    cache: 'no-store',
  }).then((res) => res.json());

  return memes;
}
