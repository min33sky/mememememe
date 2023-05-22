import MemeEditor from '@/components/MemeEditor';
import getMemeTemplates from './utils/getMemeTemplates';

export default async function Home() {
  const memeTemplates = await getMemeTemplates();

  return (
    <main className="mx-auto max-w-[1200px] px-4 md:px-0">
      <MemeEditor templates={memeTemplates} />
    </main>
  );
}
