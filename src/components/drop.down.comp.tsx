import { throttle } from "lodash";
import { useCallback, useEffect, useRef, useState } from "react";
import { useOutsideAlerter, useTrackFocus } from "../hooks";
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
  const hasData = chars.length > 0;

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

  const onChanged = (e: { id: string; isSelected: boolean }) => {
    if (e.isSelected) {
      setSelected([...selected, chars.find((char) => char.id === e.id)!]);
    } else {
      setSelected(selected.filter((char) => char.id !== e.id));
    }
  };

  const wrapperRef = useRef<HTMLDivElement>(null);
  const [hasFocus] = useOutsideAlerter(wrapperRef);

  // useEffect(() => {
  //   setIsDropOpened(hasFocus);

  //   // When drop down is closed, blur all elements to prevent focus trap and unwanted keyboard events
  //   if (!hasFocus) {
  //     blur();
  //   }
  // }, [hasFocus]);

  useEffect(() => {
    // Throttle the search to prevent too many requests
    throttled(search);
  }, [search]);

  // Setup focus tracking
  const [moveToNext, blur] = useTrackFocus();

  const dropDownCss = isDropOpened ? css.opened : css.closed;

  console.log("isDropOpened", isLoading);

  const getWaitingText = useCallback(() => {
    if (isLoading) {
      return "Look at m1! I am Mr. Meeseeks, I am searching the characters for you!";
    }
    if (!!error) {
      return "Oh Jeez!, Something bad happened, try again later";
    }
    return "No characters found";
  }, [isLoading, error]);

  return (
    <div className={css.section} ref={wrapperRef}>
      <SearchInput
        selectedItems={selected}
        onItemRemoved={(id) => {
          setSelected(selected.filter((char) => char.id !== id));
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
                onCharacterClick={onChanged}
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
