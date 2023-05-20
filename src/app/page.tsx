import MemeDisplay from '@/components/MemeDisplay';
import MemeEditor from '@/components/MemeEditor';
import TempSelect from '@/components/TempSelect';

export default async function Home() {
  const memeTemplates: MemeTemplate[] = await fetch(
    'http://localhost:3000/api/meme-templates',
  ).then((res) => res.json());

  const memes: Meme[] = await fetch(`http://localhost:3000/api/memes`, {
    cache: 'no-store',
  }).then((res) => res.json());

  return (
    <main className="max-w-[1200px] mx-auto flex flex-col space-y-4">
      <TempSelect />
      <MemeEditor templates={memeTemplates} />

      <h2 className="text-3xl font-bold ">Memes</h2>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {memes.map((meme) => (
          <MemeDisplay
            key={meme.id}
            template={
              memeTemplates.find((template) => template.id === meme.template)!
            }
            values={meme.values}
          />
        ))}
      </div>
    </main>
  );
}
