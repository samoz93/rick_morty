import { renderHook, act } from "@testing-library/react-hooks";
import { MutableRefObject } from "react";
import { useHasFocus } from "../client.focus.hook";
import { describe, expect, test, vi } from "vitest";

// Mocking the HTMLElement and MouseEvent
const mockHtmlElement: HTMLElement = document.createElement("div");
const mockMouseEvent = new MouseEvent("mousedown", { bubbles: true });

test("useHasFocus hook should track focus correctly", () => {
  // Mocking the necessary functions
  const mockAddEventListener = vi.spyOn(document, "addEventListener");
  const mockRemoveEventListener = vi.spyOn(document, "removeEventListener");
  const mockRefRemoveEventListener = vi.spyOn(
    mockHtmlElement,
    "removeEventListener"
  );

  const mockRef: MutableRefObject<HTMLElement | null> = {
    current: mockHtmlElement,
  };

  const { result, unmount } = renderHook(() => useHasFocus(mockRef));

  // Assert that the event listener is added during initialization
  expect(mockAddEventListener).toHaveBeenCalledWith(
    "mousedown",
    expect.any(Function)
  );
  expect(mockRemoveEventListener).not.toHaveBeenCalled();

  // Trigger mousedown event outside the element
  act(() => {
    document.dispatchEvent(mockMouseEvent);
  });

  // Assert that hasFocus is false after the mousedown event
  expect(result.current[0]).toBe(false);

  // Trigger mouseenter event on the element
  act(() => {
    mockHtmlElement.dispatchEvent(
      new MouseEvent("mouseenter", { bubbles: true })
    );
  });

  // Assert that hasFocus is true after the mouseenter event
  expect(result.current[0]).toBe(true);

  // Trigger mouseleave event on the element
  act(() => {
    mockHtmlElement.dispatchEvent(
      new MouseEvent("mouseleave", { bubbles: true })
    );
  });

  // Assert that hasFocus is false after the mouseleave event
  expect(result.current[0]).toBe(false);

  // Trigger cleanup
  unmount();

  // Assert that the event listener is removed during cleanup
  expect(mockRemoveEventListener).toHaveBeenCalledWith(
    "mousedown",
    expect.any(Function)
  );
  expect(mockRefRemoveEventListener).toHaveBeenCalledTimes(2);
});

// Add more tests as needed to cover different scenarios
