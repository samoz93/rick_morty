import { createExpect } from "vitest";
import { highlightSearch } from "../utils"; // Import your function
import { describe, expect, test } from "vitest";

describe("Utils test suite", () => {
  test("should highlight search term in text", () => {
    const text = "Test Text";

    // Case 1: Highlight search term in text
    const result1 = highlightSearch(text, "Te");
    expect(result1).toBe("<strong>Te</strong>st <strong>Te</strong>xt");

    // Case 2: No search term provided, should return original text
    const result2 = highlightSearch(text);
    expect(result2).toBe(text);

    // Case 3: No text provided, should return empty string
    const result3 = highlightSearch("", "Test");
    expect(result3).toBe("");

    // Case 4: No search term and no text provided, should return empty string
    const result4 = highlightSearch();
    expect(result4).toBe("");

    // Case 5: Case insensitive search
    const result5 = highlightSearch(text, "test");
    expect(result5).toBe("<strong>Test</strong> Text");
  });
});
