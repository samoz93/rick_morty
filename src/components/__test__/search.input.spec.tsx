import { render, screen, fireEvent } from "@testing-library/react";
import { SearchInput } from "../search.input.comp"; // Import your component
import { afterEach, describe, expect, it, vi, test } from "vitest";

const mockSelectedItems = [
  { id: "1", name: "Item 1" },
  { id: "2", name: "Item 2" },
];

test("renders SearchInput component", async () => {
  const mockOnSearchChanged = vi.fn();
  const mockOnItemRemoved = vi.fn();
  const mockOnEnterPressed = vi.fn();

  const { container } = render(
    <SearchInput
      dropDownIsActive={false}
      onSearchChanged={mockOnSearchChanged}
      selectedItems={mockSelectedItems}
      onItemRemoved={mockOnItemRemoved}
      onEnterPressed={mockOnEnterPressed}
    />
  );

  // Assert that the input element is rendered
  const inputElement = screen.getByPlaceholderText("Search..");
  expect(inputElement).toBeInTheDocument();

  // Assert that the selected items are rendered as chips
  mockSelectedItems.forEach((item) => {
    const chipElement = screen.getByText(item.name);
    expect(chipElement).toBeInTheDocument();
  });

  // Simulate a key press on the input element and assert that the onEnterPressed function is called
  fireEvent.keyDown(inputElement, { key: "Enter", code: "Enter" });
  expect(mockOnEnterPressed).toHaveBeenCalledWith("");

  // Simulate a change in the input value and assert that the onSearchChanged function is called
  fireEvent.change(inputElement, { target: { value: "New Search" } });
  expect(mockOnSearchChanged).toHaveBeenCalledWith("New Search");
});
