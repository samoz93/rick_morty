import { render, screen, fireEvent } from "@testing-library/react";
import { CharacterTile } from "../character.tile.comp"; // Import your component
import { ICharacter } from "../../types";
import { afterEach, describe, expect, it, vi, test } from "vitest";

const mockCharacter: ICharacter = {
  id: "1",
  name: "Test Character",
  image: "test-image-url",
  episode: [
    { id: "1", name: "Test Episode", episode: "1" },
    { id: "2", name: "Test Episode 2", episode: "2" },
  ],
};

const mockSearchTerm = "test";

describe("CharacterTile", () => {
  test("renders CharacterTile component", () => {
    const mockOnCharacterClick = vi.fn();

    render(
      <CharacterTile
        character={mockCharacter}
        search=""
        selected={false}
        onCharacterClick={mockOnCharacterClick}
      />
    );

    // Assert that the component renders with the correct character name
    const nameElement = screen.getByText("Test Character");
    expect(nameElement).toBeInTheDocument();

    // Assert that the checkbox is rendered
    const checkboxElement = screen.getByRole("checkbox");
    expect(checkboxElement).toBeInTheDocument();

    // Simulate a click on the component and assert that the onCharacterClick function is called
    fireEvent.click(checkboxElement);
    expect(mockOnCharacterClick).toHaveBeenCalledWith({ id: "1", add: true });

    fireEvent.click(checkboxElement);
    expect(mockOnCharacterClick).toHaveBeenCalledWith({ id: "1", add: false });
  });

  test("renders CharacterTile component with initial props", () => {
    const mockOnCharacterClick = vi.fn();

    render(
      <CharacterTile
        character={mockCharacter}
        search={mockSearchTerm}
        selected={true}
        onCharacterClick={mockOnCharacterClick}
      />
    );

    // Assert that the component renders with the correct character name
    const nameElement = screen.getByText(mockSearchTerm, {
      normalizer: (text) => text.toLowerCase(),
    });
    expect(nameElement.tagName).toBe("STRONG");
    expect(nameElement.textContent).toBe(
      mockSearchTerm[0].toUpperCase() + mockSearchTerm.slice(1)
    );

    expect(nameElement).toBeInTheDocument();
  });
});