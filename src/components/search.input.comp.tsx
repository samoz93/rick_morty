import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { CharacterChip } from "./character.chip.comp";
import css from "./search.input.module.scss";

export const SearchInput = ({
  dropDownIsActive,
  onSearchChanged,
  selectedItems,
  onItemRemoved,
  onKeyDown,
}: {
  dropDownIsActive: boolean;
  onSearchChanged: (search: string) => void;
  selectedItems: { id: string; name: string }[];
  onItemRemoved: (id: string) => void;
  onKeyDown: (search: string) => void;
}) => {
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    onSearchChanged(search);
  }, [search]);

  const inputCss = dropDownIsActive ? css.opened : css.closed;

  return (
    <div className={[css.search, inputCss].join(" ")}>
      <input
        type="text"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        onKeyDown={(e) => {
          console.log(e.key);

          if (e.key === "Enter") {
            onKeyDown(search);
          }
        }}
        placeholder="Search.."
        id="myInput"
        className="w-full p-2 h-full"
      />
      <div className={css.search_chips}>
        <AnimatePresence>
          {selectedItems.map((char) => {
            return (
              <CharacterChip
                id={char.id}
                onClick={(id) => {
                  onItemRemoved(id);
                }}
                name={char.name}
                key={char.id}
              />
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};
