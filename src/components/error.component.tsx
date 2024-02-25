import React from "react";

export const ErrorComponents = ({
  error,
  children,
}: {
  error: any;
  children: React.ReactNode;
}) => {
  const isDev = false; //process.env.NODE_ENV === "development";
  console.log("error", error, isDev);

  return (
    <div className="flex flex-col justify-center h-full w-full gap-10">
      {isDev ? (
        <>
          <h1>Something went wrong!</h1>
          <pre>{error.message}</pre>
          <pre>{error.stack}</pre>
        </>
      ) : (
        <div>
          <h1>Something went wrong!</h1>
          <p>Try again later!</p>
        </div>
      )}
      {children}
    </div>
  );
};
