import { MutableRefObject, useEffect, useState } from "react";

export const useOutsideAlerter = (
  ref: MutableRefObject<HTMLElement | null>
) => {
  const [hasFocus, setHasFocus] = useState<boolean>(true);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const isClickOutside =
        ref.current && !ref!.current?.contains(event.target as Node);

      setHasFocus(!isClickOutside);
    }
    const handleMouseEnter = () => {
      setHasFocus(true);
    };
    const handleMouseLeave = () => {
      setHasFocus(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    ref.current?.addEventListener("mouseleave", handleMouseLeave);
    ref.current?.addEventListener("mouseenter", handleMouseEnter);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      ref.current?.removeEventListener("mouseleave", handleMouseLeave);
      ref.current?.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [ref]);

  return [hasFocus];
};
