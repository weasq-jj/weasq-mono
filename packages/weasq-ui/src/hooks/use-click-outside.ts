import { useEffect, useRef, type RefObject } from 'react';

export const useClickOutside = (ref: RefObject<HTMLElement | null>, callback: () => void, isEnabled = true) => {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!isEnabled) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (ref.current && event.target instanceof Node && !ref.current.contains(event.target)) {
        callbackRef.current();
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [isEnabled, ref]);
};
