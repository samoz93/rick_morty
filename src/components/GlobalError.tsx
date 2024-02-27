import React from "react";
import { CONFIG } from "../config";

export const GlobalErrorComponent = ({
  error,
  children,
}: {
  error: any;
  children: React.ReactNode;
}) => {
  const isDev = CONFIG.isDev;

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
