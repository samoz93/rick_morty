import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
//@ts-ignore
import SanitizedHTML from "react-sanitized-html";
import { ICharacter } from "../types";
import css from "./character.tile.module.scss";
import { useHasFocus } from "../hooks";

export const CharacterTile = ({
  character,
  onCharacterClick,
  selected,
  search,
}: {
  character: ICharacter;
  onCharacterClick?: (character: { id: string; add: boolean }) => void;
  selected?: boolean;
  search?: string;
}) => {
  const [isSelected, setIsSelected] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);

  const reg = new RegExp(search ?? "", "gi");
  const characterName = character.name.replace(
    reg,
    (match) => `<strong>${match}</strong>`
  );

  const handleClick = () => {
    onCharacterClick?.({ id: character.id, add: !isSelected });
    setIsSelected((selected) => !selected);
  };

  useEffect(() => {
    const onKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setFullScreen(false);
      }
    };
    document.addEventListener("keydown", onKeydown);
    return () => {
      document.removeEventListener("keydown", onKeydown);
    };
  }, []);

  return (
    <>
      {fullScreen && (
        <dialog
          onClick={() => setFullScreen(false)}
          className="absolute top-0 left-0 h-full w-full flex justify-evenly flex-col  items-center z-10 bg-ricky-200/10 backdrop-blur-md"
          open={fullScreen}
        >
          <h1>{character.name}</h1>
          <img
            className="h-2/3 object-contain rounded-3xl"
            src={character.image}
            alt={character.name}
          />
        </dialog>
      )}
      <div
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleClick();
          }
        }}
        className={css.main}
        onClick={handleClick}
      >
        <div className={css.checkbox}>
          <input type="checkbox" className={css.checkbox_input} />
          <AnimatePresence>
            {selected && (
              <motion.img
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                src="portal.png"
              />
            )}
          </AnimatePresence>
        </div>

        <div className="w-28 p-2">
          <img
            onClick={(e) => {
              e.stopPropagation();
              setFullScreen(true);
            }}
            className="h-full object-contain rounded-3xl"
            src={character.image}
            alt={character.name}
          />
        </div>
        <div className={css.title}>
          <h2>
            <SanitizedHTML
              allowedAttributes={{}}
              allowedTags={["strong"]}
              html={characterName}
            />
          </h2>
          <h3>{character.episode.length} Episodes</h3>
        </div>
      </div>
    </>
  );
};
