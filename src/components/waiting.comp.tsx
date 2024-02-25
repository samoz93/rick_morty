import { useCallback } from "react";

const WaitingComponent = ({
  isLoading,
  error,
  hasData,
  children,
}: {
  isLoading: boolean;
  error: any;
  hasData: boolean;
  children: React.ReactNode;
}) => {
  const getWaitingText = useCallback(() => {
    if (isLoading) {
      return {
        text: "Look at m1! I am Mr. Meeseeks, I am searching the characters for you!",
        img: "Mr._Meeseeks.png",
      };
    }
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
  }, [isLoading, error]);

  return (
    <>
      {isLoading || error || !hasData ? (
        <div className="flex items-center flex-col justify-evenly h-[30rem]">
          <img
            src={getWaitingText().img}
            alt="Mr. Meeseeks"
            className="h-1/2 rounded-3xl"
          />
          <p>{getWaitingText().text}</p>
        </div>
      ) : (
        children
      )}
    </>
  );
};

export default WaitingComponent;
