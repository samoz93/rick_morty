import { charactersRepository } from "../repositories";
import {
  afterEach,
  describe,
  expect,
  it,
  vi,
  test,
  beforeEach,
  Mock,
} from "vitest";
import { characterService, logService } from "../services";

vi.mock("../repositories");
vi.mock("../services/log.service.ts");

describe("CharacterService", () => {
  let service: any;

  beforeEach(() => {
    service = characterService;
  });

  it("should fetch character", async () => {
    const mockCharacter = { name: "Test", page: 1 };
    const mockData = {
      results: [mockCharacter],
      info: { next: 2, prev: null, count: 2, page: 1 },
    };

    (charactersRepository.fetchCharacter as Mock).mockResolvedValue(mockData);

    let result = await service.fetchCharacter("Test", 1);

    expect(result).toEqual([mockCharacter]);
    expect(service.nextPage).toEqual(2);
    expect(service.prevPage).toEqual(null);
  });

  it("should handle error when fetching character", async () => {
    const error = new Error("Test error");

    (charactersRepository.fetchCharacter as Mock).mockRejectedValue(error);

    await expect(service.fetchCharacter("Test", 1)).rejects.toThrow(error);
    expect(logService.logError).toHaveBeenCalledWith(error);
  });
});
