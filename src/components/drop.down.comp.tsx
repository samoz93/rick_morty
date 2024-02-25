import { throttle } from "lodash";
import { useCallback, useEffect, useRef, useState } from "react";
import { useHasFocus, useTrackFocus } from "../hooks";
import { useLoading } from "../hooks/loader.hook";
import { characterService } from "../logic/services";
import { ICharacter } from "../types";
import { CharacterTile } from "./character.tile.comp";
import css from "./dropdown.module.scss";
import { SearchInput } from "./search.input.comp";
import WaitingComponent from "./waiting.comp";
import to from "await-to-js";

export const DropDown = () => {
  const [chars, setChars] = useState<ICharacter[]>([]);
  const [search, setSearch] = useState<string>("");
  const [selected, setSelected] = useState<ICharacter[]>([]);
  const [isDropOpened, setIsDropOpened] = useState<boolean>(true);
  const [isLoading, error, load] = useLoading();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [hasFocus] = useHasFocus(wrapperRef);
  const [moveToNext, blur] = useTrackFocus();

  // Throttle the search to prevent too many requests
  const throttled = useCallback(
    throttle(async (search) => {
      const [err, data] = await to(
        load(characterService.fetchCharacter(search))
      );

      if (err) throw err;
      setChars(data || []);
    }, 400),
    []
  );

  const onSelectionChanged = (e: { id: string; isSelected: boolean }) => {
    if (e.isSelected) {
      setSelected([...selected, chars.find((char) => char.id === e.id)!]);
    } else {
      setSelected(selected.filter((char) => char.id !== e.id));
    }
  };

  useEffect(() => {
    setIsDropOpened(hasFocus);

    // When drop down is closed, blur all elements to prevent focus trap and unwanted keyboard events
    if (!hasFocus) {
      blur();
    }
  }, [hasFocus]);

  useEffect(() => {
    // Throttle the search to prevent too many requests
    throttled(search);
  }, [search]);

  // Close the drop down when the window is blurred
  useEffect(() => {
    const onBlurHandler = () => {
      setIsDropOpened(false);
    };
    window.addEventListener("blur", onBlurHandler);

    return () => {
      window.removeEventListener("pause", onBlurHandler);
    };
  }, []);

  // Setup focus tracking
  const dropDownCss = isDropOpened ? css.opened : css.closed;
  const hasData = chars.length > 0;

  return (
    <div className={css.section} ref={wrapperRef}>
      <SearchInput
        selectedItems={selected}
        onItemRemoved={(id) => {
          setSelected(selected.filter((char) => char.id !== id));
          // Move focus to the next element when deleting using key, minor UX improvement
          moveToNext();
        }}
        onSearchChanged={setSearch}
        dropDownIsActive={isDropOpened}
      />

      <div className={[css.drop_down_wrapper, dropDownCss].join(" ")}>
        <WaitingComponent isLoading={isLoading} error={error} hasData={hasData}>
          {chars.map((char) => {
            return (
              <CharacterTile
                search={search}
                onCharacterClick={onSelectionChanged}
                character={char}
                key={char.id}
                selected={selected.some((c) => c.id === char.id)}
              />
            );
          })}
        </WaitingComponent>
      </div>
    </div>
  );
};
