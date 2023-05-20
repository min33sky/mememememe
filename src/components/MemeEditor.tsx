'use client';

import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Select from 'react-select';
import MemeDisplay from './MemeDisplay';

const textValues = (template: MemeTemplate) =>
  template.textareas.reduce(
    (values, ta) => ({
      ...values,
      [ta.id]: ta.text,
    }),
    {} as Record<string, string>,
  );

interface IForm {
  template: string;
  values: Record<string, string>;
}

interface MemeEditorProps {
  templates: MemeTemplate[];
}

export default function MemeEditor({ templates }: MemeEditorProps) {
  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      template: templates[0].id,
      values: textValues(templates[0]),
    },
  });

  const templateId = watch('template');
  const template = templates.find((template) => template.id === templateId)!;

  const values = watch('values');

  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const onSubmit = async (data: {
    template: string;
    values: Record<string, string>;
  }) => {
    await fetch('http://localhost:3000/api/memes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        template: data.template,
        values: data.values,
      }),
    });
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid xs:grid-cols-1 md:grid-cols-[60%_40%] gap-4">
        <MemeDisplay template={template} values={values} />
        <div className="px-2">
          <select
            className="select select-bordered w-full"
            value={templateId}
            onChange={(evt) => {
              const newTemplate = templates.find(
                (template) => template.id === evt.target.value,
              )!;

              setValue('template', newTemplate.id);
              setValue('values', textValues(newTemplate));
            }}
          >
            <option disabled>Pick your template</option>
            {templates.map((template) => (
              <option key={template.id} value={template.id}>
                {template.id}
              </option>
            ))}
          </select>

          {/* 인풋 */}
          <div className="space-y-4">
            {template.textareas.map((textarea, index) => (
              <div key={index} className="space-y-1">
                <label htmlFor={textarea.id} className="text-sm">
                  {textarea.id}
                </label>
                <input
                  id={textarea.id}
                  className="w-full bg-transparent border-b outline-none"
                  type="text"
                  {...register(`values.${textarea.id}`)}
                />
              </div>
            ))}
          </div>

          <div className="flex justify-end">
            <button
              className="bg-teal-500 mt-5 w-full py-4 text-white hover:bg-teal-600 transition"
              type="submit"
              disabled={isPending}
            >
              {isPending ? '만드는 중...' : '만들기'}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
