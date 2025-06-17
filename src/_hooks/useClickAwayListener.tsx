import { RefObject, useEffect } from "react";

export function useClickAwayListener<T extends HTMLElement | null>(ref: RefObject<T>, cb: () => void) {
  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      const isNode = event.target instanceof Node;
      if (ref.current && isNode && !ref.current.contains(event.target)) {
        cb();
      }
    }
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    }
  }, [cb])
};