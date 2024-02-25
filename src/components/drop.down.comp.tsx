import { motion } from "framer-motion";
import { throttle } from "lodash";
import { useCallback, useEffect, useRef, useState } from "react";
import { useHasFocus, useTrackFocus } from "../hooks";
import { useInfiniteLoader } from "../hooks/loader.hook";
import { characterService } from "../logic/services";
import { ICharacter } from "../types";
import { CharacterTile } from "./character.tile.comp";
import { DataFetchingErrorComp } from "./data.fetching.error.comp";
import css from "./dropdown.module.scss";
import { LoaderLine } from "./loader.line";
import { SearchInput } from "./search.input.comp";
import { SimpleSpinner } from "./simple.spinner";

export const DropDown = () => {
  // Handle infinite scroll data + new search input
  // Fetch will trigger fetching new set of data
  // Fetch more will append to the current data
  const {
    isLoading,
    isFetchingMore,
    fetch,
    fetchMore,
    data: chars,
    error,
  } = useInfiniteLoader<ICharacter>();

  // Component state
  const [search, setSearch] = useState<string>("");
  const [selected, setSelected] = useState<ICharacter[]>([]);
  const [isDropOpened, setIsDropOpened] = useState<boolean>(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Computed properties
  // hasFocus is used to determine if the drop down should be opened (Hovering or clicking inside of the drop down)
  // moveToNext is used to move focus to the next element when deleting using key, minor UX improvement
  const [hasFocus] = useHasFocus(wrapperRef);
  const [moveToNext, blur] = useTrackFocus();

  // Intersection observer for infinite scroll
  const obsRef = useRef<HTMLDivElement>(null);

  // Throttle the search to prevent too many requests
  const throttled = useCallback(
    throttle(async (search) => {
      fetch(characterService.fetchCharacter(search, 1));
    }, 400),
    []
  );

  // Handle selection of characters
  const onSelectionChanged = (e: { id: string; add: boolean }) => {
    if (e.add) {
      setSelected([...selected, chars.find((char) => char.id === e.id)!]);
    } else {
      setSelected(selected.filter((char) => char.id !== e.id));
    }
  };

  // Handle drop down open/close
  useEffect(() => {
    setIsDropOpened(hasFocus);

    // When drop down is closed, blur all elements to prevent focus trap and unwanted keyboard events
    if (!hasFocus) {
      blur();
    }
  }, [hasFocus]);

  // Fetch new data when search changes
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
      window.removeEventListener("blur", onBlurHandler);
    };
  }, []);

  // Intersection observer for infinite scroll
  let fetching = false;
  useEffect(() => {
    const obs = new IntersectionObserver(
      async (entries) => {
        if (
          characterService.nextPage &&
          entries[0].isIntersecting &&
          !fetching
        ) {
          fetching = true;
          await fetchMore(
            characterService.fetchCharacter(
              search,
              characterService.currentPage + 1
            )
          );
          fetching = false;
        }
      },
      { threshold: 0.01 }
    );

    if (obsRef.current) {
      obs.observe(obsRef.current);
    }

    return () => {
      if (obsRef.current) obs.unobserve(obsRef.current!);
      obs.disconnect();
    };
  }, [obsRef]);

  // Render the drop down
  const dropDownCss = isDropOpened ? css.opened : css.closed;
  const hasData = chars.length > 0;

  return (
    <div className={css.section} ref={wrapperRef}>
      <SearchInput
        selectedItems={selected}
        onEnterPressed={() => {
          if (chars.length < 3 && chars.length > 0) {
            // Add/Remove first item for convenience
            const first = chars[0];
            const isSelected = selected.some((char) => char.id === first.id);
            onSelectionChanged({ id: first.id, add: !isSelected });
          }
        }}
        onItemRemoved={(id) => {
          onSelectionChanged({ id: id, add: false });
          // Move focus to the next element when deleting using key, minor UX improvement
          moveToNext();
        }}
        onSearchChanged={setSearch}
        dropDownIsActive={isDropOpened}
      />
      <LoaderLine hidden={!isLoading} />
      <motion.div className={[css.drop_down_wrapper, dropDownCss].join(" ")}>
        {error || !hasData ? (
          <DataFetchingErrorComp
            isLoading={isLoading}
            error={error}
            hasData={hasData}
          />
        ) : (
          chars.map((char) => {
            return (
              <CharacterTile
                search={search}
                onCharacterClick={onSelectionChanged}
                character={char}
                key={char.id}
                selected={selected.some((c) => c.id === char.id)}
              />
            );
          })
        )}
        {isFetchingMore && <SimpleSpinner />}
        <div className="h-10" ref={obsRef}></div>
      </motion.div>
    </div>
  );
};
