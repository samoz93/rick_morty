import React from "react";
import ReactDOM from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import App from "./App";
import { GlobalErrorComponent } from "./components";
import "./index.scss";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary
      fallbackRender={({ error, resetErrorBoundary }) => (
        <GlobalErrorComponent error={error}>
          <button onClick={resetErrorBoundary}>Try again</button>
        </GlobalErrorComponent>
      )}
    >
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
