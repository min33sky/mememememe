import MemeDisplay from '@/components/MemeDisplay';
import MemeEditor from '@/components/MemeEditor';

export default async function Home() {
  const memeTemplates: MemeTemplate[] = await fetch(
    'http://localhost:3000/api/meme-templates',
  ).then((res) => res.json());

  const memes: Meme[] = await fetch(`http://localhost:3000/api/memes`, {
    cache: 'no-store',
  }).then((res) => res.json());

  return (
    <main className="mx-auto flex max-w-[1200px] flex-col space-y-4">
      <MemeEditor templates={memeTemplates} />

      {/* TODO: 아래 부분 지우고 모달로 표시하기 */}

      <h2 className="text-3xl font-bold ">Memes</h2>

      <div className="grid gap-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
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
