import { useCallback } from "react";

export const DataFetchingError = ({ error }: { error: any }) => {
  const getWaitingText = useCallback(() => {
    if (!!error) {
      return {
        text: "Something bad happened, try again later!",
        img: "phonix.webp",
      };
    }
    return {
      text: "AWWWWWWW!, I can't find this character!",
      img: "angry.png",
    };
  }, [error]);

  const { img, text } = getWaitingText();

  return (
    <div className="flex items-center flex-col justify-evenly h-full">
      <img src={img} alt="Mr. Meeseeks" className="h-1/2 rounded-3xl" />
      <p>{text}</p>
    </div>
  );
};
