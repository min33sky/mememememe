/**
 * 배경 이미지 타입
 */
type MemeBackgroundImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

/**
 * 텍스트 영역 타입
 */
type MemeTextarea = {
  id: string;
  top: number;
  left: number;
  width: number;
  height: number;
  text: string;
  size: number;
  color?: string;
  outlineColor?: string;
};

/**
 * Meme 템플릿 타입
 */
type MemeTemplate = {
  id: string;
  background: MemeBackgroundImage;
  textareas: MemeTextarea[];
};

/**
 * Meme 타입
 */
type Meme = {
  id: string;
  template: string;
  values: Record<string, string>;
};
