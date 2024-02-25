import to from "await-to-js";
import { ICharacter } from "../../types";
import { IPageInfo } from "../../types/page.interface";
import { charactersRepository } from "../repositories";
import { logService } from "./log.service";

class CharacterService {
  private characterRepository = charactersRepository;

  constructor() {}

  testing: ICharacter[] = [];
  pageInfo: IPageInfo | null = null;

  currentPage = 1;

  async fetchCharacter(name: string, page = 1): Promise<ICharacter[]> {
    const [err, data] = await to(
      this.characterRepository.fetchCharacter(page, name)
    );

    if (err) {
      logService.logError(err);
      throw err;
    }

    const { results, info } = data!;

    this.currentPage = page;
    this.pageInfo = info;
    return results || [];
  }

  get nextPage() {
    return this.pageInfo?.next;
  }

  get prevPage() {
    return this.pageInfo?.prev;
  }
}

export const characterService = new CharacterService();
