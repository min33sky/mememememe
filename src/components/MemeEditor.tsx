'use client';

import React from 'react';

const textValues = (template: MemeTemplate) =>
  template.textareas.reduce(
    (values, ta) => ({
      ...values,
      [ta.id]: ta.text,
    }),
    {} as Record<string, string>,
  );

interface MemeEditorProps {
  templates: MemeTemplate[];
}

export default function MemeEditor({ templates }: MemeEditorProps) {
  console.log(textValues(templates[2]));

  return <div>MemeEditor</div>;
}
