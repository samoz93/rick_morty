import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.scss";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorComponents } from "./components/error.component";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary
      fallbackRender={({ error, resetErrorBoundary }) => (
        <ErrorComponents error={error}>
          <button onClick={resetErrorBoundary}>Try again</button>
        </ErrorComponents>
      )}
    >
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
