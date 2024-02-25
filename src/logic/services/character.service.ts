import { ICharacter } from "../../types";
import { charactersRepository } from "../repositories";

class CharacterService {
  private characterRepository = charactersRepository;

  constructor() {}

  testing: ICharacter[] = [];
  async fetchCharacter(name: string): Promise<ICharacter[]> {
    // if (!this.testing.length)
    this.testing = await this.characterRepository.fetchCharacter(1, name);
    return this.testing;
  }
}

export const characterService = new CharacterService();
