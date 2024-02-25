import React from "react";
import ReactDOM from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import App from "./App";
import { ErrorComponents } from "./components/error.component";
import "./index.scss";

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
