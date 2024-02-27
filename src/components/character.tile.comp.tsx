import { AnimatePresence, motion } from "framer-motion";
import { forwardRef, useEffect, useRef, useState } from "react";
//@ts-ignore
import SanitizedHTML from "react-sanitized-html";
import { TRANSITION_CONSTANTS } from "../constants";
import { highlightSearch } from "../logic/utils";
import { ICharacter } from "../types";
import css from "./character.tile.module.scss";

type CharacterTileProps = {
  character: ICharacter;
  onCharacterClick?: (character: { id: string; add: boolean }) => void;
  selected?: boolean;
  search?: string;
};
export const CharacterTile = forwardRef<HTMLDivElement, CharacterTileProps>(
  ({ character, onCharacterClick, search, selected }, ref) => {
    const [isSelected, setIsSelected] = useState(selected);
    const [fullScreen, setFullScreen] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    // Highlight the search term
    const characterName = highlightSearch(character.name, search);

    const handleClick = () => {
      onCharacterClick?.({ id: character.id, add: !isSelected });
      setIsSelected((selected) => !selected);
      // Correct tracking of the input focus
      inputRef.current?.focus();
    };

    // Handle dialog opening and closing
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
            className="absolute top-0 text-white left-0 h-full w-full flex justify-evenly flex-col  items-center z-10 bg-ricky-200/10 backdrop-blur-md"
            open={fullScreen}
          >
            <h1>{character.name}</h1>
            <motion.img
              initial={{ scale: 0.8, y: -300 }}
              animate={{ scale: 1, y: 0 }}
              className="h-2/3 object-contain rounded-3xl"
              src={character.image}
              alt={character.name}
            />
          </dialog>
        )}
        <motion.div
          whileInView={{ scale: 1 }}
          initial={{ scale: 0.8 }}
          viewport={{ amount: 0.1, once: true }}
          transition={TRANSITION_CONSTANTS}
          ref={ref}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleClick();
            }
          }}
          className={css.main}
          onClick={handleClick}
        >
          <div className={css.checkbox}>
            <input
              type="checkbox"
              className={css.checkbox_input}
              ref={inputRef}
            />
            <AnimatePresence>
              {selected && (
                <motion.img
                  initial={{ scale: 0 }}
                  animate={{ opacity: 1, scale: 1.1 }}
                  exit={{ scale: 0 }}
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
              height="7rem"
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
        </motion.div>
      </>
    );
  }
);
