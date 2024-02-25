import { renderHook, act, Act } from "@testing-library/react-hooks";
import { useInfiniteLoader } from "../loader.hook";
import { describe, expect, test, vi } from "vitest";
import { ExpectedError } from "../../logic";

const mockData = ["data1", "data2"];
// Mocking the API call function
const mockApiCall = async () => Promise.resolve(mockData);

test("useInfiniteLoader hook should fetch data correctly", async () => {
  const { result, waitForNextUpdate } = renderHook(() =>
    useInfiniteLoader<string>()
  );

  // Initial state
  expect(result.current.isLoading).toBe(false);
  expect(result.current.isFetchingMore).toBe(false);
  expect(result.current.error).toBe(null);
  expect(result.current.data).toEqual([]);

  // Trigger fetch
  act(() => {
    result.current.fetch(mockApiCall());
  });

  // Loading state during fetch
  expect(result.current.isLoading).toBe(true);
  expect(result.current.isFetchingMore).toBe(false);
  expect(result.current.error).toBe(null);
  expect(result.current.data).toEqual([]);

  // Wait for the fetch to complete
  await waitForNextUpdate();

  // Final state after fetch
  expect(result.current.isLoading).toBe(false);
  expect(result.current.isFetchingMore).toBe(false);
  expect(result.current.error).toBe(null);
  expect(result.current.data).toEqual([...mockData]);

  // Trigger fetch more
  act(() => {
    result.current.fetchMore(mockApiCall());
  });

  // Loading state during fetch more
  expect(result.current.isLoading).toBe(false);
  expect(result.current.isFetchingMore).toBe(true);
  expect(result.current.error).toBe(null);
  expect(result.current.data).toEqual([...mockData]);

  await waitForNextUpdate();

  expect(result.current.isLoading).toBe(false);
  expect(result.current.isFetchingMore).toBe(false);
  expect(result.current.error).toBe(null);
  expect(result.current.data).toEqual([...mockData, ...mockData]);
});

test("useInfiniteLoader hook should handle expected errors correctly", async () => {
  const { result, waitForNextUpdate } = renderHook(() =>
    useInfiniteLoader<string>()
  );

  const error = new ExpectedError("Test Error");
  // Mock an API call that throws an error
  const mockErrorApiCall = async () => Promise.reject(error);

  // Trigger fetch with error
  act(() => {
    result.current.fetch(mockErrorApiCall());
  });

  // Loading state during fetch
  expect(result.current.isLoading).toBe(true);
  expect(result.current.isFetchingMore).toBe(false);
  expect(result.current.error).toBe(null);
  expect(result.current.data).toEqual([]);

  // Wait for the fetch to complete
  await waitForNextUpdate();

  // Final state after fetch with error
  expect(result.current.isLoading).toBe(false);
  expect(result.current.isFetchingMore).toBe(false);
  expect(result.current.error).toEqual(error);
  expect(result.current.data).toEqual([]);
});

// Add more tests as needed to cover different scenarios
