export default async function getMemeTemplates() {
  const memeTemplates: MemeTemplate[] = await fetch(
    'http://localhost:3000/api/meme-templates',
  ).then((res) => res.json());

  return memeTemplates;
}
