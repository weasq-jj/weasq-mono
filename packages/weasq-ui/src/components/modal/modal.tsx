import { clsx } from 'clsx';
import type { ReactNode } from 'react';
import { useEffect, useRef } from 'react';
import { Icon } from '../icon';
import './modal.css';

export type ModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  closeLabel: string;
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
};

const Modal = ({ isOpen, closeModal, closeLabel, title, description, children, className }: ModalProps) => {
  const ref = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [isOpen]);

  return (
    <dialog
      ref={ref}
      onCancel={(event) => {
        event.preventDefault();
        closeModal();
      }}
      className={clsx('modal', className)}
    >
      <div className={clsx('modal__container')}>
        <div className={clsx('modal__header')}>
          <div className={clsx('modal__headline')}>
            {title ? <h2 className={clsx('modal__title')}>{title}</h2> : null}
            {description ? <p className={clsx('modal__description')}>{description}</p> : null}
          </div>
          <button type="button" onClick={closeModal} className={clsx('modal__close-button')} aria-label={closeLabel}>
            <Icon name="close" className={clsx('modal__close-icon')} decorative />
          </button>
        </div>
        <div className={clsx('modal__content')}>{children}</div>
      </div>
    </dialog>
  );
};

export { Modal };
