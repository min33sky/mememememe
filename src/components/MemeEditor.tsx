'use client';

import { useCallback, useMemo, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Select from 'react-select';
import MemeDisplay from './MemeDisplay';
import { PencilIcon } from '@heroicons/react/24/outline';
import { useModal } from '@/contexts/modalContext';

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
  console.log('templateId', templateId);

  const template = templates.find((template) => template.id === templateId)!;

  const values = watch('values');

  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const { openModal } = useModal();

  const onSubmit = async (data: {
    template: string;
    values: Record<string, string>;
  }) => {
    console.log('#### 만드는 중 ####');
    console.log('#### template: ', template);
    console.log('#### values: ', values);

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

      //? 모달 열기
      openModal();
    });
  };

  /**
   * 셀렉터 옵션
   */
  const selectorOptions = useMemo(() => {
    return templates.map((template) => ({
      value: template.id,
      label: template.id,
    }));
  }, [templates]);

  return (
    <div className="overflow-hidden">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid h-screen grid-cols-1 grid-rows-2 rounded-md bg-white px-2 shadow-lg md:grid-cols-3 md:grid-rows-1 md:gap-4"
      >
        <div className="flex items-center justify-center overflow-hidden md:col-span-2">
          <div className="w-2/3 md:w-4/5">
            <MemeDisplay template={template} values={values} />
          </div>
        </div>

        <div className="flex flex-col justify-between py-4">
          <div className="space-y-3">
            <h2 className="text-sm font-bold">원하는 템플릿을 선택하세요.</h2>
            <Select
              className="w-full text-slate-800"
              placeholder="원하는 템플릿을 선택하세요"
              isClearable
              isSearchable={false}
              options={selectorOptions}
              defaultValue={selectorOptions[0]}
              onChange={(option) => {
                if (!option) return;

                console.log('요시: ', option);
                setValue('template', option.value);
                setValue(
                  'values',
                  textValues(
                    templates.find((template) => template.id === option.value)!,
                  ),
                );
              }}
            />

            {/* 인풋 */}
            <div className="space-y-3">
              {template.textareas.map((textarea, index) => (
                <div key={index} className="space-y-1">
                  <label
                    htmlFor={textarea.id}
                    className="flex items-center space-x-1 text-xs font-bold md:text-sm"
                  >
                    <PencilIcon className="h-3 w-3" />
                    <span>{textarea.id.toUpperCase()}</span>
                  </label>
                  <input
                    {...register(`values.${textarea.id}`)}
                    id={textarea.id}
                    className="w-full border-b-2 bg-transparent text-base outline-none md:text-lg"
                    type="text"
                    placeholder="텍스트를 입력하세요."
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="">
            <button
              className="mt-5 w-full rounded-md bg-teal-600 py-4 font-bold text-white transition hover:bg-teal-700"
              type="submit"
              disabled={isPending}
            >
              {isPending ? '만드는 중...' : '만들기'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
