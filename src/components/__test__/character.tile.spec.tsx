import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { CharacterTile } from "..";
import { ICharacter } from "../../types";

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
const mockOnCharacterClick = vi.fn();

describe("CharacterTile", () => {
  test("renders CharacterTile component", async () => {
    render(
      <CharacterTile
        character={mockCharacter}
        search="aaa"
        selected={false}
        key={mockCharacter.id}
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

  // test("renders CharacterTile component with initial props", () => {
  //   const mockOnCharacterClick = vi.fn();

  //   render(
  //     <CharacterTile
  //       character={mockCharacter}
  //       search={mockSearchTerm}
  //       selected={true}
  //       onCharacterClick={mockOnCharacterClick}
  //     />
  //   );

  //   // Assert that the component renders with the correct character name
  //   const nameElement = screen.getByText(mockSearchTerm, {
  //     normalizer: (text) => text.toLowerCase(),
  //   });
  //   expect(nameElement.tagName).toBe("STRONG");
  //   expect(nameElement.textContent).toBe(
  //     mockSearchTerm[0].toUpperCase() + mockSearchTerm.slice(1)
  //   );

  //   expect(nameElement).toBeInTheDocument();
  // });
});
