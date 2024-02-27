import { MutableRefObject, useEffect, useState } from "react";

export const useHasFocus = (ref: MutableRefObject<HTMLElement | null>) => {
  const [hasFocus, setHasFocus] = useState<boolean>(false);
  useEffect(() => {
    // Probably I don't need this, as mouseenter/exit is enough, but why not!
    function handleClickOutside(event: MouseEvent) {
      const isClickOutside =
        ref.current && !ref!.current?.contains(event.target as Node);

      setHasFocus(!isClickOutside);
    }
    const handleFocus = () => {
      setHasFocus(true);
    };
    const handleBlur = () => {
      setHasFocus(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    ref.current?.addEventListener("mouseleave", handleBlur);
    ref.current?.addEventListener("mouseenter", handleFocus);
    window.addEventListener("blur", () => handleBlur);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      ref.current?.removeEventListener("mouseleave", handleBlur);
      ref.current?.removeEventListener("mouseenter", handleFocus);
      window.removeEventListener("blur", () => handleBlur);
    };
  }, [ref]);

  return [hasFocus];
};
