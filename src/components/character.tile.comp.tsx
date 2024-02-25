import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
//@ts-ignore
import SanitizedHTML from "react-sanitized-html";
import { ICharacter } from "../types";
import css from "./character.tile.module.scss";

export const CharacterTile = ({
  character,
  onCharacterClick,
  selected,
  search,
}: {
  character: ICharacter;
  onCharacterClick?: (character: { id: string; isSelected: boolean }) => void;
  selected?: boolean;
  search?: string;
}) => {
  const [isSelected, setIsSelected] = useState(false);

  const reg = new RegExp(search ?? "", "gi");

  const characterName = character.name.replace(
    reg,
    (match) => `<strong>${match}</strong>`
  );

  const handleClick = () => {
    onCharacterClick?.({ id: character.id, isSelected: !isSelected });
    setIsSelected((selected) => !selected);
  };

  return (
    <>
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
            className="h-full object-contain rounded-3xl"
            src={character.image}
            alt={character.name}
          />
        </div>
        <div className={css.title}>
          <h2>
            <SanitizedHTML allowedTags={["strong"]} html={characterName} />
          </h2>
          <h3>{character.episode.length} Episodes</h3>
        </div>
      </div>
    </>
  );
};
