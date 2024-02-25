import { useEffect } from "react";

type IDir = 1 | -1;

export const useTrackFocus = (
  boundHtml?: HTMLElement | null,
  trackableElements = ["input", "button"]
) => {
  const findNextTabStop = (el: Element | null, dir: IDir) => {
    var universe = (boundHtml || document).querySelectorAll(
      trackableElements.join(", ")
    );
    var list = Array.prototype.filter.call(universe, function (item) {
      return item.tabIndex >= 0;
    });

    var index = list.indexOf(el);
    const nextIndex = index + dir;

    if (dir === 1 && nextIndex === list.length) {
      return list[0];
    } else if (dir === -1 && nextIndex === -1) {
      return list[list.length - 1];
    }
    return list[nextIndex];
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowDown":
        case "ArrowRight":
          moveToNext(1);
          break;
        case "ArrowUp":
        case "ArrowLeft":
          moveToNext(-1);
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  const moveToNext = (dir: IDir = 1) => {
    findNextTabStop(document.activeElement, dir).focus();
  };

  const blurAll = () => {
    // @ts-ignore
    document.activeElement?.blur();
  };

  return [moveToNext, blurAll];
};
