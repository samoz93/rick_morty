import React, { useEffect, useRef } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useTrackFocus } from "../track.focus.hook";
import { describe, expect, test, vi } from "vitest";

// Sample component using the useTrackFocus hook
const TestComponent: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  useTrackFocus(ref.current, ["input", "button"]);

  return (
    <div ref={ref}>
      <input data-testid="1" type="text" tabIndex={1} />
      <button data-testid="2" tabIndex={2}>
        Button 1
      </button>
      <input data-testid="3" type="text" tabIndex={3} />
      <button data-testid="4" tabIndex={4}>
        Button 3
      </button>
    </div>
  );
};

// Sample component using the useTrackFocus hook
const TestComponent2: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [moveToNext, blur] = useTrackFocus(ref.current, ["input"]);

  return (
    <div ref={ref}>
      <input data-testid="1" type="text" tabIndex={1} />
      <button data-testid="2" tabIndex={2}>
        Button 1
      </button>
      <input data-testid="3" type="text" tabIndex={3} />
      <button data-testid="4" tabIndex={4}>
        Button 3
      </button>
    </div>
  );
};

test("useTrackFocus hook should move focus correctly", () => {
  render(<TestComponent />);

  // Initial focus on the first input element
  const el1 = screen.getByTestId("1");
  expect(document.activeElement).not.toBe(el1);

  // Press ArrowDown to move to the first button
  fireEvent.keyDown(document, { key: "ArrowDown" });
  expect(document.activeElement).toBe(el1);

  // Press ArrowRight to move to the next button
  fireEvent.keyDown(document, { key: "ArrowRight" });
  const el2 = screen.getByTestId("2");
  expect(document.activeElement).toBe(el2);

  // Press ArrowRight to move to the next input element
  fireEvent.keyDown(document, { key: "ArrowRight" });
  const el3 = screen.getByTestId("3");
  expect(document.activeElement).toBe(el3);

  // Press ArrowLeft to move back to the previous button
  fireEvent.keyDown(document, { key: "ArrowLeft" });
  expect(document.activeElement).toBe(el2);

  // Press ArrowUp to move back to the previous button
  fireEvent.keyDown(document, { key: "ArrowUp" });
  expect(document.activeElement).toBe(el1);
});

test("useTrackFocus hook should move focus correctly 2", () => {
  render(<TestComponent2 />);

  // Initial focus on the first input element
  const el1 = screen.getByTestId("1");
  expect(document.activeElement).not.toBe(el1);

  // Press ArrowDown to move to the first button
  fireEvent.keyDown(document, { key: "ArrowDown" });
  expect(document.activeElement).toBe(el1);

  // Press ArrowRight to move to the next button
  fireEvent.keyDown(document, { key: "ArrowRight" });
  const el2 = screen.getByTestId("2");
  const el3 = screen.getByTestId("3");
  expect(document.activeElement).not.toBe(el2);
  expect(document.activeElement).toBe(el3);

  // Should start from the beginning
  fireEvent.keyDown(document, { key: "ArrowRight" });
  expect(document.activeElement).toBe(el1);

  // Press ArrowLeft to move back to end (loop around)
  fireEvent.keyDown(document, { key: "ArrowLeft" });
  expect(document.activeElement).toBe(el3);
});
