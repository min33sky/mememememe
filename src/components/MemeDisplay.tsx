'use client';

import { toPng } from 'html-to-image';
import React from 'react';
import { useCallback, useRef } from 'react';
import { useElementSize } from 'usehooks-ts';

interface MemeDisplayProps {
  template: MemeTemplate;
  values: Record<string, string>;
}

/**
 * 완성된 밈을 보여주는 컴포넌트
 */
const MemeDisplay = React.forwardRef<HTMLButtonElement, MemeDisplayProps>(
  ({ template, values }, ref) => {
    const [memeRef, { width }] = useElementSize();
    const ratio = width / template.background.width;
    const downloadRef = useRef<HTMLDivElement>(null);

    const onButtonClick = useCallback(() => {
      if (downloadRef.current === null) {
        return;
      }

      toPng(downloadRef.current, {
        cacheBust: true,
      })
        .then((dataUrl) => {
          const link = document.createElement('a');
          link.download = 'my-image-name.png';
          link.href = dataUrl;
          link.click();
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);

    return (
      <div className="relative bg-blue-500 shadow-lg">
        <button ref={ref} hidden onClick={onButtonClick}>
          다운로드
        </button>
        <div ref={downloadRef} className="">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img ref={memeRef} src={template.background.src} alt="" />

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
  },
);

MemeDisplay.displayName = 'MemeDisplay';

export default MemeDisplay;
