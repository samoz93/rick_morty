import { ICharacter } from "../../types";
import { IPageInfo } from "../../types/page.interface";
import { ExpectedError } from "../models";
import { client } from "./ql.client";
import { CHARACTER_QUERY } from "./queries.constant";

class CharactersRepo {
  characters: Set<ICharacter> = new Set();

  async fetchCharacter(page: number, name: string) {
    const data = await client.query<{
      characters: {
        results: ICharacter[];
        info: IPageInfo;
      };
    }>({
      query: CHARACTER_QUERY,
      variables: { page: page, name: name },
    });

    if (data.errors?.length) {
      // TODO: better parsing of errors
      throw new ExpectedError(data.errors[0].message, data.errors);
    }

    return data.data.characters;
  }
}

export const charactersRepository = new CharactersRepo();
export type ICharactersRepository = CharactersRepo;
