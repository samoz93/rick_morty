import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { CharacterChip } from "../character.chip.comp";

describe("CharacterChip", () => {
  test("renders CharacterChip component", () => {
    const testName = "Test Name";
    const testId = "123";

    const mockOnClick = vi.fn();
    render(<CharacterChip name={testName} id={testId} onClick={mockOnClick} />);

    // Assert that the component renders with the correct name
    const nameElement = screen.getByText(testName);
    expect(nameElement).toBeDefined();

    // Assert that the button is rendered
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeDefined();

    // Simulate a button click and assert that the onClick function is called with the correct id
    fireEvent.click(buttonElement);
    expect(mockOnClick).toHaveBeenCalledWith(testId);
  });
});
