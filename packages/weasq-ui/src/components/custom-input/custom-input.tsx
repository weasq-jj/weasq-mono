'use client';

import { clsx } from 'clsx';
import type { KeyboardEvent } from 'react';
import { useId } from 'react';
import { Icon } from '../icon';
import './custom-input.css';

export type CustomInputProps = {
  value: string;
  setValue: (value: string) => void;
  className?: string;
  label?: string;
  placeholder?: string;
  maxLength?: number;
  minLength?: number;
  icon?: string;
  isClearable?: boolean;
  onClear?: () => void;
  disabled?: boolean;
  autoFocus?: boolean;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
};

const CustomInput = ({
  value,
  setValue,
  className,
  label,
  placeholder,
  maxLength,
  minLength,
  icon,
  isClearable,
  onClear,
  disabled,
  autoFocus,
  onKeyDown,
}: CustomInputProps) => {
  const id = useId();
  const handleClear = () => {
    if (onClear) {
      onClear();
      return;
    }

    setValue('');
  };

  return (
    <div className={clsx('custom-input__container', className)}>
      {label && (
        <label htmlFor={id} className={clsx('custom-input__label')}>
          {label}
        </label>
      )}
      <div className={clsx('custom-input')}>
        {icon ? <Icon name={icon} className={clsx('custom-input__leading-icon')} decorative /> : null}
        <input
          id={id}
          className={clsx('custom-input__input')}
          type="text"
          placeholder={placeholder}
          value={value}
          maxLength={maxLength}
          minLength={minLength}
          onChange={(e) => setValue(e.target.value)}
          disabled={disabled}
          autoFocus={autoFocus}
          onKeyDown={onKeyDown}
        />
        {isClearable && value && (
          <button type="button" className={clsx('custom-input__clear')} onClick={handleClear} disabled={disabled}>
            <Icon name="close" className={clsx('custom-input__clear-icon')} decorative />
          </button>
        )}
      </div>
    </div>
  );
};

export { CustomInput };
