import { clsx } from 'clsx';

interface IconProps {
  name: string;
  className?: string;
  title?: string;
  spritePath?: string;
}

export const Icon = ({ name, className, title, spritePath = '/icons/sprite.svg' }: IconProps) => {
  const href = `${spritePath}#${name}`;

  return (
    <svg className={clsx(className)} aria-hidden={title ? undefined : true} role={title ? 'img' : undefined}>
      {title ? <title>{title}</title> : null}
      <use href={href} />
    </svg>
  );
};
