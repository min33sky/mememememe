'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { useElementSize } from 'usehooks-ts';

interface MemeDisplayProps {
  template: MemeTemplate;
  values: Record<string, string>;
}

/**
 * 완성된 밈을 보여주는 컴포넌트
 */
export default function MemeDisplay({ template, values }: MemeDisplayProps) {
  const [memeRef, { width }] = useElementSize();
  const ratio = width / template.background.width;
  const downloadRef = useRef<HTMLDivElement>(null);

  // const onButtonClick = useCallback(() => {
  //   if (downloadRef.current === null) {
  //     return;
  //   }

  //   toPng(downloadRef.current, { cacheBust: true })
  //     .then((dataUrl) => {
  //       const link = document.createElement('a');
  //       link.download = 'my-image-name.png';
  //       link.href = dataUrl;
  //       link.click();
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, [downloadRef]);

  console.log('너비: ', width);

  return (
    <div className="relative bg-blue-500 shadow-lg">
      <div ref={downloadRef} className="">
        <Image
          ref={memeRef}
          src={template.background.src}
          width={template.background.width}
          height={template.background.height}
          alt={template.background.alt}
          // style={{
          //   width: '100%',
          //   // maxWidth: '300px',
          //   // overflow: 'hidden',
          // }}
        />
        {template.textareas.map((textarea, index) => (
          <div
            key={index}
            className="align-center absolute flex items-center justify-center"
            style={{
              top: textarea.top * ratio,
              left: textarea.left * ratio,
              width: textarea.width * ratio,
              height: textarea.height * ratio,
            }}
          >
            <div
              className={`text-center ${
                textarea.outlineColor ?? 'black'
              }-contrast-outline`}
              style={{
                fontSize: textarea.size * ratio,
                lineHeight: '1.1',
                color: textarea.color ?? 'white',
              }}
            >
              {values[textarea.id] ?? textarea.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
