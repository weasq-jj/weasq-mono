import { clsx } from 'clsx';
import spritePath from '../assets/icons/sprite.svg';

type SpriteModule = {
  src: string;
};

type IconProps = {
  name: string;
  className?: string;
  title?: string;
  spritePathOverride?: string;
  decorative?: boolean;
};

const resolveSpritePath = (value: string | SpriteModule) => {
  return typeof value === 'string' ? value : value.src;
};

export const Icon = ({ name, className, title, spritePathOverride, decorative }: IconProps) => {
  const resolvedSpritePath = spritePathOverride ?? resolveSpritePath(spritePath);
  const href = `${resolvedSpritePath}#icon-${name}`;
  const isDecorative = decorative ?? !title;

  return (
    <svg className={clsx(className)} aria-hidden={isDecorative || undefined} role={isDecorative ? undefined : 'img'}>
      {!isDecorative && title ? <title>{title}</title> : null}
      <use href={href} xlinkHref={href} width="100%" height="100%" />
    </svg>
  );
};
