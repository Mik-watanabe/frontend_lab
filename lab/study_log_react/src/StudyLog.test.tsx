import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import StudyLog from "./StudyLog";
import { vi, test, expect, beforeEach } from "vitest";

type RecordItem = { id: number; title: string; hours: number };

let mockRecords: RecordItem[] = [];

const selectMock = vi.fn(async () => ({ data: mockRecords, error: null }));

const insertMock = vi.fn(async (payload: any) => {
  const record = Array.isArray(payload) ? payload[0] : payload;

  const newItem = {
    id: mockRecords.length ? Math.max(...mockRecords.map((r) => r.id)) + 1 : 1,
    title: record.title,
    hours: record.hours,
  };

  mockRecords = [...mockRecords, newItem];
  return { data: [newItem], error: null };
});

const deleteEqMock = vi.fn(async (_col: string, id: number) => {
  mockRecords = mockRecords.filter((r) => r.id !== id);
  return { error: null };
});

const deleteMock = vi.fn(() => ({
  eq: deleteEqMock,
}));

vi.mock("../utils/supabase", () => {
  return {
    default: {
      from: () => ({
        select: selectMock,
        insert: insertMock,
        delete: deleteMock,
      }),
    },
  };
});

beforeEach(() => {
  mockRecords = [];
  selectMock.mockClear();
  insertMock.mockClear();
  deleteMock.mockClear();
  deleteEqMock.mockClear();
});

async function setup(options?: { records?: RecordItem[] }) {
  if (options?.records) mockRecords = options.records;
  const user = userEvent.setup();
  render(<StudyLog />);

  await waitFor(() => expect(selectMock).toHaveBeenCalled());
  return { user };
}

test("should display the title", async () => {
  await setup();

  expect(
    await screen.findByRole("heading", {
      name: "✰Study Log✍︎ ꙳⋆",
    })
  ).toBeInTheDocument();
});

test("creates a new entry when the form is submitted", async () => {
  const { user } = await setup();

  const titleInput = screen.getByLabelText("Study Topic：") as HTMLInputElement;
  const hoursInput = screen.getByLabelText(
    "Study Time(hours)："
  ) as HTMLInputElement;

  await user.clear(titleInput);
  await user.type(titleInput, "React");

  await user.clear(hoursInput);
  await user.type(hoursInput, "3");

  await user.click(screen.getByRole("button", { name: "Add" }));

  await waitFor(() => {
    expect(insertMock).toHaveBeenCalledTimes(1);
  });
  // Wait for 'select' to be called again, as the 'refreshKey' update triggers a re-fetch.
  await waitFor(() => {
    expect(selectMock.mock.calls.length).toBeGreaterThanOrEqual(2);
  });

  expect(await screen.findByText(/React/)).toBeInTheDocument();
  expect(await screen.findByText("3 (H)")).toBeInTheDocument();
});

test("removes the item after the user confirms the delete action", async () => {
  const confirmSpy = vi.spyOn(window, "confirm").mockReturnValue(true);
  const { user } = await setup({
    records: [{ id: 1, title: "React", hours: 3 }],
  });

  const rowText = await screen.findByText(/React/);
  const rowDiv = rowText.closest("div");
  if (!rowDiv) throw new Error("Could not find <div> for the item row.");

  const deleteButton = within(rowDiv).getByRole("button");
  await user.click(deleteButton);
  expect(confirmSpy).toHaveBeenCalled();
  expect(deleteMock).toHaveBeenCalledTimes(1);
  expect(deleteEqMock).toHaveBeenCalledWith("id", 1);

  await waitFor(() => {
    expect(screen.queryByText(/React/)).not.toBeInTheDocument();
  });
});

test("show an error message when the form is submitted without input", async () => {
  const user = userEvent.setup();
  render(<StudyLog />);
  await waitFor(() => {
    expect(selectMock).toHaveBeenCalled();
  });

  await user.click(screen.getByRole("button", { name: "Add" }));
  expect(
    await screen.findByText("Please fill in all required fields.")
  ).toBeInTheDocument();
});
